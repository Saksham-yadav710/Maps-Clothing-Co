<div align="center">

# 👕 MAPS Clothing Co. — Premium Full-Stack E-Commerce Platform

### *Wear Confidence, Spend Smart*

A modern, high-performance, and visually stunning men's fashion e-commerce platform built with React 19, TypeScript, Express, Prisma, and PostgreSQL.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

---

## ✨ Features at a Glance

| Area | Highlights |
|---|---|
| 🛍️ **Shopping Experience** | Curated catalog of shirts, jeans, trousers; instant text search; accordion-style category, price, and fit filters; size and color selectors; slide-out shopping cart. |
| 👤 **Flexible Authentication** | Secure JWT-based register and login flows with separate route guards for Customers, Administrators, and Delivery Partners. |
| 📦 **Order Lifecycle** | Seamless checkout, transaction-safe database updates, Cash on Delivery (COD) & card payment options, and instant order history. |
| 🚴 **Rider Portal** | Dedicated portal for delivery partners: view active deliveries, update status (Packed, Out for Delivery), update live coordinates, and complete orders via secure OTP. |
| 🛠️ **Admin Control Panel** | Comprehensive toolset to manage the store catalog, review details, toggle active delivery partners, customize banner notifications, and track analytics. |
| 📈 **Revenue Analytics** | Visual stats dashboard for admins showing total revenue generated, orders placed, orders delivered, and orders cancelled over custom intervals (1D, 3D, 1W, 1M, 3M, 6M, 9M, 1Y, and All-Time). |
| 📢 **Dynamic Promo Banner** | Real-time banner settings in the admin panel to update/dismiss the global app-wide promotion marquee text and visibility. |
| 🤖 **Background Automation** | Powered by **Inngest** for auto-assigning available riders (after a 5-minute cooldown), generating low-stock email alerts (< 10 units), and sending monthly promotional emails. |
| 🗺️ **Live Map Tracking** | Real-time rider location tracking on interactive Leaflet maps with status timelines. |
| 📧 **Email Notifications** | Styled transactional and marketing newsletters sent via Resend and Nodemailer. |
| 🖼️ **Media Hosting** | Fast and secure cloud image uploads via Cloudinary. |

---

## 🗂️ Project Structure

```
Maps-Clothing-Co-main/
├── client/          # React 19 + Vite frontend application
└── server/          # Express + Prisma + PostgreSQL backend service
```

---

## 🖥️ Frontend Architecture (`client`)

Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**.

### Routing & Views (`react-router-dom`)

| Route | View | Description |
|---|---|---|
| `/` | Home | Hero carousel, featured categories, popular products, and newsletter. |
| `/products` | Catalog | Grid of clothes with an accordion filter panel (category, price range, etc.). |
| `/products/:id` | Product Detail | In-depth description, size/color selectors, inventory checks, and cart CTA. |
| `/search` | Search | Displays search queries dynamically. |
| `/checkout` | Checkout | Step-by-step address selection, payment type, and final order review. |
| `/orders` | Order History | Customer's past orders with order status filters. |
| `/orders/:id` | Order Details | Live Leaflet map tracking, delivery status timeline, and order OTP. |
| `/addresses` | Addresses | Save, update, and manage default shipping locations. |
| `/login` | Auth | Integrated login and signup screen. |
| `/admin/*` | Admin Panel | Protected workspace for store administration. |
| `/delivery/*` | Rider Portal | Protected dashboard for delivery partners. |

### Key Components

- **Navbar** — Interactive navigation with a search bar, active user indicators, and a slide-out cart sidebar.
- **FilterPanel** — Accordion-style filters where opening one section (e.g. Categories) automatically collapses other active sections (e.g. Price Range) to keep the catalog clean.
- **AppPromotionBanner** — Beautiful promo showcase featuring social proof (4.8 stars from 2,000+ happy shoppers) and random Indian faces of men in circle avatars.
- **AdminDashboard** — Includes high-level KPIs, recent orders, and the **Revenue Analytics** chart.
- **AdminBanner** — Form inputs where administrators can customize and toggle the global header announcement (delivered dynamically to `Banner.tsx`).

---

## ⚙️ Backend Services (`server`)

Built with **Express 5**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**.

### Database Schema (Prisma)

- **`User`** — Customers (name, email, password, phone, profile avatar).
- **`Address`** — Customer shipping addresses with coordinate fields (`lat`, `lng`) for mapping.
- **`Product`** — Apparel catalog items containing name, price, original price, description, stock count, category, rating, review count, available sizes, colors, fits, and brand fields.
- **`Order`** — Stores purchased items, billing calculations, payment methods, delivery state, statuses, status update timelines, live rider location logs, and the 6-digit verification `deliveryOtp`.
- **`DeliveryPartner`** — Rider records (vehicle type, active duty status, and authentication credentials).
- **`Banner`** — Single-row configurations storing `text1` (primary alert), `text2` (promo detail), and the Boolean `isVisible`.

---

### REST API Reference

#### Authentication (`/api/auth`)
- `POST /register` — Register a customer account (returns JWT).
- `POST /login` — Standard customer login credentials check (returns user + JWT).

#### Products (`/api/products`)
- `GET /` — Search and filter products with pagination.
- `GET /:id` — Get product specific data (sizes, colors, and stock).
- `POST /` — Create clothing product *(Admin only)*.
- `PUT /:id` — Edit product metadata/inventory *(Admin only)*.
- `DELETE /:id` — Delete product from store *(Admin only)*.

#### Orders (`/api/orders`)
- `POST /` — Place order (validates stock, calculates tax, subtotal, and total).
- `GET /` — List authenticated customer's orders.
- `GET /all` — Search all database orders *(Admin only)*.
- `GET /:id` — Get specific order data.
- `PUT /:id/status` — Modify order status manually *(Admin only)*.
- `GET /:id/location` — Retrieve live latitude/longitude of assigned delivery partner.

#### Admin Operations (`/api/admin`)
- `GET /stats` — General dashboard KPIs.
- `GET /revenue` — Fetch aggregated revenue, placed, delivered, and cancelled orders within selected ranges (1D, 3D, 1W, 1M, 3M, 6M, 9M, 1Y, All-Time).
- `GET /banner` — Get active banner settings.
- `PUT /banner` — Update banner text and visibility status.
- `GET /delivery-partners` — List rider details.
- `POST /delivery-partners` — Create a new rider profile.
- `PUT /delivery-partners/:id` — Update rider metadata.
- `PUT /orders/:id/assign` — Manually assign a partner to an order.

#### Rider Operations (`/api/delivery`)
- `POST /login` — Secure partner authentication.
- `GET /my-deliveries` — List assigned shipments.
- `GET /my-deliveries/:id` — View specific shipment details.
- `PUT /my-deliveries/:id/status` — Update status (`Packed`, `Out for Delivery`).
- `PUT /my-deliveries/:id/complete` — Complete delivery by validating the customer's 6-digit OTP.
- `PUT /my-deliveries/:id/cancel` — Terminate delivery and revert product stock.
- `PUT /my-deliveries/:id/location` — Update GPS coordinates in real-time.

---

## 🤖 Background Automation (Inngest)

MAPS utilizes three core background tasks to maintain operations smoothly:

1. **Auto-Assign Rider**
   - **Trigger:** Order status updates to `Placed`.
   - **Action:** Waits 5 minutes, then automatically selects an active and free delivery partner, links them to the order, generates a **6-digit OTP**, and marks the order as `Assigned`.
2. **Low Stock Alert**
   - **Trigger:** Orders that decrement product stock.
   - **Action:** Checks if a modified product's stock drops below **10 units**. If so, compiles a beautiful HTML notification and emails the administrators.
3. **Monthly Newsletter Marketing**
   - **Trigger:** Automated Cron trigger (`0 10 1 * *` - First of every month at 10:00 AM).
   - **Action:** Selects the top 6 discounted in-stock items, batches all customer contacts in sets of 10, and sends personalized marketing offers.

---

## 📦 Getting Started

### Prerequisites

- **Node.js** v18+
- **PostgreSQL** database instance
- **Cloudinary** account (for catalog images)
- **Resend / Nodemailer** details (for automation emails)
- **Inngest** dev server running locally (or cloud endpoints)

---

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Shivam-Singh-1/Maps-Clothing-Co.git
cd Maps-Clothing-Co
```

#### 2. Configure Backend Services

1. Open the `server` directory and install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file inside `server/` with the following configuration:
   ```env
   DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<dbname>?schema=public"
   JWT_SECRET="your_jwt_signing_secret"
   ADMIN_EMAILS="admin@maps.com,manager@maps.com"
   CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
   CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
   RESEND_API_KEY="your_resend_api_key"
   CLIENT_URL="http://localhost:5173"
   PORT=5000
   ```

3. Run migrations and seed sample shirts, jeans, and trousers:
   ```bash
   npx prisma migrate dev
   npm run seed
   ```

4. Start the Express development server:
   ```bash
   npm run server
   ```

#### 3. Configure Frontend Application

1. Open the `client` directory and install dependencies:
   ```bash
   cd ../client
   npm install
   ```

2. Create a `.env` file inside `client/` pointing to the backend API:
   ```env
   VITE_API_URL="http://localhost:5000"
   ```

3. Launch the Vite hot-reloads developer server:
   ```bash
   npm run dev
   ```

---

## 🛠️ Technology Stack Summary

| Layer | Component | Description |
|---|---|---|
| **Frontend** | React 19 + TypeScript | Core UI engine using modern hook patterns. |
| | React Router Dom v7 | Client-side routing and protected routes. |
| | Leaflet & React Leaflet | Interactive mapping for riders and customer tracking. |
| | GSAP & Framer Motion | Smooth, premium micro-interactions and carousels. |
| | Lucide React / React Icons | Streamlined vector icons. |
| **Backend** | Express 5 | Next-generation Node.js routing. |
| | Prisma ORM 6 | Type-safe schema querying and migrations. |
| | Inngest | Event-driven architecture for robust background tasks. |
| | Cloudinary | Cloud-based media storage and optimization. |
| | Resend | High-deliverability HTML email sender. |
| **Database** | PostgreSQL | Robust relational data storage. |

---

<div align="center">

Made with ❤️ by [Shivam Singh](https://github.com/Shivam-Singh-1)

</div>
