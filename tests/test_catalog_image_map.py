import json
from pathlib import Path

from backend.catalog_data import SERVICE_CATALOG


def test_mapped_service_types_have_unique_local_photographs() -> None:
    project_root = Path(__file__).resolve().parents[1]
    frontend_root = project_root / "frontend"
    manifest_path = frontend_root / "assets" / "images" / "service-type-image-map.json"
    image_map = json.loads(manifest_path.read_text(encoding="utf-8"))

    expected = {
        (gender, category["name"], service_name)
        for gender, categories in SERVICE_CATALOG.items()
        for category in categories
        for service_name, _ in category["types"]
    }
    mapped = {
        (entry["gender"], entry["category"], entry["service"])
        for entry in image_map
    }

    assert len(mapped) == len(image_map)
    assert mapped <= expected

    image_paths = [entry["image"] for entry in image_map]
    assert len(set(image_paths)) == len(image_paths)

    for entry in image_map:
        assert entry["image"].startswith("assets/images/")
        assert entry["alt"].strip()
        path = frontend_root / entry["image"]
        assert path.is_file()
        assert path.suffix.lower() in {".jpg", ".jpeg", ".png", ".webp"}

        image_bytes = path.read_bytes()
        if path.suffix.lower() in {".jpg", ".jpeg"}:
            assert image_bytes.startswith(b"\xff\xd8\xff")
        elif path.suffix.lower() == ".png":
            assert image_bytes.startswith(b"\x89PNG\r\n\x1a\n")
        else:
            assert image_bytes.startswith(b"RIFF") and image_bytes[8:12] == b"WEBP"
