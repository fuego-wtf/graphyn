# Graphyn Application Structure

## Directory Structure

### Core Directories
- `app/`: Next.js app directory containing all pages and routing
	- `(pages)/`: Main pages directory
	- `(auth)/`: Authentication-related pages
	- `api/`: API routes
- `components/`: Reusable React components
	- `sections/`: Page section components
	- `ui/`: UI components
	- `engine/`: Engine-related components
	- `agents/`: Agent-related components
- `lib/`: Core utilities and services
	- `auth/`: Authentication utilities
	- `graph/`: Graph-related utilities
	- `redis/`: Redis client and utilities
- `config/`: Configuration files
- `types/`: TypeScript type definitions

### Key Features
1. Authentication (Clerk)
2. AI Agents Management
3. Memory System
4. Graph-based Data Structure
5. Redis Integration

### Page Structure
- Authentication
	- Sign In: `app/(auth)/sign-in`
	- Sign Up: `app/(auth)/sign-up`
- Main Features
	- Engine: `app/(pages)/engine`
	- Business Plan: `app/(pages)/business-plan`
	- Playground: `app/(pages)/playground`

### Component Organization
- Layout Components
	- Navigation
	- Sidebar
	- Page Wrapper
- Feature Components
	- Agent Management
	- Memory Visualization
	- User Controls
- UI Components
	- Buttons
	- Cards
	- Forms

## Routing
- Clean URL structure without locale prefixes
- Authentication-protected routes
- API routes for data operations

## State Management
- Clerk for auth state
- Custom stores for application state
- Redis for persistent storage

## Development Guidelines
1. Component organization follows feature-based structure
2. Consistent use of TypeScript for type safety
3. API routes follow RESTful principles
4. UI components use shadcn/ui system