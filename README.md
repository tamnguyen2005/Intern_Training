# Day 8

# Product Catalog with Component-Based Architecture & Defensive UI

A lightweight React application built with Vite, demonstrating modular component design, clean separation of concerns, and defensive UI patterns.

---

## Getting Started (Setup)

Ensure you have **Node.js** installed on your machine. Open your terminal at the project root directory and run the following commands:

```bash
# Navigate to the project directory
cd D8

# Install all necessary dependencies
pnpm install

# Start the development server
pnpm run dev

```

## Project structure

src/
├── components/ # Presentational (Dumb) components focusing purely on UI
├── constant/ # Global configurations and hardcoded string constants
├── css/ # Scoped CSS stylesheets for individual components
├── data/ # Data layer containing static mock data (e.g., product lists)
├── App.jsx # The container (Smart) component managing core state and data flow
└── main.jsx # The absolute root entry point of the React application

## Architectural Decisions

1. Seperation of concerns

- Decision:Isolated the raw product array into a dedicated product.js file within the src/data/ directory instead of hardcoding it inside the components.
- Rationale: This ensures loose coupling. The UI components (ProductList, ProductCard) act as blank blueprints that receive data strictly via props. The UI doesn't care where the data comes from, making it trivial to swap this static mock data for a live API fetch in the future without breaking the layout.

2. Defensive UI Implementation

- Empty State Handling: Implemented an Early Return pattern inside ProductList to intercept empty arrays immediately, rendering a user-friendly message instead of a broken or blank layout.
- Error Isolate Partitioning: Wrapped the product grid in a custom ErrorBoundary Class Component. If a runtime evaluation error crashes a single product card, the error is safely captured, maintaining the uptime of the Header and Footer.

# Day 9

# State Management & Unidirectional Data Flow

A modular and highly interactive Shopping Cart application built with React and Vite. This project demonstrates state lifting, sibling-to-sibling component communication, and computed state optimization.

## Getting Started (Setup)

Ensure you have **Node.js** installed. Open your terminal at the project root directory and execute the following commands:

```bash
# Navigate to the project directory
cd D8

# Install project dependencies
pnpm install

# Launch the development server
pnpm run dev
```

src/
├── components/ # Presentational (Dumb) components
│ ├── Header.jsx # Displays the unified badge count
│ ├── ProductList.jsx # Renders the grid layout for product cards
│ ├── ProductCard.jsx # Displays individual items with an "Add to Cart" trigger
│ ├── Cart.jsx # Renders the shopping cart area with an Empty State fallback
│ ├── CartItem.jsx # Controls individual cart items (Quantity increment/decrement/delete)
│ └── ErrorBoundary.jsx # Isolates component tree crashes (Catch-all mechanism)
├── constant/ # Application-wide immutable configs and formatters
├── css/ # Scoped CSS styling for layout and presentation
├── data/ # Data layer containing mock repository data (`product.js`)
├── App.jsx # Core Smart Component managing centralized states and mutations
└── main.jsx # The official entry mount point for React

# Architectural Decisions

1. Centralized State

- Decision: Lifted the cart state up entirely into the global container App.jsx. All secondary child components (Header, ProductList, Cart) operate as purely presentational (Dumb) components.
- Rationale: This prevents state desynchronization across sibling components. Components never mutate state directly. Instead, they propagate action events upward via declarative callback functions (handleAddToCart, handleRemove, handleUpdate), maintaining a strictly predictable Unidirectional Data Flow.

# Day 10

# Client-Side Routing, Route Guards & Authentication History Stack

A modular React application demonstrating advanced client-side routing architectures, secure navigation guards, deep-linking capabilities, and programmatic history stack control using React Router v6.

## Getting Started (Setup)

Ensure you have Node.js and pnpm installed on your machine. Open your terminal at the project root directory and run the following commands:

# Navigate to the project directory

cd D8

# Install all necessary dependencies cleanly via pnpm

pnpm install

# Start the local development server

pnpm dev

# Project Structure

src/
├── components/ # Presentational (Dumb) components
│ ├── Header.jsx # Displays the navigation bar with active links & badge count
│ ├── ProductList.jsx
│ ├── ProductCard.jsx
│ ├── Cart.jsx # Private cart view requiring authentication guard
│ ├── CartItem.jsx
│ ├── MainLayout.jsx # Master Layout wrapping persistent UI (Header/Footer) with <Outlet />
│ └── ErrorBoundary.jsx
├── router/ # Layer decoupled from UI handling application pathways
│ ├── index.jsx # Centralized configuration initializing createBrowserRouter
│ └── ProtectedRoute.jsx # Guard intercepting unauthorized route executions
├── constant/ # Application-wide immutable configs and formatters
├── css/ # Scoped CSS styling for layout and presentation
├── data/ # Data layer containing mock repository data (product.js)
├── App.jsx # Smart Container managing state providers and routing injections
└── main.jsx # The official entry mount point for the React application tree

# Architectural Decisions

1. Unified Route Configuration & Deep-Linking Optimization

- Decision: Implemented centralized client-side routing using React Router v6 createBrowserRouter engine, separating structural page templates (/, /products/:id, /cart, /login, /404) from presentational layouts. Utilized native <Link> and <NavLink> elements instead of standard HTML <a> tags.
- Rationale: Standard <a> tags force a hard browser refresh, destroying the in-memory state of the Single Page Application (SPA). <Link> intercepts navigation at the history layer, enabling instant DOM manipulation. Centralized routing ensures that Direct URL access (deep-linking straight to /cart or /products/7) parses correctly from the browser address bar on cold boots without relying on a home page initiation.

2. Defensive Routing & Intended URL Preservation (Route Guards)

- Decision: Isolated sensitive application segments using a declarative <ProtectedRoute> wrapper component that intercepts unauthorized traffic based on global context states.
- Rationale: If an unauthenticated profile triggers a state evaluation failure when accessing private routes like /cart, the guard immediately intercepts rendering. Instead of a silent failure, it issues an early return with a <Navigate /> element. Critically, it maps the current location.pathname into the navigation data parcel (state: { from: location }). This guarantees that upon a successful authentication event at /login, the application reads the payload and performs an automatic redirection back to the user's originally intended destination, drastically enhancing UX fidelity.

3. Native History Stack Manipulation & Navigation Ring-Fencing

- Decision: Integrated strict replace: true mutations across all automated programmatic redirects within the <Navigate /> components and Maps() functional pipelines.
- Rationale: Standard routing actions append (push) entries onto the browser's navigation history stack. If a user is forcefully thrown from /cart to /login, a push action leaves the broken /cart route directly behind it. Hitting the native browser "Back" button would trap the client in an infinite loop of /login -> /cart -> /login. By enforcing history replacement (replace), the unauthorized index entry is overwritten. Concurrently, native browser memory grouping collapses back-to-back matching base URLs (e.g., [Home, Home] merges to [Home]), guaranteeing that the physical browser "Back" button navigates completely out of the authentication portal rather than misfiring.

# Day 11

# Production-Level Forms with Schema Validation & Clean UX

A high-performance React form implementation utilizing un-controlled components, schema-driven validation structures, asynchronous state disabling, and non-aggressive UX patterns.

# Getting started

Ensure you have Node.js and pnpm installed on your machine. Open your terminal at the project root directory and run the following commands:

# Navigate to the project directory

cd D8

# Install required form ecosystem packages via pnpm

pnpm install

# Start the local development server

pnpm run dev

# Project Structure

src/
├── components/
│ ├── ProductForm/ # Encapsulated product generation domain
│ │ ├── ProductForm.tsx # Component orchestrating the form layout and execution
│ │ └── product.schema.ts # Immutable structural schema defining validation boundaries
│ ├── MainLayout.jsx
│ ├── Header.jsx
│ └── ErrorBoundary.jsx
├── router/
│ └── index.jsx # Routes /products/create inside the navigation matrix
├── css/
│ └── ProductForm.css # Layout boundaries for input scopes and error callouts
├── vite-env.d.ts # Global environment types declaring custom file extension modules
├── App.jsx
└── main.jsx

# Architectural Decisions

1. Decoupled Schema-Driven Constraint Architecture

- Decision: Implemented a formalized data schema definition inside product.schema.ts leveraging the Zod parsing framework, directly mapping typing constraints onto the ProductFormData interface type.
- Rationale: Hardcoding validation logic directly inside individual UI input change events introduces major performance overhead and tightly couples validation rules to presentational code. Isolating constraints within an immutable central schema replicates a server-side DTO (Data Transfer Object) architecture on the client. This enforces structural data formatting (name minima, price float boundaries, valid string imageUrl structures) before any functional payload assembly occurs.

2. High-Performance Uncontrolled Elements & Non-Aggressive UX Evaluation

- Decision: Connected the DOM layout directly to react-hook-form via the structural pointer spread operator (...register), initializing execution configurations under the mode: 'onTouched' validation profile.
- Rationale: Standard state synchronization patterns (useState binding to every input keystroke) re-render the entire component tree on every single letter typed, causing massive typing lag in deep layout architectures. Utilizing pointer registrations keeps elements uncontrolled, letting the native DOM manage string changes quietly. To guarantee a Clean UX (Not Aggressive), setting the engine to evaluate only onTouched prevents immediate error messages from flashing red when the page first boots. The framework waits patiently until a client formally focuses and tabs away from a field before validating that specific sector.

3. Defensive Submission State Locking & Global Error Consolidation

- Decision: Integrated an asymmetric isSubmitting flag tied into the disabled attributes of every fieldset component, coupled with an automated top-level Error Summary notification box mapping the global errors object.
- Rationale: Asynchronous infrastructure calls are prone to human operational errors, such as clicking a submit button multiple times while waiting for a slower network pipeline. Enforcing hard input disabling (disabled={isSubmitting}) freezes the entire document context instantly during network execution, neutralizing race conditions or duplicated entity requests. Supplementing this with an Error Summary widget at the form's apex provides accessible layout diagnostics, aggregating deep nested validation flaws into a centralized reader view for fast, intuitive error resolution.
