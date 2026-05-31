# 🍽️ Ember & Co. — Restaurant SaaS Platform

> A production-ready, full-stack Restaurant Management System built with modern web technologies.

🔗 **Live Demo:** [embercoui.vercel.app](https://embercoui.vercel.app)

---

## 📌 What Is This?

Ember & Co. is a **complete multi-tenant Restaurant SaaS** that allows restaurants to manage their entire business digitally — from online ordering and payments to AI-powered customer support and real-time order tracking.

Built solo in **27 days** from scratch.

---

## ⚙️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI Framework |
| Next.js 14 | SSR & Routing |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Zustand | State Management |
| Recharts | Analytics Charts |
| jsPDF | Invoice Generation |
| Axios | API Calls |
| React Router v6 | Client Routing |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| TypeScript | Type Safety |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| Redis | Caching & Sessions |
| Nodemailer | Email Service |
| Sentry | Error Logging |

### Security
| Technology | Purpose |
|-----------|---------|
| JWT + Refresh Token Rotation | Authentication |
| bcrypt (salt: 12) | Password Hashing |
| 2FA OTP | Two-Factor Auth |
| Cloudflare WAF | DDoS Protection |
| Helmet.js | HTTP Security Headers |
| CSRF + XSS Protection | Attack Prevention |
| express-rate-limit | Rate Limiting |
| express-validator | Input Validation |

### Payments & AI
| Technology | Purpose |
|-----------|---------|
| Stripe (PCI DSS + 3D Secure) | Card Payments |
| PayPal SDK | PayPal Payments |
| Claude Sonnet API | AI Chatbot |

### Deployment
| Service | Purpose |
|---------|---------|
| Vercel | Frontend Hosting |
| Railway | Backend Hosting |
| MongoDB Atlas | Cloud Database |
| Cloudflare | CDN + DDoS Protection |
| Gmail SMTP | Email Delivery |

---

## ✅ Features

### 🛍️ Customer Side
- Full restaurant menu with categories
- Cart system with drawer UI
- Online checkout with Stripe & PayPal
- Real-time order tracking via WebSockets
- Email verification & password reset
- Customer dashboard (orders, favorites, addresses)
- AI-powered chatbot for support
- Newsletter subscription

### 🔐 Authentication
- Signup / Login / Forgot Password
- Email verification
- 2FA OTP authentication
- JWT + Refresh token rotation

### 🏢 Admin Panel (13 Modules)
| Module | Features |
|--------|---------|
| Dashboard | Revenue, orders, analytics overview |
| Orders | Real-time order management |
| Menu | Add, edit, delete menu items |
| Reservations | Table booking management |
| Customers | Customer profiles & history |
| Marketing | Coupons, popups, promotions |
| Newsletter | Subscriber management |
| Finance | Revenue reports, jsPDF invoices |
| Staff | Role-based access control |
| Reviews | Customer review management |
| Chatbot | AI settings & configuration |
| Settings | Full system control |

---

## 📁 Project Structure

```
project/
├── src/
│   ├── components/
│   │   ├── layout/        # Navbar, Footer, HelpCenter
│   │   ├── home/          # Hero, Menu, Gallery, Testimonials
│   │   ├── cart/          # CartDrawer, CartItem, CartContext
│   │   ├── auth/          # Login, Signup, ForgotPassword
│   │   ├── account/       # OrderHistory, Favorites, Profile
│   │   ├── checkout/      # Checkout, PaymentForm, OrderConfirm
│   │   ├── tracking/      # OrderTracking
│   │   └── admin/         # All 13 admin modules
│   ├── context/           # Cart, Auth, Admin contexts
│   ├── hooks/             # useCart, useAuth, useAdmin
│   ├── services/          # API, auth, orders, payments
│   ├── types/             # TypeScript interfaces
│   └── utils/             # Helpers, constants, validators
│
└── backend/
    ├── controllers/       # auth, menu, order, payment, admin
    ├── models/            # User, Order, MenuItem, Reservation
    ├── routes/            # All API routes
    ├── middleware/        # auth, admin, rateLimit, validate
    └── services/          # email, stripe, AI, storage
```

---

## 🔄 Data Flow

```
Customer → Website → Cart → Checkout → Payment
→ Order Created → Admin Notified → Admin Approves
→ Kitchen Prepares → Customer Tracks → Delivered ✅
```

---

## 🗄️ Database — MongoDB Collections

- `users` — profiles, addresses, favorites
- `orders` — items, status, tracking
- `menuItems` — categories, prices, images
- `reservations` — table bookings
- `reviews` — ratings, comments

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/hamzadevs11/embercoui.git

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install

# Add environment variables
cp .env.example .env

# Run frontend
npm run dev

# Run backend
cd backend && npm run dev
```

---

## 👨‍💻 Built By

**Hamza Mohsin** — 16 y/o Full Stack Developer from Bhai Pheru, Pakistan

- 🌐 Live: [embercoui.vercel.app](https://embercoui.vercel.app)
- 📧 heyhamza.dev@gmail.com
- 💼 [LinkedIn](https://www.linkedin.com/in/hamza-mohsin)

> Built solo in 27 days. No team. No mentor. Just documentation and determination.
