# AutomateX

**Visual trading workflow automation platform.**

Build, deploy, and monitor algorithmic trading strategies through a drag-and-drop canvas. AutomateX lets you wire up triggers (price alerts, timers) to exchange actions (Hyperliquid, Backpack, Lighter) and execute trades automatically — no code required.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running Locally](#running-locally)
- [API Reference](#api-reference)
- [FAQ — Why MongoDB?](#faq--why-mongodb)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Visual Workflow Builder** — Drag-and-drop canvas powered by ReactFlow. Connect trigger nodes to action nodes with edges to define your trading logic.
- **Timer Trigger** — Fire workflows on a recurring interval (seconds, minutes, hours) with smart display formatting.
- **Price Trigger** — Trigger actions when an asset (SOL, ETH, BTC) crosses a configured price threshold.
- **Multi-Exchange Actions** — Execute LONG/SHORT trades on Hyperliquid, Backpack, and Lighter with configurable quantity and symbol.
- **JWT Authentication** — Full signup/signin flow with bcrypt password hashing and 7-day token expiry.
- **Dashboard** — List, inspect, and manage all workflows with node/edge counts at a glance.
- **Edit Mode** — Re-open any saved workflow on the canvas, modify nodes and edges, and update in place.
- **Workflow Preview** — Read-only ReactFlow canvas to inspect a workflow without risk of accidental edits.
- **Execution History** — Per-workflow execution logs with status indicators (SUCCESS, FAILED, PENDING) and timestamps.
- **Monorepo Architecture** — Turborepo with shared `common` (Zod schemas + types) and `db` (Mongoose models) packages across frontend and backend.
- **Zod Validation** — Every API payload is validated using shared Zod schemas — single source of truth for both client and server.
- **Production-Ready UI** — Shadcn/ui + Radix primitives (Sheet, Select, Toast, Button) with TailwindCSS styling.
- **Deploy-Ready** — Vercel (frontend) and Render/Railway (backend) configurations included.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite 8 | Dev server and build tool |
| ReactFlow (@xyflow/react) | Visual node/edge canvas |
| TailwindCSS 4 | Utility-first styling |
| Shadcn/ui + Radix | Accessible component primitives |
| Framer Motion | Animations |
| Axios | HTTP client with request interceptors |
| React Router 7 | Client-side routing |
| Lucide React | Icon library |

### Backend

| Technology | Purpose |
|---|---|
| Node.js (>=18) | Runtime |
| Express 5 | HTTP server framework |
| MongoDB + Mongoose 9 | Database and ODM |
| JSON Web Tokens | Stateless authentication |
| bcryptjs | Password hashing |
| Zod 4 | Schema validation (shared with frontend) |
| CORS | Cross-origin configuration |

### Tooling

| Tool | Purpose |
|---|---|
| Turborepo | Monorepo task orchestration |
| Bun | Package manager and backend runtime |
| Prettier | Code formatting |
| ESLint | Linting |

---

## Project Structure

```
AutomateX/
├── apps/
│   ├── client/                           # React frontend (Vite)
│   │   ├── src/
│   │   │   ├── App.tsx                   # Root router — all page routes
│   │   │   ├── main.tsx                  # React DOM entry point
│   │   │   ├── components/
│   │   │   │   ├── CreateWorkflow.tsx    # Core workflow builder (ReactFlow canvas)
│   │   │   │   ├── ActionSheet.tsx       # Slide-over for configuring exchange actions
│   │   │   │   ├── TriggerSheet.tsx      # Slide-over for configuring triggers
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Landing.tsx       # Marketing landing page
│   │   │   │   │   ├── Auth.tsx          # Sign in / Sign up
│   │   │   │   │   ├── Dashboard.tsx     # Workflow list and management
│   │   │   │   │   ├── WorkflowDetail.tsx    # Workflow inspector with preview
│   │   │   │   │   ├── EditWorkflow.tsx      # Edit mode — canvas with saved state
│   │   │   │   │   └── WorkflowExecutions.tsx  # Execution history
│   │   │   │   └── ui/                   # Shadcn/ui primitives
│   │   │   ├── nodes/
│   │   │   │   ├── triggers/
│   │   │   │   │   ├── priceTrigger.tsx  # Price alert trigger node
│   │   │   │   │   └── timmer.tsx        # Interval timer trigger node
│   │   │   │   └── actions/
│   │   │   │       ├── Lighter.tsx       # Lighter exchange action node
│   │   │   │       ├── hyper-liquid.tsx  # Hyperliquid exchange action node
│   │   │   │       └── backpack.tsx      # Backpack exchange action node
│   │   │   ├── hooks/
│   │   │   │   └── use-toast.ts          # Toast notification hook
│   │   │   └── lib/
│   │   │       ├── api.ts               # Axios client, interceptors, all API functions
│   │   │       └── utils.ts             # clsx + tailwind-merge helper
│   │   ├── vite.config.ts               # Vite + Tailwind + path alias config
│   │   └── vercel.json                  # Vercel SPA rewrite rules
│   │
│   └── backend/                          # Express API server
│       ├── index.ts                      # All REST routes + MongoDB bootstrap
│       ├── middleware.tsx                 # JWT auth middleware
│       └── vercel.json                   # Vercel serverless config
│
├── packages/
│   ├── common/                           # Shared types and validation
│   │   ├── types/index.ts               # Zod schemas (signup, signin, workflow CRUD)
│   │   └── metadeta/index.ts            # Trading types (TradingMetadata, triggers)
│   ├── db/                              # Shared Mongoose models
│   │   └── index.ts                     # User, Workflow, Node, Edge, Execution schemas
│   ├── eslint-config/                   # Shared ESLint config
│   └── typescript-config/              # Shared tsconfig presets
│
├── turbo.json                           # Turborepo pipeline config
├── package.json                         # Root workspace (Bun workspaces)
└── .gitignore
```

**Architecture note:** The `packages/common` package is a single source of truth — Zod schemas defined once are consumed by both the frontend (for type inference) and the backend (for request validation). This eliminates type drift between client and server.

---

## Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| Node.js | >= 18 | Required for both frontend and backend |
| Bun | >= 1.3 | Package manager and backend runtime |
| MongoDB | 6+ | Local install or [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier works) |
| Git | Latest | To clone the repository |

---

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/nishantsingh02/AutomateX.git
cd AutomateX
```

**2. Install dependencies**

```bash
bun install
```

Bun workspaces will automatically resolve and link the `common` and `db` packages across all apps.

**3. Configure environment variables**

```bash
cp apps/backend/.env.example apps/backend/.env
```

Edit `apps/backend/.env` with your MongoDB URI and a strong JWT secret. See the next section for details.

---

## Environment Variables

### Backend — `apps/backend/.env`

```env
# MongoDB connection URI
# Local: mongodb://localhost:27017/automatex
# Atlas: mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/AutomateX?retryWrites=true&w=majority
MONGO_URL="mongodb://localhost:27017/automatex"

# JWT signing secret — use a strong random string in production
JWT_SECERTE="change-me-to-a-strong-random-string"

# Server port
PORT=3000
```

### Frontend — `apps/client/.env` (optional)

```env
# Backend API base URL
# Development: http://localhost:3000
# Production: update BACKEND_URL in lib/api.ts or set this variable
VITE_API_URL="http://localhost:3000"
```

The frontend defaults to `http://localhost:3000` during development. For production, the backend URL is configured directly in `apps/client/src/lib/api.ts`.

---

## Running Locally

### Both services (recommended)

From the project root:

```bash
bun run dev
```

Turborepo starts the frontend and backend concurrently.

### Individual services

Backend:

```bash
cd apps/backend
bun run dev
```

Frontend:

```bash
cd apps/client
bun run dev
```

### Expected output

```
# Backend
⏳ Connecting to MongoDB: URL loaded ✓
✅ MongoDB connected successfully
🚀 Server running on port 3000

# Frontend
VITE v8.0.1  ready in 320 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open `http://localhost:5173` in your browser. Sign up, create a workflow, and start automating.

---

## API Reference

All endpoints are served from the Express backend. Protected routes require a `Bearer <token>` header via the `Authorization` field.

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| `POST` | `/signup` | No | Register a new user (email + password) |
| `POST` | `/signin` | No | Authenticate and receive a JWT token |
| `GET` | `/workflow` | Yes | List all workflows for the authenticated user |
| `POST` | `/workflow` | Yes | Create a new workflow (nodes + edges) |
| `GET` | `/workflow/:workflowId` | Yes | Get a specific workflow by ID |
| `PUT` | `/workflow/:workflowId` | Yes | Update an existing workflow (nodes + edges) |
| `GET` | `/workflow/executions/:workflowId` | Yes | List all executions for a workflow |
| `GET` | `/nodes` | No | List all available node definitions |

<details>
<summary>Request and response examples</summary>

**POST /signup**

```json
// Request
{ "email": "trader@example.com", "password": "secret123" }

// Response (201)
{ "message": "User created successfully", "userId": "664f..." }
```

**POST /signin**

```json
// Request
{ "email": "trader@example.com", "password": "secret123" }

// Response (200)
{ "message": "Login successful", "token": "eyJhbGciOi..." }
```

**POST /workflow**

```json
// Request (Authorization: Bearer <token>)
{
  "nodes": [
    {
      "id": "1",
      "nodeId": "price-trigger",
      "position": { "x": 100, "y": 100 },
      "data": { "kind": "TRIGGER", "metadata": { "asset": "SOL", "price": 180 } }
    },
    {
      "id": "2",
      "nodeId": "hyper-liquid",
      "position": { "x": 350, "y": 100 },
      "data": { "kind": "ACTION", "metadata": { "type": "LONG", "qty": 5, "symbol": "SOL" } }
    }
  ],
  "edges": [
    { "id": "1-2", "source": "1", "target": "2" }
  ]
}

// Response (200)
{ "message": "Workflow Created", "workflowId": "664f..." }
```

</details>

---

## FAQ — Why MongoDB?

**Q: Why MongoDB over PostgreSQL or MySQL for a workflow automation tool?**

Workflow nodes are inherently polymorphic. A `price-trigger` has `{ asset, price }`. A `timer` has `{ time }`. An exchange action has `{ type, qty, symbol, api_key }`. In a relational database, you either create a separate table per node type (painful joins, schema explosion) or stuff everything into a JSON column (defeating the purpose of choosing SQL). MongoDB's document model stores each workflow as a single document with embedded `nodes[]` and `edges[]`, where each node's `metadata` field accepts whatever that node type requires. No joins, no migrations when adding a new exchange.

**Q: Why not Prisma + PostgreSQL?**

Prisma works well for CRUD-heavy apps with stable, well-defined schemas. AutomateX is the opposite — the schema is intentionally dynamic. Node metadata varies per type and changes as new exchanges are added. Users configure arbitrary credential fields per action. Workflow structures are deeply nested documents. With Prisma, you would fight `Json` column types, lose type safety on the dynamic parts, and write migrations every time a new node type ships. Mongoose's `Schema.Types.Mixed` provides flexibility where needed while `required` and `enum` validators enforce structure on the critical paths.

**Q: Isn't schemaless dangerous?**

AutomateX is not schemaless — it is schema-flexible. Fixed fields (userId, position, edges, status) are strictly validated with Mongoose schema validators and Zod at the API boundary. Dynamic fields (node metadata, credentials) use `Mixed` type intentionally because they vary per integration. This creates a "structured envelope, flexible payload" pattern: the envelope (workflow shape, user, edges) is rigid, the payload (what each node does) is flexible.

**Q: What about horizontal scaling?**

MongoDB Atlas provides auto-sharding, read replicas, built-in monitoring, and serverless instances. The document model also means a single `findById()` fetches an entire workflow with all nodes and edges — no N+1 queries, no multi-table joins. Each API call is one round trip to the database.

**Q: Why Mongoose over the raw MongoDB driver?**

The raw driver provides too little structure. Prisma provides too much. Mongoose sits in the middle: `Schema` definitions document fields and types, `enum` validators on `kind` and `status` catch bad data at write time, `ref` fields enable population when needed, and `Mixed` type keeps metadata flexible without losing structural benefits. Enough guardrails to be safe, enough flexibility to ship fast.

**Q: Would you ever migrate to PostgreSQL?**

If AutomateX evolves to require complex relational queries (cross-user analytics, multi-table reports, transactional guarantees across entities), then PostgreSQL with Drizzle would be the right move. But for a workflow engine where the core operations are store, retrieve, and update documents, MongoDB is the right tool for the job.

---

## Contributing

Contributions are welcome.

**1. Fork the repository**

**2. Create a feature branch**

```bash
git checkout -b feat/add-binance-action
```

**3. Commit using conventional commits**

```bash
git commit -m "feat: add Binance exchange action node"
```

| Prefix | Use case |
|---|---|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `chore:` | Tooling, dependencies, configs |
| `docs:` | Documentation |
| `refactor:` | Code restructuring (no behavior change) |
| `test:` | Tests |

**4. Push and open a Pull Request**

```bash
git push origin feat/add-binance-action
```

**Guidelines:**

- Run `bun run lint` before submitting.
- Keep PRs focused — one feature or fix per PR.
- If adding a new node type, update both `apps/client/src/nodes/` and the `SUPPORTED_ACTIONS` or `SUPPORTED_TRIGGERS` arrays.
- Update `packages/common` types if the schema changes.

---

## License

MIT License. See [LICENSE](LICENSE) for details.

---

Built by [Nishant Singh](https://github.com/nishantsingh02)
