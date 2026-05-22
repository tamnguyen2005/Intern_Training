# Product Catalog with Component-Based Architecture & Defensive UI

A lightweight React application built with Vite, demonstrating modular component design, clean separation of concerns, and defensive UI patterns.

---

## 🚀 Getting Started (Setup)

Ensure you have **Node.js** installed on your machine. Open your terminal at the project root directory and run the following commands:

```bash
# Navigate to the project directory
cd D8

# Install all necessary dependencies
npm install

# Start the development server
npm run dev

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
