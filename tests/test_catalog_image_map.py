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


def test_catalogue_and_mapping_counts_are_consistent() -> None:
    men_categories = SERVICE_CATALOG["men"]
    women_categories = SERVICE_CATALOG["women"]

    men_services = [
        service_name
        for category in men_categories
        for service_name, _ in category["types"]
    ]
    women_services = [
        service_name
        for category in women_categories
        for service_name, _ in category["types"]
    ]

    assert len(men_categories) == 9
    assert len(women_categories) == 13
    assert len(men_services) == 45
    assert len(women_services) == 65
    assert len(men_services) == len(set(men_services))
    assert len(women_services) == len(set(women_services))

    project_root = Path(__file__).resolve().parents[1]
    manifest_path = (
        project_root
        / "frontend"
        / "assets"
        / "images"
        / "service-type-image-map.json"
    )
    image_map = json.loads(manifest_path.read_text(encoding="utf-8"))
    assert len(image_map) == 110

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
    assert not expected - mapped


def test_four_men_service_images_and_extensions_fallback() -> None:
    project_root = Path(__file__).resolve().parents[1]
    manifest_path = (
        project_root
        / "frontend"
        / "assets"
        / "images"
        / "service-type-image-map.json"
    )
    image_map = json.loads(manifest_path.read_text(encoding="utf-8"))
    mapped = {
        (entry["gender"], entry["category"], entry["service"])
        for entry in image_map
    }

    supplied_mappings = {
        ("men", "Head Massage & Spa", "Head and Shoulder Massage"): "assets/images/men-head-shoulder-massage.png",
        ("men", "Head Massage & Spa", "Oil Head Massage"): "assets/images/men-oil-head-massage.png",
        ("men", "Manicure & Pedicure", "Classic Pedicure"): "assets/images/men-classic-pedicure.png",
        ("men", "Manicure & Pedicure", "Express Pedicure"): "assets/images/men-express-pedicure.png",
    }
    manifest_by_key = {
        (entry["gender"], entry["category"], entry["service"]): entry
        for entry in image_map
    }
    for key, expected_path in supplied_mappings.items():
        entry = manifest_by_key[key]
        assert entry["image"] == expected_path
        assert entry["alt"].strip()
        assert (project_root / "frontend" / entry["image"]).is_file()

    extensions_category = next(
        category
        for category in SERVICE_CATALOG["women"]
        if category["slug"] == "hair-extensions"
    )
    assert extensions_category["image"] is None
    extension_entries = [
        entry
        for entry in image_map
        if entry["gender"] == "women"
        and entry["category"] == "Hair Extensions"
    ]
    assert len(extension_entries) == 5
    for entry in extension_entries:
        path = project_root / "frontend" / entry["image"]
        assert path.is_file()
