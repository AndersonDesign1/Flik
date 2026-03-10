# Flik

Flik is a modern, full-stack e-commerce platform built with Next.js, Convex, and Better Auth. It provides a seamless shopping experience with a high-performance storefront, a robust dashboard for merchants, and integrated staff management tools.

## Development

Currently under development.

```bash
bun install
bun run dev
```

## Monorepo

This repository now uses Bun workspaces and Turborepo.

- `apps/web`: the Next.js + Convex application
- `packages/*`: reserved for future shared internal packages

Run commands from the repository root:

```bash
bun run dev
bun run build
bun run lint
bun run typecheck
```

## License

MIT
