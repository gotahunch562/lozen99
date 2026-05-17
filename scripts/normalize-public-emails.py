#!/usr/bin/env python3
from pathlib import Path

ROOT = Path.cwd()

SEARCH_ROOTS = [
    ROOT / "src",
    ROOT / "public",
]

TEXT_EXTENSIONS = {
    ".astro",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".md",
    ".mdx",
    ".html",
    ".css",
    ".json",
    ".xml",
    ".txt",
    ".yml",
    ".yaml",
}

HELLO_EMAIL = "hello@lozenadvisory.com"
MEDIA_EMAIL = "media@lozenadvisory.com"

ALWAYS_REPLACE = {
    "akilah@lozenadvisory.com": HELLO_EMAIL,
    "inquiry@lozenadvisory.com": HELLO_EMAIL,
}

MEDIA_ALLOWED_PATH_TOKENS = (
    "news-press",
    "press",
    "media",
    "market-correction",
)

def is_text_file(path: Path) -> bool:
    return path.is_file() and path.suffix.lower() in TEXT_EXTENSIONS

def is_press_media_path(path: Path) -> bool:
    rel = path.relative_to(ROOT).as_posix().lower()
    return any(token in rel for token in MEDIA_ALLOWED_PATH_TOKENS)

def iter_text_files():
    for search_root in SEARCH_ROOTS:
        if not search_root.exists():
            continue
        for path in search_root.rglob("*"):
            if is_text_file(path):
                yield path

def main():
    changed_files = []

    for path in iter_text_files():
        original = path.read_text(encoding="utf-8")
        updated = original

        for old_email, new_email in ALWAYS_REPLACE.items():
            updated = updated.replace(old_email, new_email)

        if MEDIA_EMAIL in updated and not is_press_media_path(path):
            updated = updated.replace(MEDIA_EMAIL, HELLO_EMAIL)

        if updated != original:
            path.write_text(updated, encoding="utf-8")
            changed_files.append(path.relative_to(ROOT).as_posix())

    print("Email cleanup complete.")
    if changed_files:
        print("\nChanged files:")
        for file_path in changed_files:
            print(f"  - {file_path}")
    else:
        print("\nNo files changed.")

    print("\nRemaining public email references:")
    found_any = False
    for path in iter_text_files():
        content = path.read_text(encoding="utf-8")
        for email in (
            "akilah@lozenadvisory.com",
            "inquiry@lozenadvisory.com",
            MEDIA_EMAIL,
            HELLO_EMAIL,
        ):
            if email in content:
                found_any = True
                rel = path.relative_to(ROOT).as_posix()
                if email == MEDIA_EMAIL and is_press_media_path(path):
                    status = "OK: press/media context"
                elif email == HELLO_EMAIL:
                    status = "OK: public contact"
                else:
                    status = "REVIEW"
                print(f"  - {rel}: {email} [{status}]")

    if not found_any:
        print("  - No public email references found.")

    print("\nNext checks:")
    print('  grep -R "akilah@lozenadvisory.com\\|inquiry@lozenadvisory.com" -n src public')
    print('  grep -R "media@lozenadvisory.com" -n src public')
    print('  grep -R "hello@lozenadvisory.com" -n src public')

if __name__ == "__main__":
    main()
