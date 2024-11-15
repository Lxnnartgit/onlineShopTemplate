
# Online Shop Application

An online shop web application built with **Node.js**, **Express.js**, and **MongoDB**. The app provides a platform to browse and manage products, complete with a front-end for users and an admin panel for developers.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

---

## Features

### User-Facing Features
1. **Home Page**: Browse products currently in stock.
2. **Product Search**: Search for products by name.
3. **Product Details**: View detailed information about individual products.
4. **About Page**: Learn more about the shop.
5. **Contact Form**: Submit inquiries via a simple form.

### Developer/Admin Features
1. **Admin Dashboard** (`/dev_products`):
   - Add, edit, delete, and view products.
   - Search and view specific products using their `slug` or name.
2. Development Routes for testing product queries and managing data.

---

## Technologies Used

- **Node.js**: Runtime for JavaScript.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: Database for storing product data.
- **EJS**: Templating engine for rendering views.

---

## Installation

### Prerequisites
1. Install [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
2. Install [MongoDB](https://www.mongodb.com/) and ensure the database is running.

### Steps
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/yourrepository.git
   cd yourrepository
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables (see [Environment Variables](#environment-variables)).
4. Start the application:
   ```bash
   npm start
   ```

---

## Usage

To access the Website visit: https://onlineshoptemplate.onrender.com

### Routes Overview

#### User Routes
- `/`: Home page displaying products in stock.
- `/products`: List all products.
- `/products/:slug`: View detailed information for a product by its `slug`.
- `/search/:name`: Search for products by name.
- `/about`: Static about page.

#### Admin/Developer Routes
- `/dev_products`: Admin dashboard for managing products.
- `/dev_products/dev_add_product`: Form to add new products.
- `/dev_products/:slug`: View detailed product information.
- `/dev_products/:slug/dev_edit_product`: Edit a product.
- `/dev_products/:slug/delete`: Delete a product.

---



