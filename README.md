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
├── components/ # Presentational (Dumb) components
│ ├── ProductForm/ # Encapsulated product generation domain
│ │ ├── ProductForm.tsx # Component orchestrating the form layout and execution
│ │ └── product.schema.ts # Immutable structural schema defining validation boundaries
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
├── vite-env.d.ts # Global environment types declaring custom file extension modules
├── App.jsx # Smart Container managing state providers and routing injections
└── main.jsx # The official entry mount point for the React application tree

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

# Day 12

# Production-Level Network Architecture & Layered Defense

A high-performance React network layer implementation decoupling presentational layouts from business data fetching infrastructure. This design utilizes a typed client-server communication abstraction, centralized gatekeeping interceptors, and a finite multi-state interface routing engine coupled with native request cancellation safeguards.

# Getting started

Ensure you have Node.js and pnpm installed on your machine. Open your terminal at the project root directory and run the following commands:

```bash
# Navigate to the project directory
cd D8

# Install required network ecosystem packages via pnpm
pnpm install

# Start the local development server
pnpm run dev

```

# Project structure

src/
├── api/
│ └── api.ts # Centralized Axios network interceptor hub (Core Network)
├── assets/ # Static application resource vectors
├── components/ # Presentational (Dumb) Components layer
│ ├── ProductForm/ # Encapsulated product generation domain
│ │ ├── ProductForm.tsx # Component orchestrating the form layout and execution
│ │ └── product.schema.ts # Immutable structural schema defining validation boundaries
│ ├── Cart.jsx # Private cart view component requiring authentication guard
│ ├── CartItem.jsx # Granular card rendering for single basket entities
│ ├── ErrorBoundary.jsx # Global fallback boundary catching unhandled rendering crashes
│ ├── Header.jsx # Displays the navigation bar with active links & badge count
│ ├── MainLayout.jsx # Master Layout wrapping persistent UI (Header/Footer) with <Outlet />
│ ├── ProductCard.jsx # Presentational card component visualizing individual entities
│ └── ProductList.jsx # Layout grid arranging multiple product card slots
├── constant/ # System-wide immutable configuration metrics and formatters
├── css/ # Scoped CSS styling for layout and error presentation boundaries
├── data/ # Data layer containing mock repository data (product.js fallback)
├── Pages/ # Smart Containers / Structural view boundary matrices
│ ├── CartPage.jsx # Page wrapping cart domain logic
│ ├── Home.tsx # Upgraded TSX view hub acting as landing node
│ ├── Login.jsx # Presentation frame handling authorization submissions
│ ├── NotFound.jsx # Fallback template routing incorrect endpoints
│ └── ProductDetail.jsx # Dynamic node pulling individual entity metrics from API
├── routers/ # Layer decoupled from UI handling application pathways
│ ├── index.jsx # Centralized routing configurations initializing createBrowserRouter
│ └── ProtectedRoute.jsx # Guard intercepting unauthorized route executions (Auth Guard)
├── services/ # Stateless Layered Services (Data Management Hub)
│ ├── auth.service.ts # Encapsulated authentication interface operations
│ └── product.service.ts # Decoupled product mutation operations with AbortSignal triggers
├── types/ # Pure Structural Interfaces (Zero Runtime Overhead)
│ └── product.type.ts # Strict TypeScript mapping matching NestJS backend DTOs
├── App.jsx # Smart Container managing state providers and routing injections
├── main.jsx # The official entry mount point for the React application tree
└── vite-env.d.ts # Global environment type definitions declaring VITE\_ env parameters

# Architectural Decisions

1. Tiered Architecture & Centralized Gatekeeping Interceptors

- Decision: Extracted all HTTP communication logic out of UI components into a centralized network core (src/api/api.ts) and stateless business layers (src/services/). Set up a Request Interceptor to auto-inject Bearer tokens and a Response Interceptor to intercept global HTTP error codes (401, 500).
- Rationale: Embedding raw axios URL routes directly into user views causes massive code duplication, brittle dependencies, and high security risks. By implementing a Tiered Architecture, presentational layouts remain pure and completely oblivious to infrastructure routes. The Response Interceptor establishes a centralized defensive line—if a 401 Unauthorized token expiry occurs anywhere across 100 components, the network controller automatically flushes decayed tokens and triggers a synchronized expulsion to the /login gateway without component-level try/catch repetition.

2. Type-Safe Client Contracts with Zero Runtime Cost

- Decision: Formulated strict structural contracts using TypeScript interface markers (src/types/) rather than concrete instance classes to shape incoming raw server entities.
- Rationale: Concrete OOP class mapping patterns force the client CPU to run heavy data-parsing iterations (new Class(json)) across large arrays, severely lagging the UI. Opting for strict structural Interfaces provides rich IntelliSense autocomplete and compile-time defensive protection for the developer, yet completely evaporates during production build tasks (Zero Runtime Overhead), yielding the lightest and fastest vanilla JavaScript asset package bundle possible.

3. Finite Multi-State Interface Grid & Short-Circuit Abort Controllers (Day 14 Defence)

- Decision: Enforced a rigid state machine routing model dividing views into four specific outcomes: Loading (powered by shifting ghost Skeleton wireframe boxes), Error (with custom feedback callouts), Empty (defensively blocking white-screen voids), and Data-Ready. Coupled all hooks directly into a native browser AbortController cancellation signal pipeline.
- Rationale: To eliminate fragile interface flicker, the rendering layout leverages deterministic conditional checks to cleanly slide from ghost skeleton templates into real entity cards. To neutralize massive backend resource drains caused by impatient users jumping back and forth across routes, the useEffect dọn dẹp (cleanup) function acts as an immediate structural break-point. When a component unmounts, it invokes abortController.abort(), instantly snapping the browser network channel shut, eliminating memory leaks, and blocking stale background data overrides (Race Conditions).

# Day 13

A high-performance React network layer implementation decoupling presentational layouts from business data fetching infrastructure. This design utilizes a typed client-server communication abstraction, centralized gatekeeping interceptors, and a finite multi-state interface routing engine coupled with native request cancellation safeguards and atomic global state management

# Getting started

Ensure you have Node.js and pnpm installed on your machine. Open your terminal at the project root directory and run the following commands:

```bash
# Navigate to the project directory
cd D8

# Install required network ecosystem packages via pnpm
pnpm install

# Start the local development server
pnpm run dev
```

# Project structure

src/
├── api/
│ └── axiosClient.ts # Centralized Axios network interceptor hub (Core Network with JWT injection)
├── assets/ # Static application resource vectors
├── components/ # Presentational (Dumb) Components layer
│ ├── ProductForm/ # Encapsulated product generation domain
│ │ ├── ProductForm.tsx # Component orchestrating the form layout and execution
│ │ └── product.schema.ts # Immutable structural schema defining validation boundaries
│ ├── LoginForm/ # Encapsulated authentication generation domain (Upgraded)
│ │ └── login.schema.ts # Immutable structural schema defining email/password validation
│ ├── Cart.jsx # Private cart view component requiring authentication guard
│ ├── CartItem.jsx # Granular card rendering for single basket entities
│ ├── ErrorBoundary.jsx # Global fallback boundary catching unhandled rendering crashes
│ ├── Header.jsx # Displays the navigation bar with active links, theme toggle & badge count
│ ├── MainLayout.jsx # Master Layout wrapping persistent UI & managing global Dark Mode class
│ ├── ProductCard.jsx # Presentational card component visualizing individual entities
│ └── ProductList.jsx # Layout grid arranging multiple product card slots
├── constant/ # System-wide immutable configuration metrics and formatters
├── css/ # Scoped CSS styling for layout and error presentation boundaries
├── data/ # Data layer containing mock repository data (product.js fallback)
├── Pages/ # Smart Containers / Structural view boundary matrices
│ ├── CartPage.jsx # Page wrapping cart domain logic connected to useCartStore
│ ├── Home.tsx # Upgraded TSX view hub acting as landing node
│ ├── Login.tsx # Presentation frame handling authorization submissions with Zod Schema
│ ├── NotFound.jsx # Fallback template routing incorrect endpoints
│ └── ProductDetail.jsx # Dynamic node pulling individual entity metrics from API
├── routers/ # Layer decoupled from UI handling application pathways
│ ├── index.jsx # Centralized routing configurations initializing createBrowserRouter
│ └── ProtectedRoute.jsx # Guard intercepting unauthorized route executions (Auth Guard via useAuthStore)
├── services/ # Stateless Layered Services (Data Management Hub)
│ ├── auth.service.ts # Encapsulated authentication interface operations
│ └── product.service.ts # Decoupled product mutation operations with AbortSignal triggers
├── stores/ # Atomic Global State Layer (Zustand Micro-Stores)
│ ├── auth.store.ts # Auth store managing user profile, tokens, and persistent sessions
│ ├── cart.store.ts # Cart store executing immutable CRUD operations & localStorage synchronization
│ └── ui.store.ts # UI store controlling global theme mechanics (Dark/Light) with partial persistence
├── types/ # Pure Structural Interfaces (Zero Runtime Overhead)
│ └── product.type.ts # Strict TypeScript mapping matching NestJS backend DTOs
├── App.jsx # Smart Container managing state providers and routing injections
├── main.jsx # The official entry mount point for the React application tree
└── vite-env.d.ts # Global environment type definitions declaring VITE\_ env parameters

# Architectural Decisions

1. Atomic Global State Isolation via Zustand Micro-Stores

- Decision: Avoided a single monolithic global state tree by decomposing the application's shared data layer into three autonomous, domain-specific Micro-Stores: auth.store.ts, cart.store.ts, and ui.store.ts.
- Rationale: Forcing localized component states or unrelated domain metrics into a single giant store triggers widespread re-render cascades across the entire virtual DOM. Using Zustand allows us to initialize lightweight, decoupled hooks. This architectural separation ensures that adding an item to the basket or toggling a visual menu layout operates in independent memory contexts, adhering strictly to the principle of single responsibility.

2. Specialized Selectors as Render Guardrails (Anti-Pattern Defense)

- Decision: Enforced a strict rule prohibiting consumer components (Header.jsx, CartPage.jsx) from extracting raw, unmapped store objects. Components must subscribe to global state exclusively through deterministic functional selectors (e.g., filtering state down to primitive computed numeric values like totalItems).
- Rationale: Unchecked global state consumption introduces the critical No Selectors anti-pattern, where a component re-renders on every reference shift within the store. By utilizing selectors, Zustand compares the primitive output value rather than the root array's memory pointer (Object.is or ===). If a user updates an unlinked field (such as an order comment), the primitive number outputs remain identical, completely short-circuiting unnecessary render phases and protecting the CPU.

3. Defensive Immutability and Postfix Mutation Bans

- Decision: Established an absolute prohibition against direct memory mutations—specifically banning mutating JavaScript array and object operations (such as .push() or the postfix ++ operator) inside store modifiers. All transitions are handled via pure data mapping expressions (.map(), .filter()).
- Rationale: Modifying attributes directly on an existing object reference modifies the underlying data structure in place within the heap without generating a new memory pointer. This breaks Zustand’s shallow reference evaluation, leading to frozen application interfaces that fail to recognize structural state updates. Furthermore, reference pollution permanently breaks historical snapshot integrity, rendering time-travel debugging completely useless and disabling automatic data caching layers.

4. Domain Filtering for Localized Storage Persistence

- Decision: Configured granular middleware synchronization layers using the persist engine, augmented by explicit storage projection configurations (partialize slice isolation within the layout configurations).
- Rationale: While critical cross-session identifiers (such as active shopping items and secure authentication vectors) must persist across forced hard-refreshes, storing temporary user interface coordinates (like an active navigation side drawer status) pollutes local disk structures. Restricting persistence targets to critical long-term assets ensures the system maintains low-latency data structures while preventing configuration drift when a page initializes.

5. Transparent Debugging via Action Traceability

- Decision: Wrapped all execution blocks in explicit semantic identifiers passed via the centralized devtools tracking architecture (e.g., 'cart/addToCart', 'auth/logout').
- Rationale: Uncontrolled, untraceable dispatch systems make monitoring state flow impossible as systems grow. Explicit state labeling creates a reliable, step-by-step audit trail: Action -> State Snapshot -> Controlled UI Render. This structure allows developers to easily trace the exact cause of any interface mutation directly inside the debugging terminal.
