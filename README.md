# Order App — Frontend

React frontend for the Order App — a simple e-commerce/order management interface used for browsing products, adding items to a cart, placing orders, and viewing order history.

## Features

- User authentication (Register / Login)
- Browse products and add to cart
- View and edit cart, remove items
- Place orders and view order history
- Role-based UI (customer / delivery / admin)

## Prerequisites

- Node.js (v16+) and npm
- Backend API running (see project owner for details)

## Setup

1. Install dependencies:

	npm install

2. Configure environment (optional):

	- Create a `.env` file in the project root to override the API base URL if needed:

	  REACT_APP_API_BASE_URL=http://localhost:8000/api/

	The frontend uses `src/services/api.js` to read `REACT_APP_API_BASE_URL` (fallbacks to the default configured in the service file).

3. Start the development server:

	npm start

	Open http://localhost:3000 in your browser.

### Clone the repository (optional)

If you haven't already cloned this repository, run:

```bash
git clone https://github.com/poonamsweet/order-frontend.git
cd order-frontend
```


## Available Scripts

- `npm start` — Run the dev server (hot reload).
- `npm run build` — Build production bundle into `build/`.
- `npm test` — Run tests (if present).

## Project Structure (important files)

- `src/pages/` — Page components (Products, Cart, Orders, Register, Login, Dashboard)
- `src/components/` — Shared UI components (Navbar, etc.)
- `src/services/api.js` — Axios instance and API helpers
- `public/` — Static assets and `index.html`

## Styling

This project uses a mix of simple CSS and inline styles. You can find global styles in `src/App.css` and per-page styles inside their respective components.

## Notes

- Cart contents are stored in `localStorage` for unauthenticated flows. When placing an order the frontend calls the backend `orders/` endpoint.
- If you see CORS or network issues while connecting to the backend, confirm `REACT_APP_API_BASE_URL` and backend CORS settings.

## Contributing

Contributions are welcome. Open an issue or submit a pull request with a clear description of changes.

## License

This repository does not include a license file. Add a license if you plan to publish this project.
