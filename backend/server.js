import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { orders, products } from './data/mock.js';
import { initSocket } from './socket.js';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4000;
const clientUrls = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean);

const isAllowedOrigin = (origin) => {
  const isRenderOrigin = /^https:\/\/[a-z0-9-]+\.onrender\.com$/.test(origin || '');

  return !origin || clientUrls.includes(origin) || isRenderOrigin;
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  }
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    name: 'Orders & Products API',
    status: 'ok',
    endpoints: ['/api/health', '/api/orders', '/api/products']
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin ${origin} is not allowed by Socket.io CORS`));
    },
    methods: ['GET', 'POST']
  }
});

initSocket(io);

server.listen(port, () => {
  console.log(`Orders & Products API is running on port ${port}`);
});
