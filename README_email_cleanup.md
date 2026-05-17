# Lozen Advisory public email cleanup

This package normalizes public email references.

Rules:
- Replace akilah@lozenadvisory.com with hello@lozenadvisory.com.
- Replace inquiry@lozenadvisory.com with hello@lozenadvisory.com.
- Replace media@lozenadvisory.com with hello@lozenadvisory.com unless the file path is press/media-related.
- Preserve media@lozenadvisory.com in files whose paths include: news-press, press, media, or market-correction.

Run from repo root:

```bash
bash scripts/normalize-public-emails.sh
```
