CREATE DATABASE IF NOT EXISTS orders_products;
USE orders_products;

CREATE TABLE orders (
  id INT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATETIME NOT NULL
);

CREATE TABLE products (
  id INT PRIMARY KEY,
  serial_number INT NOT NULL,
  is_new TINYINT(1) NOT NULL DEFAULT 0,
  photo VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  specification VARCHAR(255),
  guarantee_start DATETIME NOT NULL,
  guarantee_end DATETIME NOT NULL,
  order_id INT NOT NULL,
  date DATETIME NOT NULL,
  CONSTRAINT fk_products_orders
    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE
);

CREATE TABLE product_prices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  value DECIMAL(12, 2) NOT NULL,
  symbol VARCHAR(8) NOT NULL,
  is_default TINYINT(1) NOT NULL DEFAULT 0,
  CONSTRAINT fk_product_prices_products
    FOREIGN KEY (product_id)
    REFERENCES products(id)
    ON DELETE CASCADE
);

INSERT INTO orders (id, title, description, date) VALUES
  (1, 'Order 1', 'desc', '2017-06-29 12:09:33'),
  (2, 'Order 2', 'desc', '2017-06-29 12:09:33'),
  (3, 'Order 3', 'desc', '2017-06-29 12:09:33');

INSERT INTO products (
  id,
  serial_number,
  is_new,
  photo,
  title,
  type,
  specification,
  guarantee_start,
  guarantee_end,
  order_id,
  date
) VALUES
  (
    1,
    1234,
    1,
    'pathToFile.jpg',
    'Product 1',
    'Monitors',
    'Specification 1',
    '2017-06-29 12:09:33',
    '2017-06-29 12:09:33',
    1,
    '2017-06-29 12:09:33'
  ),
  (
    2,
    1234,
    1,
    'pathToFile.jpg',
    'Product 1',
    'Monitors',
    'Specification 1',
    '2017-06-29 12:09:33',
    '2017-06-29 12:09:33',
    2,
    '2017-06-29 12:09:33'
  );

INSERT INTO product_prices (product_id, value, symbol, is_default) VALUES
  (1, 100, 'USD', 0),
  (1, 2600, 'UAH', 1),
  (2, 100, 'USD', 0),
  (2, 2600, 'UAH', 1);
