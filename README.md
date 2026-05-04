<p align="center">
  <h1 align="center">⚡ AutomateX</h1>
  <p align="center"><strong>Build. Connect. Trade — on autopilot.</strong></p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT License" />
</p>

AutomateX is a **visual trading workflow automation platform** that lets you design, deploy, and monitor algorithmic trading strategies through a drag-and-drop canvas — no code required. It's built for crypto traders who want to wire up triggers (price alerts, timers) to exchange actions (Hyperliquid, Backpack, Lighter) and let bots execute on their behalf.

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 🧩 | **Visual Workflow Builder** | Drag-and-drop canvas powered by ReactFlow — connect trigger nodes to action nodes with edges |
| ⏱️ | **Timer Trigger** | Fire workflows on a recurring interval (seconds → hours), with smart display formatting |
| 📈 | **Price Trigger** | Trigger actions when an asset (SOL, ETH, BTC) crosses a price threshold |
| 🔄 | **Multi-Exchange Actions** | Execute trades on **Hyperliquid**, **Backpack**, and **Lighter** — LONG/SHORT, custom qty & symbol |
| 🔐 | **JWT Authentication** | Full signup/signin flow with bcrypt password hashing and 7-day token expiry |
| 📊 | **Dashboard** | List, inspect, and manage all your workflows with node/edge count at a glance |
| ✏️ | **Edit Mode** | Re-open any saved workflow on the canvas, tweak nodes/edges, and update in place |
| 👁️ | **Workflow Preview** | Read-only ReactFlow canvas to visually inspect a workflow without risk of accidental edits |
| 📜 | **Execution History** | View per-workflow execution logs with status badges (SUCCESS / FAILED / PENDING) and timestamps |
| 🧱 | **Turborepo Monorepo** | Shared `common` (Zod schemas + types) and `db` (Mongoose models) packages across frontend & backend |
| 🛡️ | **Zod Validation** | Every API payload is validated at the edge using shared Zod schemas — one source of truth |
| 🎨 | **Shadcn/ui + Radix** | Premium UI components (Sheet, Select, Toast, Button) with accessible, production-ready primitives |
| 🌐 | **Deploy-Ready** | Vercel (frontend) + Render/Railway (backend) configs included out of the box |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [TypeScript 6](https://www.typescriptlang.org) | Type safety |
| [Vite 8](https://vite.dev) | Dev server & build tool |
| [ReactFlow (@xyflow/react)](https://reactflow.dev) | Visual node/edge canvas |
| [TailwindCSS 4](https://tailwindcss.com) | Utility-first styling |
| [Shadcn/ui + Radix](https://ui.shadcn.com) | Accessible component primitives |
| [Framer Motion](https://motion.dev) | Animations |
| [Axios](https://axios-http.com) | HTTP client with interceptors |
| [React Router 7](https://reactrouter.com) | Client-side routing |
| [Lucide React](https://lucide.dev) | Icon library |

### Backend

| Technology | Purpose |
|---|---|
| [Node.js ≥18](https://nodejs.org) | Runtime |
| [Express 5](https://expressjs.com) | HTTP server framework |
| [MongoDB + Mongoose 9](https://mongoosejs.com) | Database & ODM |
| [JSON Web Tokens](https://jwt.io) | Stateless authentication |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Password hashing |
| [Zod 4](https://zod.dev) | Schema validation (shared) |
| [CORS](https://github.com/expressjs/cors) | Cross-origin configuration |

### Tooling

| Tool | Purpose |
|---|---|
| [Turborepo](https://turbo.build) | Monorepo orchestration |
| [Bun](https://bun.sh) | Package manager & runtime |
| [Prettier](https://prettier.io) | Code formatting |
| [ESLint](https://eslint.org) | Linting |

---

## 📁 Project Structure

```
AutomateX/
├── apps/
│   ├── client/                        # React frontend (Vite)
│   │   ├── src/
│   │   │   ├── App.tsx                # Root router — all page routes
│   │   │   ├── main.tsx               # React DOM entry point
│   │   │   ├── components/
│   │   │   │   ├── CreateWorkflow.tsx  # ⭐ Visual workflow builder (ReactFlow canvas)
│   │   │   │   ├── ActionSheet.tsx     # Slide-over panel for configuring exchange actions
│   │   │   │   ├── TriggerSheet.tsx    # Slide-over panel for configuring triggers
│   │   │   │   ├── pages/
│   │   │   │   │   ├── Landing.tsx     # Marketing landing page
│   │   │   │   │   ├── Auth.tsx        # Sign in / Sign up form
│   │   │   │   │   ├── Dashboard.tsx   # Workflow list + management
│   │   │   │   │   ├── WorkflowDetail.tsx   # Single workflow inspector + preview
│   │   │   │   │   ├── EditWorkflow.tsx     # Edit mode — re-opens canvas with saved state
│   │   │   │   │   ├── WorkflowExecutions.tsx  # Execution history for a workflow
│   │   │   │   │   └── Loading.tsx     # Loading spinner component
│   │   │   │   └── ui/                # Shadcn/ui primitives (Button, Input, Sheet, Select, Toast...)
│   │   │   ├── nodes/
│   │   │   │   ├── triggers/
│   │   │   │   │   ├── priceTrigger.tsx  # Price alert trigger node
│   │   │   │   │   └── timmer.tsx        # Interval timer trigger node
│   │   │   │   └── actions/
│   │   │   │       ├── Lighter.tsx       # Lighter exchange action node
│   │   │   │       ├── hyper-liquid.tsx   # Hyperliquid exchange action node
│   │   │   │       └── backpack.tsx      # Backpack exchange action node
│   │   │   ├── hooks/
│   │   │   │   └── use-toast.ts       # Toast notification hook
│   │   │   └── lib/
│   │   │       ├── api.ts             # ⭐ Axios client, interceptors, all API functions + types
│   │   │       └── utils.ts           # clsx + tailwind-merge utility
│   │   ├── vite.config.ts             # Vite + Tailwind + path alias config
│   │   ├── vercel.json                # Vercel SPA rewrite rules
│   │   └── package.json
│   │
│   └── backend/                       # Express API server
│       ├── index.ts                   # ⭐ All REST routes + MongoDB connection bootstrap
│       ├── middleware.tsx              # JWT auth middleware (Bearer token extraction)
│       ├── vercel.json                # Vercel serverless config
│       └── package.json
│
├── packages/
│   ├── common/                        # Shared types & validation schemas
│   │   ├── types/index.ts             # Zod schemas (signup, signin, workflow CRUD)
│   │   └── metadeta/index.ts          # Trading types (TradingMetadata, PriceTrigger, Timer)
│   ├── db/                            # Shared Mongoose models
│   │   └── index.ts                   # ⭐ User, Workflow, Node, Edge, Execution schemas + connectDB
│   ├── eslint-config/                 # Shared ESLint configuration
│   └── typescript-config/             # Shared tsconfig presets
│
├── turbo.json                         # Turborepo pipeline configuration
├── package.json                       # Root workspace config (Bun workspaces)
└── .gitignore
```

> **Architecture highlight:** The `packages/common` package acts as a single source of truth — Zod schemas defined once are consumed by *both* the frontend (for type inference) and the backend (for request validation). This eliminates type drift between client and server.

---

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

| Requirement | Version | Notes |
|---|---|---|
| **Node.js** | ≥ 18 | Required for both frontend and backend |
| **Bun** | ≥ 1.3 | Package manager & backend runtime ([install](https://bun.sh)) |
| **MongoDB** | 6+ | Local install or [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier works) |
| **Git** | Latest | To clone the repository |

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/nishantsingh02/AutomateX.git
cd AutomateX
```

### 2. Install all dependencies (root, client, backend, packages)

```bash
bun install
```

> Bun workspaces will automatically resolve and link the `common` and `db` packages across all apps.

### 3. Configure environment variables

Copy the example env files and fill in your values (see [Environment Variables](#-environment-variables) below):

```bash
# Backend
cp apps/backend/.env.example apps/backend/.env

# Client (optional — only if you need to override the API URL)
# The default points to localhost:3000 during development
```

---

## 🔐 Environment Variables

### Backend — `apps/backend/.env`

```env
# MongoDB connection string — use Atlas for production, localhost for dev
MONGO_URL="mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/AutomateX?retryWrites=true&w=majority&appName=Cluster0"

# Secret key used to sign and verify JWT tokens — use a strong random string in production
JWT_SECERTE="your-super-secret-jwt-key-here"

# Port the Express server listens on
PORT=3000
```

### Frontend — `apps/client/.env` *(optional)*

```env
# Override the backend API URL (defaults to http://localhost:3000 in development)
# In production, this is hardcoded in lib/api.ts — update it to your deployed backend URL
VITE_API_URL="http://localhost:3000"
```

<details>
<summary><strong>📝 .env.example files</strong></summary>

#### `apps/backend/.env.example`

```env
# ============================================
# AutomateX Backend — Environment Variables
# ============================================

# MongoDB connection URI
# For local development: mongodb://localhost:27017/automatex
# For Atlas: mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/AutomateX
MONGO_URL="mongodb://localhost:27017/automatex"

# JWT signing secret — CHANGE THIS in production
JWT_SECERTE="change-me-to-a-strong-random-string"

# Server port
PORT=3000
```

#### `apps/client/.env.example`

```env
# ============================================
# AutomateX Frontend — Environment Variables
# ============================================

# Backend API base URL
# Development: http://localhost:3000
# Production: https://your-backend.onrender.com
VITE_API_URL="http://localhost:3000"
```

</details>

---

## ▶️ Running Locally

### Option A: Run everything with Turborepo (recommended)

From the project root:

```bash
bun run dev
```

This starts **both** the frontend dev server and the backend concurrently via Turbo's pipeline.

### Option B: Run services individually

**Backend:**

```bash
cd apps/backend
bun run dev
```

**Frontend:**

```bash
cd apps/client
bun run dev
```

### Expected output

```
Backend:
⏳ Connecting to MongoDB: URL loaded ✓
✅ MongoDB connected successfully
🚀 Server running on port 3000

Frontend:
  VITE v8.0.1  ready in 320 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open [http://localhost:5173](http://localhost:5173) to see the app. Sign up, create a workflow, and start automating!

---

## 📡 API Reference

All endpoints are served from the Express backend. Auth-protected routes require a `Bearer <token>` header.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/signup` | ❌ | Register a new user (email + password) |
| `POST` | `/signin` | ❌ | Authenticate and receive a JWT token |
| `GET` | `/workflow` | ✅ | List all workflows for the authenticated user |
| `POST` | `/workflow` | ✅ | Create a new workflow (nodes + edges) |
| `GET` | `/workflow/:workflowId` | ✅ | Get a specific workflow by ID |
| `PUT` | `/workflow/:workflowId` | ✅ | Update an existing workflow's nodes and edges |
| `GET` | `/workflow/executions/:workflowId` | ✅ | List all executions for a workflow |
| `GET` | `/nodes` | ❌ | List all available node definitions (triggers + actions) |

<details>
<summary><strong>Request/Response Examples</strong></summary>

#### POST `/signup`

```json
// Request
{ "email": "trader@example.com", "password": "secret123" }

// Response — 201
{ "message": "User created successfully", "userId": "664f..." }
```

#### POST `/signin`

```json
// Request
{ "email": "trader@example.com", "password": "secret123" }

// Response — 200
{ "message": "Login successful", "token": "eyJhbGciOi..." }
```

#### POST `/workflow`

```json
// Request (Bearer token required)
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

// Response — 200
{ "message": "Workflow Created", "workflowId": "664f..." }
```

</details>

---

## ❓ FAQ — Why MongoDB?

<details>
<summary><strong>Q: Why MongoDB over PostgreSQL or MySQL for a workflow automation tool?</strong></summary>

**A:** Workflow nodes are inherently polymorphic. A `price-trigger` node has `{ asset, price }` metadata. A `timer` node has `{ time }`. An exchange action node has `{ type, qty, symbol, api_key }`. In a relational database, you'd either:

1. Create a separate table per node type (explosion of tables, painful joins), or
2. Stuff everything into a JSON column (defeating the purpose of choosing a relational DB)

MongoDB's document model lets us store each workflow as a single document with embedded `nodes[]` and `edges[]` arrays, where each node's `metadata` field is `Mixed` — it stores whatever that node type needs. No joins, no schema migrations when we add a new exchange, no awkward JSON column hacks.

</details>

<details>
<summary><strong>Q: Why not Prisma + PostgreSQL? Isn't that the modern default?</strong></summary>

**A:** Prisma is excellent for CRUD-heavy apps with well-defined, stable schemas. AutomateX is the opposite — our schema is intentionally *dynamic*:

- Node metadata varies per node type and will keep changing as we add exchanges
- Users can configure arbitrary credential fields per action
- Workflow structures are deeply nested (documents with sub-documents)

With Prisma, you'd fight `Json` column types, lose type safety on the dynamic parts anyway, and write manual migrations every time a new node type ships. Mongoose's `Schema.Types.Mixed` gives us the flexibility we need while `required` and `enum` validators keep the critical paths type-safe.

</details>

<details>
<summary><strong>Q: Isn't schemaless dangerous? Don't you lose data integrity?</strong></summary>

**A:** We're not schemaless — we're **schema-flexible**. There's a critical distinction:

- **Fixed fields** (userId, position, edges, status) are strictly validated with Mongoose schema validators *and* Zod at the API boundary
- **Dynamic fields** (node metadata, credentials) use `Mixed` type intentionally — they vary per integration

This gives us a "structured envelope, flexible payload" pattern. The envelope (workflow shape, user, edges) is rigid. The payload (what each node does) is flexible. Best of both worlds.

</details>

<details>
<summary><strong>Q: What about horizontal scaling? Can this handle growth?</strong></summary>

**A:** MongoDB Atlas provides:

- **Auto-sharding** — distribute workflows across nodes as data grows
- **Read replicas** — scale execution history reads independently
- **Built-in monitoring** — Atlas dashboards out of the box
- **Serverless instances** — pay-per-operation pricing for early stages

The document model also means a single `findById()` fetches an entire workflow with all its nodes and edges — no N+1 queries, no multi-table joins. Each API call is one round trip to the database.

</details>

<details>
<summary><strong>Q: Why Mongoose over the raw MongoDB driver?</strong></summary>

**A:** Raw driver gives you too little structure. Prisma gives you too much. Mongoose sits in the sweet spot:

- `Schema` definitions document what fields exist and their types
- `enum` validators on `kind: ["ACTION", "TRIGGER"]` and `status: ["PENDING", "SUCCESS", "FAILURE"]` catch bad data at write time
- `ref` fields (`userId → Users`) give us population when needed
- `Mixed` type lets metadata stay flexible without losing the structural benefits above

It's enough guardrails to sleep at night, enough flexibility to ship fast.

</details>

<details>
<summary><strong>Q: Will you ever migrate to PostgreSQL?</strong></summary>

**A:** If AutomateX evolves to need complex relational queries (cross-user analytics, multi-table reports, transactional guarantees across entities), then yes — PostgreSQL with something like Drizzle would be the move. But for a workflow engine where the core operation is "store a document, retrieve a document, update a document," MongoDB is the right tool. We'll cross that bridge if the data access patterns demand it.

</details>

---

## 🤝 Contributing

Contributions are welcome! Here's how to get involved:

### Workflow

```bash
# 1. Fork the repository

# 2. Create your feature branch
git checkout -b feat/add-binance-action

# 3. Make your changes and commit
git commit -m "feat: add Binance exchange action node"

# 4. Push to your fork
git push origin feat/add-binance-action

# 5. Open a Pull Request against `main`
```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|---|---|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `chore:` | Tooling, deps, configs |
| `docs:` | Documentation changes |
| `refactor:` | Code restructuring (no behavior change) |
| `style:` | Formatting, whitespace |
| `test:` | Adding or updating tests |

### Guidelines

- Run `bun run lint` before submitting
- Keep PRs focused — one feature or fix per PR
- If adding a new node type, add it to *both* `apps/client/src/nodes/` and the `SUPPORTED_ACTIONS`/`SUPPORTED_TRIGGERS` arrays
- Update the shared `packages/common` types if the schema changes

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 AutomateX

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<p align="center">
  Built with 🔥 by <a href="https://github.com/nishantsingh02">Nishant Singh</a>
</p>
