# Evolve Studio API

The API uses the existing MySQL `salon_marketing` database. It does not create,
alter, or seed database objects. Public service data intentionally omits prices.
Swagger documentation is available at `/docs` while the application is running.

## Setup

1. From the project root, activate the existing virtual environment and install
   the runtime dependencies:

   ```powershell
   .\.venv\Scripts\python.exe -m pip install -r requirements.txt
   ```

2. Keep the existing `backend\.env` file private. The required settings are
   `DB_USER` and `DB_NAME`; configure `DB_HOST`, `DB_PORT`, and `DB_PASSWORD`
   for the provided MySQL server. `backend\.env.example` shows the setting names.
   The project `.gitignore` already excludes `.env`.

3. Start the API and frontend together from the project root:

   ```powershell
   .\.venv\Scripts\python.exe -m uvicorn backend.main:app --reload
   ```

   The frontend is served by FastAPI from the same origin as its APIs. Open
   `http://127.0.0.1:8000/` for the site, `http://127.0.0.1:8000/services.html`
   for the live service catalog, or `http://127.0.0.1:8000/docs` for Swagger.
   Same-origin requests do not require CORS. If a separate frontend origin is
   introduced later, configure only that exact HTTP(S) origin in
   `CORS_ORIGINS`; wildcards, paths, and credentials are rejected.

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Application health |
| GET | `/health/db` | Verify MySQL connectivity and return the selected database name |
| GET | `/categories` | List categories |
| GET | `/categories/{category_id}` | Get one category |
| GET | `/categories/{category_id}/services` | List a category's services |
| GET | `/services` | List services; accepts optional `category_id` |
| GET | `/services/{service_id}` | Get one service |
| POST | `/customers` | Register a customer; duplicate email returns `409` |
| POST | `/contact-enquiries` | Store a contact enquiry |
| GET | `/academy/courses` | List active courses |
| GET | `/academy/courses/{course_id}` | Get one active course |
| POST | `/academy/course-enquiries` | Store an enquiry for an active course |
| GET | `/offers` | List active offers within their optional date range |
| GET | `/offers/{offer_id}` | Get one active offer |
| GET | `/staff` | List active staff using public fields only |
| GET | `/staff/{staff_id}` | Get one active staff member using public fields only |

Successful creates return `201`; validation errors return `422`; duplicate
customer email returns `409`; unknown or inactive resources return `404`.
Database failures return a generic `503` without exposing SQL or credentials.
The same-origin frontend is also available at `/`, `/services.html`, `/menu.html`,
and `/service-detail.html`; its assets are served from `/assets/`.

## Existing table coverage

The public API uses `categories`, `services`, `academy_courses`, `offers`, and
limited public fields from `staff` for read-only catalog data. It writes customer
registrations to `customers` and submissions to `contact_enquiries` and
`course_enquiries`.

The remaining four tables are intentionally not exposed publicly:
`appointments` and `appointment_details` require the deferred identity and
booking rules; `gift_cards` contains private codes and has no approved payment
workflow; and `admin_accounts` contains password hashes with no approved
authentication design. No public read endpoint returns customer or enquiry
records.

## Catalog image status

The current service rows have no database image values. Service cards and
category cards use an explicit pending-image state until each image is verified
and approved. No external or local image paths are assigned as service images,
and no database image records are changed by this project.

## Tests

Install test dependencies and run the isolated SQLite-backed suite from the
project root:

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements-dev.txt
.\.venv\Scripts\python.exe -m pytest
```

Tests use a temporary in-memory SQLite database and never add or change records
in the salon's MySQL database.

For an opt-in, read-only smoke test against the configured MySQL database, run:

```powershell
$env:RUN_MYSQL_READONLY_TESTS = "1"
.\.venv\Scripts\python.exe -m pytest -q tests\test_mysql_readonly.py
```

This checks health and public GET response shapes only; it performs no inserts,
updates, or deletes.

## Security and schema-dependent limitations

- The inspected appointment tables require a customer and date/time, allow an
  optional staff member, and default appointment status to `Pending`.
  `appointment_details` stores service, quantity, and an optional price snapshot.
  The schema has no service duration, schedule, slot uniqueness, or idempotency
  constraint, so it cannot establish availability or prevent overlapping
  bookings.
- Gift cards require a unique code and amount, but the schema defines no
  purchase request, payment, currency, recipient, or redemption authorization
  workflow. Existing gift codes must never be returned by a public endpoint.
- Admin accounts have a unique email, password-hash column, and role enum, but
  the schema does not identify the hash algorithm or define sessions, tokens,
  lockout, or role permissions. The API does not expose admin-account data.
- Appointment booking, appointment retrieval/cancellation/status changes, and
  administrative routes are intentionally not exposed yet. The database has no
  authentication or ownership mechanism, so accepting caller-supplied customer
  IDs or returning appointment details would allow impersonation or disclosure.
  An approved customer and staff authentication/authorization design is needed.
- Gift-card codes are secrets. The existing schema has no payment or purchase
  request workflow, so the API does not expose card records or issue cards.
- Appointment availability rules and idempotency are not present in the schema;
  no availability checks or duplicate-booking guarantees have been invented.
- The Contact Us form submits to `POST /contact-enquiries`. The selected
  service or category is included in the enquiry message because the existing
  table has no dedicated service column. A successful response confirms receipt
  of an enquiry only; it does not reserve or confirm an appointment.
