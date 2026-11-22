#!/usr/bin/env python3
"""Lấy lời thoại (phụ đề tự động) của video YouTube để học cấu trúc kịch bản.

  .venv/bin/python3 scripts/transcript.py <link|id> [<link|id> ...] [--out channel/research/mau] [--lang vi]

Ghi <out>/<id>.txt, mỗi dòng là một khối 30 giây "[m:ss] lời…". Chỉ dùng để phân tích khung,
không chép lời vào kịch bản (bản quyền + chính sách "reused content" của YouTube).
"""
import os, re, sys
from youtube_transcript_api import YouTubeTranscriptApi

args = sys.argv[1:]
def opt(name, default):
    if f'--{name}' in args:
        i = args.index(f'--{name}'); v = args[i + 1]; del args[i:i + 2]; return v
    return default

out = opt('out', 'channel/research/mau')
lang = opt('lang', 'vi')
os.makedirs(out, exist_ok=True)
api = YouTubeTranscriptApi()
for a in args:
    m = re.search(r'(?:v=|youtu\.be/|shorts/)([\w-]{11})', a)
    vid = m.group(1) if m else a
    try:
        rows = api.fetch(vid, languages=[lang, 'en'])
    except Exception as e:
        print(vid, 'LỖI', type(e).__name__, str(e)[:200]); continue
    blocks = {}
    for s in rows:
        blocks.setdefault(int(s.start // 30), []).append(s.text.replace('\n', ' '))
    lines = [f'[{k * 30 // 60}:{k * 30 % 60:02d}] ' + ' '.join(v) for k, v in sorted(blocks.items())]
    path = os.path.join(out, f'{vid}.txt')
    open(path, 'w').write('\n'.join(lines) + '\n')
    words = sum(len(l.split()) - 1 for l in lines)
    print(f'{vid}: {words} từ, {lines[-1][:7]} → {path}')
