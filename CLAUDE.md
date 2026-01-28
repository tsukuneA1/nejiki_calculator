# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Pokemon Battle Factory damage calculator for Pokemon Platinum/HeartGold/SoulSilver, built with Next.js 15, TypeScript, Tailwind CSS, and PostgreSQL via Prisma.

## Development Commands

```bash
# Development
npm run dev                # Start development server
npm run build             # Production build
npm run start             # Start production server

# Code Quality
npm run lint              # Next.js linting
npm run lint:fix          # Biome lint and format (recommended)
npm run prettier          # Prettier formatting

# Post-build
npm run postbuild         # Generate sitemap (runs automatically after build)
```

## Architecture

### Key Directories
- `/src/pages/` - Next.js pages (using Pages Router, not App Router)
- `/src/components/domain/` - Business logic components (attacker, defender, damage, env)
- `/src/components/general/` - Reusable components (pokemon-card, type-badge)
- `/src/components/ui/` - shadcn/ui components
- `/src/store/` - Redux state management with slices
- `/src/functions/` - Pure damage calculation functions
- `/src/constants/` - Static Pokemon data (abilities, items, types)
- `/prisma/` - Database schema and migrations

### State Management
Uses Redux Toolkit with feature-based slices:
- `attackerSlice` - Attacking Pokemon state
- `defenderSlice` - Defending Pokemon state  
- `settingsSlice` - Level, rounds, nejiki mode
- `envSlice` - Battle environment conditions

### Database
PostgreSQL with Prisma ORM. Key models:
- `Pokemon` - Base Pokemon data
- `Factory_Pokemon` - Factory-specific instances with items/natures
- `Move` - Move data with power/type/accuracy
- `PokemonMove` - Pokemon-Move relationships

## Code Conventions

- Uses **Biome** for linting/formatting (not ESLint/Prettier)
- **TypeScript** with strict mode disabled
- **Tailwind CSS** for styling
- **Space indentation (2 spaces)** and **double quotes**
- Components organized by atomic design principles (ui → general → domain)

## Important Implementation Details

### Damage Calculation Engine
Located in `/src/functions/` - handles complex Pokemon damage formulas including type effectiveness, STAB, nature effects, items, abilities, and environmental conditions.

### Pokemon Reserve System
6-Pokemon reserve system for strategy planning, managed through Redux state.

### Responsive Design
Mobile-first approach with custom Tailwind breakpoints for desktop enhancements.

## Database Requirements

Requires `DATABASE_URL` environment variable for PostgreSQL connection.