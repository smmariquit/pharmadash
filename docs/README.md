# Web Application Documentation

## Overview
This web application is built with Next.js 15, using modern web technologies and best practices for a performant, type-safe, and scalable application.

## Quick Start

### Prerequisites
- Node.js 18+
- PNPM (recommended package manager)
- A Clerk account for authentication
- PostgreSQL database

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```
Fill in your environment variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
- `CLERK_SECRET_KEY`: Your Clerk secret key
- `DATABASE_URL`: Your PostgreSQL database URL

3. Initialize the database:
```bash
pnpm prisma generate
pnpm prisma db push
```

4. Run the development server:
```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `pnpm dev`: Run development server
- `pnpm build`: Build for production
- `pnpm start`: Start production server
- `pnpm prisma:generate`: Generate Prisma client

## Project Structure

```
web/
├── src/
│   ├── app/          # Next.js 15 App Router
│   ├── components/   # React components
│   ├── lib/          # Utility functions
│   └── middleware.ts # Auth middleware
├── prisma/
│   └── schema.prisma # Database schema
└── public/          # Static assets
```

## Key Features
- Next.js 15 App Router
- TypeScript for type safety
- Clerk Authentication
- Prisma ORM with PostgreSQL
- TailwindCSS for styling

## Contributing
See our [Contributing Guide](./CONTRIBUTING.md) for details on our development process.

## Documentation
- [Demo & Features](./DEMO.md)
- [Architecture & Design](./ARCHITECTURE.md)

