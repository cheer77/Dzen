# Orders & Products

SPA application for working with orders and products from the DzenCode-style test task. The app shows orders, products, product type filtering, order details, delete confirmation, live time and a Socket.io active tabs counter.

## Tech Stack

- React 19
- React Router DOM
- Redux Toolkit
- Axios
- Socket.io client/server
- Express
- Bootstrap + BEM SCSS
- Vite
- Vitest
- Docker + Docker Compose
- Local mock data

## Implemented Features

- Navigation menu with routes: `/orders`, `/products`
- Top menu with live date/time
- WebSocket counter for active browser sessions/tabs
- Orders page:
  - list of orders
  - products count per order
  - order date in raw and human-readable formats
  - order total in USD and UAH
  - side panel with order details
  - delete confirmation modal
- Products page:
  - list of all products
  - product type filter
  - filter form validation
  - selected filter persistence in `localStorage`
  - warranty dates in raw and human-readable formats
  - prices in multiple currencies
  - related order title
- Route lazy loading with `React.lazy`
- CSS route transition animation
- Unit tests for Redux/formatted data helpers
- SQL schema file for MySQL Workbench

## Project Structure

```text
frontend/
  src/
    app/
    features/
      orders/
      products/
    components/
      NavigationMenu/
      TopMenu/
      Modal/
    pages/
      OrdersPage/
      ProductsPage/
    services/
      api/
      socket/
    styles/
    utils/
backend/
  server.js
  socket.js
  data/mock.js
db/
  schema.sql
docker-compose.yml
```

## Quick Start

For the first local run:

```bash
npm run install:all
npm run dev
```

Open:

```text
http://localhost:5173
```

The command `npm run dev` starts:

- frontend: `http://localhost:5173`
- backend: `http://localhost:4000`

## Local Commands

Install dependencies:

```bash
npm run install:all
```

Start frontend and backend:

```bash
npm run dev
```

Build frontend:

```bash
npm run build
```

Run unit tests:

```bash
npm run test
```

Backend health check:

```text
http://localhost:4000/api/health
```

## Docker

Build and run both containers:

```bash
docker-compose up --build
```

Open:

```text
http://localhost:5173
```

Stop containers with `Ctrl+C` in the Docker Compose terminal.

## Environment Variables

Backend:

- `PORT` - backend port, default `4000`
- `CLIENT_URL` - frontend origin allowed by CORS, default `http://localhost:5173`

Frontend:

- `VITE_API_URL` - API base URL, default `http://localhost:4000/api`
- `VITE_SOCKET_URL` - Socket.io server URL, default `http://localhost:4000`

Docker Compose passes frontend variables as build args.

## API

- `GET /api/health` - backend health status
- `GET /api/orders` - orders mock data
- `GET /api/products` - products mock data

## Socket.io

The backend initializes Socket.io in `backend/server.js` and connection tracking in `backend/socket.js`.

On each client connection, the server increments an in-memory active users counter and emits:

```text
usersCount
```

On disconnect, the counter is decremented and emitted again. The frontend connects in `TopMenu` and displays the counter in real time.

## Mock Data

The mock data is stored in `backend/data/mock.js`. It follows the provided `app.js` structure:

- order fields: `id`, `title`, `date`, `description`, `products`
- product fields: `id`, `serialNumber`, `isNew`, `photo`, `title`, `type`, `specification`, `guarantee`, `price`, `order`, `date`

Products are linked to orders by `product.order === order.id`.

## Database Schema

The schema file is located here:

```text
db/schema.sql
```

It can be opened or imported in MySQL Workbench. The app itself uses local mock data and does not require a running database.

## Notes

This implementation intentionally avoids overengineering such as microservices, micro frontends, GraphQL, SSR and WebAssembly. For this test task, the project focuses on a clean SPA architecture, readable React/Redux flow, Docker packaging, WebSocket behavior and a reproducible local setup.
