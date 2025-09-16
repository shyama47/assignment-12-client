# 🚀 AppOrbit  

A modern **MERN stack platform** for discovering, sharing, and reviewing tech products such as Web Apps, AI Tools, Games, Mobile Apps, and more.  

## 🌍 Live URL  
🔗 [Live Demo](https://your-live-link.com)  
🔗 [Server API](https://your-server-link.com)  

---

## 🎯 Purpose  
AppOrbit allows users to **submit tech products, upvote, write reviews, and report content**.  
The system includes **role-based access** (User, Moderator, Admin), **secure JWT authentication**, and a **Stripe-powered subscription system** for unlocking premium features.  

---

## ✨ Key Features  

### 👥 User Features  
- Register/Login (Email & Google Auth)  
- Submit products (1 free, unlimited with subscription)  
- Upvote products  
- Add reviews with rating  
- Report inappropriate products  
- View trending & featured products  

### 🛡️ Moderator Features  
- Review submitted products (Accept/Reject)  
- Mark products as featured  
- Manage reported products  

### 👑 Admin Features  
- Manage users & roles (Make Admin/Moderator)  
- Site statistics dashboard (Pie Chart with products, reviews, users)  
- Manage coupons (Add, Edit, Delete)  
- Coupon slider on homepage for promotions  

### 💳 Payment System  
- Stripe integration for premium subscription  
- Premium users can add unlimited products  
- Coupons for discounts on subscription  

---

## 📸 Pages Overview  

- **Home Page** → Banner, Featured Products, Trending Products, Coupons, Extra Sections  
- **Products Page** → All accepted products + search bar  
- **Product Details Page** → Info, upvote, report, reviews  
- **Dashboards**  
  - User → My Profile, Add Product, My Products  
  - Moderator → Review Queue, Reported Contents  
  - Admin → Statistics, Manage Users, Manage Coupons  
- **Error Page (404)**  

---

## 🔐 Security  
- Firebase keys stored in `.env.local`  
- MongoDB credentials stored in `.env`  
- JWT-based private route protection (server middleware)  
- Role-based API access (User/Moderator/Admin)  

---

 

### 📂 NPM Packages Used Frontend  
- React.js + Vite  
- React Router  
- Tailwind CSS   
- Firebase Authentication  
- Axios + TanStack Query  
- React Hot Toast (notifications) 
- React-hook-form
- Recharts (Pie chart)  
- React-tag-input (tags for products)  
 

### 📂 NPM Packages Used Backend  
- Express.js  
- MongoDB  
- Firebase Admin SDK  
- Stripe Payment Gateway  
- JSON Web Token (JWT) for auth  
- CORS  
- dotenv 
---


- 👨‍💻 Author
   Shyama Saha
 





