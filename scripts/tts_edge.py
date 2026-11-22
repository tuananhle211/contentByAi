"""Edge TTS (miễn phí). Đầu vào: file JSON [{text, voice, rate, pitch, out}].
Mỗi job tạo <out> (mp3) và <out>.json chứa mốc thời gian từng từ."""
import asyncio
import json
import re
import sys

import edge_tts


async def synth(job):
    comm = edge_tts.Communicate(
        job["text"], job["voice"], rate=job.get("rate", "+0%"),
        pitch=job.get("pitch", "+0Hz"), boundary="WordBoundary",
        connect_timeout=10, receive_timeout=20,
    )
    words, audio = [], bytearray()
    async for chunk in comm.stream():
        if chunk["type"] == "audio":
            audio.extend(chunk["data"])
        elif chunk["type"] == "WordBoundary":
            words.append({"t": chunk["offset"] / 1e7, "d": chunk["duration"] / 1e7, "text": chunk["text"]})
    # Kết nối đôi khi đứt giữa chừng mà không báo lỗi → kiểm tra đã đọc đủ lời.
    # Từ ghép có gạch nối/nháy ("sixteen-hundred-year-old", "don't") được trả về như một từ → đếm là một.
    tokens = len(re.findall(r"\w+(?:[-'’]\w+)*", job["text"]))
    if len(words) < 0.85 * tokens:
        raise RuntimeError(f"thiếu lời ({len(words)}/{tokens} từ)")
    return audio, words


async def one(job, sem):
    async with sem:
        for attempt in range(8):
            try:
                # Dịch vụ thỉnh thoảng treo kết nối → giới hạn thời gian rồi thử lại.
                audio, words = await asyncio.wait_for(synth(job), 30 + len(job["text"]) / 10)
                with open(job["out"], "wb") as f:
                    f.write(audio)
                with open(job["out"] + ".json", "w", encoding="utf-8") as f:
                    json.dump(words, f, ensure_ascii=False)
                print(f"  ✓ {job['text'][:50]}…", file=sys.stderr)
                return
            except Exception as e:
                if attempt == 7:
                    raise
                print(f"  thử lại TTS ({type(e).__name__}: {e})", file=sys.stderr)
                await asyncio.sleep(2 + attempt * 3)


async def main():
    jobs = json.load(open(sys.argv[1], encoding="utf-8"))
    sem = asyncio.Semaphore(2)
    await asyncio.gather(*(one(j, sem) for j in jobs))


asyncio.run(main())
