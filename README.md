# Graphyn

A modern AI agent platform with graph-based memory and context-aware interactions.

## Features

### Core Platform
- 🧠 **AI Agents** - Configurable agents with memory and context
- 📊 **Graph Memory** - Relationship-based memory storage
- 🔄 **Event System** - Real-time event processing
- 🎮 **Playground** - Interactive agent testing environment

### Technology Stack
- ⚡ **Next.js 14** - App Router with Server Components
- 🎨 **Tailwind CSS** - Custom UI components and animations
- 📘 **TypeScript** - Full type safety
- 🔒 **Authentication** - Clerk + JWT
- 🗄️ **Database** - PostgreSQL + Drizzle ORM
- 📈 **State** - Zustand + React Query

### Developer Experience
- 🎭 **UI Components** - Shadcn/ui + Custom Components
- 🌓 **Theming** - Dark/Light mode with custom colors
- 📱 **Responsive** - Mobile-first design
- 🚀 **Performance** - Optimized routing and rendering
- 🧪 **Testing** - Jest + React Testing Library

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
# Auth (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Database
DATABASE_URL=

# AI
OPENAI_API_KEY=
```

4. Start development:
```bash
yarn dev
```

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── (auth)/          # Auth routes
│   ├── (pages)/         # Main pages
│   └── api/             # API routes
├── components/          # React components
│   ├── agents/         # Agent components
│   ├── ui/             # UI components
│   └── visualization/  # Data visualization
├── lib/                # Core utilities
├── store/             # State management
└── types/             # TypeScript types
```

## Documentation

- [Architecture Guide](docs/architecture.md)
- [Development Guide](docs/development.md)
- [API Reference](docs/api.md)

## License

MIT


