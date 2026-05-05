# contact-sync-api

A REST API that simulates syncing business card data to a CRM system — inspired by how snapAddy works.

## Tech Stack
- **TypeScript** + **Node.js**
- **Express** — HTTP framework
- **Zod** — runtime validation
- **Layered architecture** — Controller → Service → Repository

## Architecture

```
HTTP Request
    │
    ▼
Controller       ← validates input, returns response
    │
    ▼
Service          ← business logic, error handling
    │
    ▼
Repository       ← data access layer (easily swappable with a real DB)
```

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /health | Health check |
| POST | /api/contacts | Create contact from business card |
| GET | /api/contacts | List all contacts (paginated) |
| GET | /api/contacts/:id | Get contact by ID |
| PATCH | /api/contacts/:id | Update contact |
| DELETE | /api/contacts/:id | Delete contact |

## Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

## Example Request

```bash
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Hans Mueller",
    "email": "hans@bmw.de",
    "company": "BMW GmbH",
    "jobTitle": "Sales Manager"
  }'
```