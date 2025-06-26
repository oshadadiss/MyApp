# 🛍️ MyApp – React Native E-Commerce App

**MyApp** is a modern e-commerce mobile application built with **React Native**, following clean architecture and best practices. It supports login authentication, product listing, cart management, and user profile features.

---

## 🚀 Features

- 🔐 **Login Authentication**
  - Validates user credentials
  - Secure token handling with AsyncStorage
  - Redirects based on login status

- 🏠 **Cart Management**
  - Add, remove, and clear cart items
  - Dynamic total cost calculation
  - Smooth UI interactions

- 👤 **User Profile**
  - Fetches authenticated user data
  - Displays detailed information including company, university, and contact info
  - Logout functionality with confirmation

---

## 🧱 Tech Stack

| Layer          | Library                            |
|----------------|-------------------------------------|
| UI             | React Native, TypeScript           |
| Navigation     | React Navigation                   |
| State Mgmt     | Redux Toolkit                      |
| Storage        | AsyncStorage                       |
| Networking     | Axios                              |
| Icons          | React Native Vector Icons (Feather)|
| Styling        | `StyleSheet` (inline styles)       |

---

## 📂 Folder Structure

src/
├── components/ # Reusable UI components
├── navigation/ # Navigation config
├── screens/ # Screen components (Login, Cart, Profile, etc.)
├── services/ # API logic (e.g., ecommerce API)
├── store/ # Redux slices and store setup
├── utils/ # Helpers and storage utilities

---

## 🔗 API Reference

Using [DummyJSON API](https://dummyjson.com)

- `POST /auth/login` – Login
- `GET /auth/me` – Get authenticated user
- `GET /products` – Fetch product list
- `GET /products/:id` – Get product by ID
- `GET /products/search?q=term` – Search products

---

## 🛠️ Setup & Installation

### 1. Clone the Repository

git clone https://github.com/oshadadiss/MyApp.git
cd MyApp

### 2. Install Dependencies

npm install
# or
yarn install

### 3. Run the App

npx react-native run-android
# or
npx react-native run-ios

## Screenshots

![b642f8fb-3132-495e-ba35-065eb420dc50](https://github.com/user-attachments/assets/c1496125-5254-4415-98cf-b36fba167835)
![vlcsnap-2025-06-27-02h50m18s124](https://github.com/user-attachments/assets/778c98d9-1253-4c31-a73e-9f2b90f16155)
![e6ddda76-f9fb-450e-b514-3132917099cf](https://github.com/user-attachments/assets/44fa3836-dd16-4ff7-b01a-448d11e422bc)
![d77eed53-9f5b-4633-87c2-5affea107ae8](https://github.com/user-attachments/assets/6ab26e69-9fa9-4dcc-975f-0801f7996d05)
![68080207-340b-4b3f-8411-a4b6dfe6a2e6](https://github.com/user-attachments/assets/1c183d3b-bacf-4429-bd5d-e81e5287c8ed)
![269701ba-9aee-4ff1-abf3-947aff8950d5](https://github.com/user-attachments/assets/085c58a0-7d91-477d-9a80-25cdde2092d0)
![0f95d34f-463f-4e1e-9938-f16c85a49b1a](https://github.com/user-attachments/assets/8576940b-e8e7-4ea7-bd6b-fa8dc45b19d6)

## Project Highlights
-Uses Redux Toolkit slices to isolate business logic
-UI is clean, modular, and responsive
-AsyncStorage ensures user stays logged in even after closing the app
-Uses TypeScript for type safety and clarity

## Author
Oshada Dissanayake
GitHub: @oshadadiss

##✅ Future Improvements
-Product detail and search screens
-Checkout functionality
-Redux persist for offline sync
-Unit testing with Jest

##📄 License
MIT – free to use and modify.

---

Let me know if you'd like to:
- Add dynamic screenshots
- Customize this for deployment (e.g. Fastlane, APK)
- Update after you upload more screens like Home or Search
