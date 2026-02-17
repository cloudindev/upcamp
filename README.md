# UPCAMP Hospitality - SaaS PMS for Campings

Multi-tenant Property Management System specialized for campings in Spain.

## 🚀 Quick Start

### Prerequisites

- Node.js 20 LTS
- Supabase account (database)
- Upstash account (Redis cache)

### Installation

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configuration

1. Copy `.env.example` to `.env` in the root directory
2. Fill in your Supabase credentials
3. Fill in your Upstash Redis credentials
4. Generate a secure JWT secret

### Database Setup

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed initial data
npx prisma db seed
```

### Development

```bash
# Terminal 1: Start backend
cd backend
npm run start:dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

- Backend: http://localhost:3000
- Frontend: http://localhost:5173
- API Docs: http://localhost:3000/api

## 📁 Project Structure

```
SAS_Camping/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── core/        # Core modules (auth, tenancy, database)
│   │   ├── modules/     # Domain modules (inventory, reservations, etc.)
│   │   └── main.ts
│   ├── prisma/          # Database schema & migrations
│   └── package.json
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API clients
│   │   └── App.tsx
│   └── package.json
└── .env                 # Environment variables
```

## 🛠️ Tech Stack

- **Backend**: NestJS + TypeScript + Prisma
- **Frontend**: React + TypeScript + Tailwind CSS
- **Database**: Supabase PostgreSQL
- **Cache**: Upstash Redis
- **Auth**: JWT + Row Level Security (RLS)

## 📚 Documentation

See `/docs` folder for detailed documentation:
- [Architecture](../brain/01_stack_and_architecture.md)
- [Data Model](../brain/02_data_model.md)
- [API Contracts](../brain/03_api_contracts.md)
- [Availability Engine](../brain/04_availability_engine.md)
- [UX Prototypes](../brain/05_ux_prototypes.md)
- [Roadmap](../brain/06_roadmap.md)

## 🎯 Features (v1)

- ✅ Multi-tenant architecture with RLS
- ✅ Inventory management (units, zones, types)
- ✅ Planning grid (drag-drop calendar)
- ✅ Availability engine (anti-overbooking)
- ✅ Reservations lifecycle
- ✅ Financial management (folio, payments, invoicing)
- ✅ SES.HOSPEDAJES integration
- ✅ Digital check-in
- ✅ Housekeeping & maintenance
- ✅ Public booking widget

## 📄 License

Proprietary - All rights reserved
