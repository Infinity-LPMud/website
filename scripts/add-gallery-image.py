#!/usr/bin/env python3
"""
Interactive script to add a new photo to the Infinity gallery.

Usage: python scripts/add-gallery-image.py path/to/photo.jpg
"""

import json
import os
import shutil
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
JSON_PATH = os.path.join(PROJECT_ROOT, "src", "data", "user-images.json")
IMAGES_DIR = os.path.join(PROJECT_ROOT, "public", "user-images", "images")


def load_data():
    with open(JSON_PATH, "r") as f:
        return json.load(f)


def save_data(data):
    with open(JSON_PATH, "w") as f:
        json.dump(data, f, indent=2)
        f.write("\n")


def generate_slug(filename, existing_slugs):
    base = os.path.splitext(filename)[0].lower()
    slug = base
    if slug not in existing_slugs:
        return slug
    counter = 1
    while f"{base}-{counter}" in existing_slugs:
        counter += 1
    return f"{base}-{counter}"


def main():
    if len(sys.argv) != 2:
        print("Usage: python scripts/add-gallery-image.py path/to/photo.jpg")
        sys.exit(1)

    image_path = sys.argv[1]
    if not os.path.isfile(image_path):
        print(f"Error: File not found: {image_path}")
        sys.exit(1)

    filename = os.path.basename(image_path)
    dest_path = os.path.join(IMAGES_DIR, filename)

    if os.path.exists(dest_path):
        print(f"Warning: {filename} already exists in {IMAGES_DIR}")
        resp = input("Overwrite? [y/N] ").strip().lower()
        if resp != "y":
            print("Aborted.")
            sys.exit(0)

    data = load_data()
    existing_slugs = {img["slug"] for img in data["images"]}
    slug = generate_slug(filename, existing_slugs)

    print(f"\nSlug: {slug}")
    print(f"File: {filename}")

    caption = input("\nCaption: ").strip()
    if not caption:
        print("Error: Caption cannot be empty.")
        sys.exit(1)

    raw_users = input("Users (comma-separated usernames): ").strip()
    if not raw_users:
        print("Error: Must tag at least one user.")
        sys.exit(1)

    usernames = [u.strip().lower() for u in raw_users.split(",") if u.strip()]
    new_users = {}

    for username in usernames:
        if username in data["users"]:
            u = data["users"][username]
            print(f"  {username}: {u['name']} from {u['location']}")
        else:
            print(f"  {username} is a new user.")
            name = input(f"    Display name for {username}: ").strip()
            if not name:
                name = username.capitalize()
            location = input(f"    Location for {username}: ").strip()
            if not location:
                location = "Unknown"
            new_users[username] = {"name": name, "location": location}

    new_entry = {
        "slug": slug,
        "filename": filename,
        "caption": caption,
        "users": usernames,
    }

    print("\n--- Summary ---")
    print(f"  Image: {filename} -> public/user-images/images/{filename}")
    print(f"  Slug:  {slug}")
    print(f"  Caption: {caption}")
    print(f"  Users: {', '.join(usernames)}")
    if new_users:
        print("  New users:")
        for uname, info in new_users.items():
            print(f"    {uname}: {info['name']} from {info['location']}")
    print()

    confirm = input("Proceed? [Y/n] ").strip().lower()
    if confirm == "n":
        print("Aborted.")
        sys.exit(0)

    # Copy image
    shutil.copy2(image_path, dest_path)
    print(f"Copied {filename} to {IMAGES_DIR}")

    # Add new users (sorted alphabetically)
    for uname, info in new_users.items():
        data["users"][uname] = info
    data["users"] = dict(sorted(data["users"].items()))

    # Add image entry and re-sort
    data["images"].append(new_entry)
    data["images"].sort(key=lambda img: img["slug"])

    save_data(data)
    print(f"Updated {JSON_PATH}")
    print("Done!")


if __name__ == "__main__":
    main()
