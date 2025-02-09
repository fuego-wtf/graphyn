# Graphyn

A lightweight API interface for backend services, providing a simple gateway for ai agent interactions.

## Overview

This application serves as an api interface for the backend, focusing solely on api routes and minimal ui components. It is not a fullstack application.

## Features

### API Gateway

- efficient routing with next.js app router
- utilizes route handlers in app/api
- built with typescript for type safety

### Technology Stack

- ⚡ next.js 15 – app router with server components
- 🎨 tailwind css – minimal ui stubs if needed
- 📘 typescript – full type safety
- 🗄️ api interface – backend integration via route handlers

## Getting Started

1. Clone and install:

```bash
git clone https://github.com/yourusername/graphyn.git
cd graphyn
yarn install
```

2. Set up environment:

```bash
cp .env.template .env
```

3. Configure environment variables:

```env
# backend api
API_BASE_URL=

# additional config
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
OPENAI_API_KEY=
```

4. Start development:

```bash
yarn dev
```

5. Build for production:

```bash
yarn build
```

## Project Structure

```
├── app/                  # next.js app directory with api route handlers
│   ├── api/              # api routes
│   ├── layout.tsx
│   └── page.tsx
├── components/           # minimal ui components (if needed)
├── lib/                  # core utilities
├── store/                # state management (stubbed if necessary)
└── types/                # typescript types
```

## Documentation

- [Architecture Guide](docs/architecture.md)
- [Development Guide](docs/development.md)
- [API Reference](docs/api.md)

## License

MIT
