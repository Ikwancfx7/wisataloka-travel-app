# 🌴 Wisataloka - Travel Experience Booking Platform

**Wisataloka** is a travel experience booking platform that allows users to discover, explore, and book various tourism activities across Indonesia. Built using **React.js (Vite)** for a modern and responsive interface, and integrates with a RESTful API.

## ✨ Main Features

### 👤 For Users
- 🔍 **Explore Activities**: Filter activities by category and location
- 📄 **Activity Details**: View full descriptions, images, and pricing
- 🛒 **Shopping Cart**: Add items to cart, update quantity, and remove
- 🎟️ **Apply Promo Code**: Use discount vouchers during checkout
- 💳 **Checkout & Payment**: Choose payment method and upload proof of payment
- 📜 **Transaction History**: View all previous bookings and statuses
- 👤 **User Profile**

### 🛠️ For Admin
- 📊 **Dashboard Overview**: Summary of key metrics
- 🎯 **Manage Activities**: Create, update, delete activity content
- 🏷️ **Manage Promos**: CRUD operations for promos and promo images
- 👥 **Manage Users**: View and control user accounts
- 🧾 **Manage Transactions**: Review proof of payments, update status
- 📂 **Manage Categories**: Organize activities by categories
- 🖼️ **Manage Banners**: Update homepage banner slides

## 🧰 Tech Stack

| Technology       | Description                        |
|------------------|------------------------------------|
| React + Vite     | Frontend SPA Framework             |
| Tailwind CSS     | Utility-first CSS framework        |
| React Router DOM | Routing for page navigation        |
| Axios            | REST API integration               |
| SweetAlert2      | Confirmation dialogs               |
| React Toastify   | Toast notifications                |
| Lucide-react     | Clean and modern icon set          |
| Express API      | Backend (separate repository)      |

## 📂 Project Structure

```
src/
├── api/               # API service layer
├── assets/            # Images, icons, and static assets
├── components/        # Reusable UI components
├── pages/             # Main pages (Explore, Promo, Admin, etc.)
├── context/           # React context for global state (auth, cart, etc.)
├── layouts/           # Page layout wrappers
├── routes/            # App router and route protection
```

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Ikwancfx7/wisataloka-travel-app.git
cd wisataloka
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment
Create `.env` file if required:
```env
VITE_API_BASE_URL=https://your-api-url.com
```

### 4. Run the development server
```bash
npm run dev
```

### 5. Build for production
```bash
npm run build
```

## 👨‍💻 Author

- **Ikwanda Chairil Fitroh** – [@ikwancfx7](https://github.com/Ikwancfx7)



**Enjoy your journey with Wisataloka!** 🌍✨