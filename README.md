<div align="center">

# 🛒 FreshCart — Full-Stack Grocery Delivery App

A modern, full-featured grocery delivery platform built with React, Node.js, PostgreSQL, and real-time background automation.

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
| 🛍️ Shopping | Product catalog, search, filters, flash deals, cart |
| 👤 Auth | JWT-based register/login, admin role detection |
| 📦 Orders | Full order lifecycle, COD & card payment, status history |
| 🚴 Delivery | Rider portal, OTP delivery confirmation, live location |
| 🛠️ Admin | Dashboard stats, product/order/partner management |
| 🤖 Automation | Auto-assign riders, low-stock alerts, monthly promo emails |
| 🗺️ Maps | Real-time delivery tracking with Leaflet maps |
| 📧 Email | Transactional & promotional emails via Resend |
| 🖼️ Media | Image uploads via Cloudinary |
| ♿ Accessibility | WCAG compliant forms with aria-labels |

---

## 🗂️ Project Structure

```
ecommerce/
├── client/          # React + Vite frontend
└── server/          # Express + Prisma backend
```

---

## 🖥️ Frontend (client)

Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**.

### Pages & Routing

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, categories, popular products, newsletter, app promo banner |
| `/products` | Products | Full catalog with filter panel (category, price, organic) |
| `/products/:id` | Product Detail | Product info, add to cart |
| `/search` | Search Results | Live search across products |
| `/flash-deals` | Flash Deals | Discounted / on-sale products |
| `/checkout` | Checkout | 3-step flow: address → payment → review |
| `/orders` | My Orders | Order history with status filter |
| `/orders/:id` | Order Tracking | Live map + OTP display + status timeline |
| `/addresses` | Addresses | Manage saved delivery addresses |
| `/login` | Login / Register | Auth forms |
| `/admin/*` | Admin Panel | Protected admin area |
| `/delivery/*` | Delivery Portal | Protected rider area |

### Key Components

- **Navbar** — cart icon with live count, auth state, search bar
- **CartSidebar** — slide-in cart with quantity controls and checkout CTA
- **ProductCard** — product tile with add-to-cart, organic badge, rating
- **FilterPanel** — category, price range, and organic filters
- **AddressForm / AddressCard** — geo-tagged address management
- **LiveMap** — real-time rider location on Leaflet map
- **OrderTimeLine** — visual status history (Placed → Assigned → Delivered)
- **OrderOTP** — displays OTP for delivery confirmation
- **ProtectedRoute** — guards auth, admin, and delivery routes

### Admin Panel (`/admin`)

- **Dashboard** — total orders, users, products, out-of-stock count, recent orders table
- **Revenue Analytics** — view total revenue, delivered/placed/cancelled order counts filterable by 9 time periods (1D to All Time)
- **Products** — list, create, edit, delete products with image upload
- **Orders** — view all orders, update status manually, assign delivery partner
- **Delivery Partners** — create/update partner profiles, toggle active status
- **Banner Settings** — dynamically change the global promotional banner text and visibility

### Delivery Portal (`/delivery`)

- **Login** — dedicated rider login
- **Dashboard** — active and completed deliveries
- **Delivery Detail** — order info, status update buttons, OTP confirmation modal, cancel modal

---

## ⚙️ Backend (server)

Built with **Express 5**, **TypeScript**, **Prisma ORM**, and **PostgreSQL**.

### Database Models

```
User            — customers (name, email, password, phone, avatar)
Address         — geo-tagged addresses with lat/lng and default flag
Product         — catalog (name, price, originalPrice, stock, category, unit, organic, rating)
Order           — full order (items JSON, shippingAddress JSON, status, statusHistory JSON, liveLocation JSON, OTP, isPaid)
DeliveryPartner — riders (name, email, password, phone, vehicleType, isActive)
```

### REST API

#### Auth — `/api/auth`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register new user, returns JWT |
| POST | `/login` | Login, returns user + JWT |

#### Products — `/api/products`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all products (with filters) |
| GET | `/:id` | Get single product |
| POST | `/` | Create product *(admin)* |
| PUT | `/:id` | Update product *(admin)* |
| DELETE | `/:id` | Delete product *(admin)* |

#### Orders — `/api/orders`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Create order (validates stock, calculates totals) |
| GET | `/` | Get current user's orders |
| GET | `/all` | Get all orders *(admin)* |
| GET | `/:id` | Get single order |
| PUT | `/:id/status` | Update order status *(admin)* |
| GET | `/:id/location` | Get live delivery location |

#### Addresses — `/api/addresses`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get user's addresses |
| POST | `/` | Add new address (requires lat/lng) |
| PUT | `/:id` | Update address |
| DELETE | `/:id` | Delete address |

#### Admin — `/api/admin`
| Method | Endpoint | Description |
|---|---|---|
| GET | `/stats` | Dashboard stats |
| GET | `/delivery-partners` | List all partners |
| POST | `/delivery-partners` | Create partner |
| PUT | `/delivery-partners/:id` | Update partner |
| PUT | `/orders/:id/assign` | Assign partner to order |

#### Delivery Partner — `/api/delivery`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/login` | Rider login |
| GET | `/my-deliveries` | Get assigned deliveries |
| GET | `/my-deliveries/:id` | Get delivery detail |
| PUT | `/my-deliveries/:id/status` | Update status (Packed / Out for Delivery) |
| PUT | `/my-deliveries/:id/complete` | Complete delivery via OTP |
| PUT | `/my-deliveries/:id/cancel` | Cancel delivery |
| PUT | `/my-deliveries/:id/location` | Update live GPS location |

#### Upload — `/api/ipload`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Upload image to Cloudinary |

---

### 🤖 Background Automation (Inngest)

Three event-driven / scheduled functions run automatically:

#### 1. Low Stock Alert
- **Trigger:** `inventory/stock.updated` event (fires after every order)
- **Action:** If a product's stock drops below **10 units**, sends a styled HTML alert email to all admin addresses

#### 2. Monthly Promo Emails
- **Trigger:** Cron — `1st of every month at 10:00 AM`
- **Action:** Fetches top 6 discounted in-stock products, sends a personalized promotional email to every registered user in **batches of 10**

#### 3. Auto-Assign Rider
- **Trigger:** `order/placed` event
- **Action:** Waits **5 minutes**, then finds the first available (active + not currently delivering) rider, assigns them to the order, generates a **6-digit OTP**, and updates order status to `Assigned`

---

### 🔐 Auth & Middleware

- **JWT Auth** (`middleware/auth.ts`) — verifies Bearer token, attaches `req.user`
- **Admin Guard** (`middleware/admin.ts`) — checks email against `ADMIN_EMAILS` env var
- **Delivery Auth** (`middleware/deliveryAuth.ts`) — verifies delivery-role JWT, attaches `req.partner`

---

### 💳 Order Flow

```
Customer places order
        ↓
Stock validated (transaction-safe)
        ↓
Order created → "Placed"
        ↓
Inngest fires → waits 5 min → auto-assigns rider → "Assigned"
        ↓
Rider: Packed → "Packed"
        ↓
Rider: Out for Delivery → "Out for Delivery" + live GPS updates
        ↓
Customer shares OTP → Rider confirms → "Delivered"
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Cloudinary account
- Resend account
- Inngest account (or local dev server)

### 1. Clone the repo

```bash
git clone https://github.com/Shivam-Singh-1/e-commerce-app.git
cd e-commerce-app
```

### 2. Setup the server

```bash
cd server
npm install
```

Create `server/.env`:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>
JWT_SECRET=<your_jwt_secret>
ADMIN_EMAILS=<admin@example.com>
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
RESEND_API_KEY=<your_resend_key>
CLIENT_URL=http://localhost:5173
PORT=5000
```

```bash
npx prisma migrate dev
npm run seed      # optional: seed sample products
npm run server    # starts with nodemon
```

### 3. Setup the client

```bash
cd client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

---

## 🌐 Deployment

Both `client/` and `server/` include a `vercel.json` for one-click Vercel deployment.

---

## ♿ Accessibility

This application follows WCAG accessibility guidelines:

- All form elements have associated labels or `aria-label` attributes
- Interactive components are keyboard navigable
- Color contrast meets WCAG AA standards
- Screen reader compatible markup

---

## 🛠️ Tech Stack Summary

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS v4, Vite |
| Routing | React Router v7 |
| Maps | Leaflet + React Leaflet |
| Animations | GSAP |
| Icons | Lucide React |
| Backend | Express 5, TypeScript, Node.js |
| ORM | Prisma 6 |
| Database | PostgreSQL |
| Auth | JWT + bcrypt |
| Background Jobs | Inngest |
| Email | Resend |
| Media | Cloudinary + Multer |
| Deployment | Vercel |

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/Shivam-Singh-1">Shivam Singh</a>
</div>
