# 🛒 Shopping List App

A modern, full-stack shopping list application built with React, TypeScript, and Node.js! 📝✨

## 🚀 Features

- **📱 Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- **🔄 Real-time Updates** - Instant synchronization between frontend and backend
- **📂 Category Management** - Organize items by categories for better shopping experience
- **➕ Add Items** - Easily add new items to your shopping list
- **🗑️ Delete Items** - Remove items with a simple click
- **🎯 TypeScript** - Full type safety for better development experience
- **⚡ Fast & Lightweight** - Built with Vite for blazing fast development

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Lightning fast build tool
- **ESLint** - Code quality and consistency

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Fast, unopinionated web framework
- **MySQL** - Reliable database for data persistence
- **mysql2** - Modern MySQL client for Node.js

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MySQL database
- Git

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd shopping-list
```

### 2. Set up the backend
```bash
cd backend
npm install
```

### 3. Configure the database
Create a MySQL database named `shopping` and update the connection settings in `backend/index.js`:

```javascript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shopping',
});
```

### 4. Set up the frontend
```bash
cd ../frontend
npm install
```

## 🚀 Running the Application

### Start the backend server
```bash
cd backend
node index.js
```
The backend will run on `http://localhost:3000`

### Start the frontend development server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
shopping-list/
├── backend/
│   ├── index.js          # Express server with API endpoints
│   ├── package.json      # Backend dependencies
│   └── eslint.config.mjs # ESLint configuration
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── AddButton.tsx
│   │   │   ├── Categories.tsx
│   │   │   ├── Category.tsx
│   │   │   ├── DeleteButton.tsx
│   │   │   ├── Item.tsx
│   │   │   ├── ItemWrapper.tsx
│   │   │   └── NewItem.tsx
│   │   ├── App.tsx       # Main application component
│   │   ├── http.ts       # HTTP client for API calls
│   │   └── main.tsx      # Application entry point
│   ├── package.json      # Frontend dependencies
│   └── vite.config.ts    # Vite configuration
└── README.md
```

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check endpoint |
| `GET` | `/items` | Get all shopping items with categories |
| `POST` | `/add-item` | Add a new item to the shopping list |
| `POST` | `/delete-item` | Delete an item from the shopping list |
| `GET` | `/categories` | Get all available categories |

## 🎨 Features in Detail

### ✨ Add Items
- Add new items with custom names
- Select from predefined categories
- Real-time list updates

### 🗂️ Category Management
- Items are organized by categories
- Easy filtering and organization
- Clean, intuitive interface

### 🗑️ Delete Items
- One-click item deletion
- Immediate UI updates
- Confirmation feedback

### 📱 Responsive Design
- Works perfectly on desktop and mobile
- Modern, clean interface
- Smooth animations and transitions

## 🛠️ Development

### Available Scripts

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

**Backend:**
```bash
node index.js    # Start the server
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with ❤️ using modern web technologies
- Special thanks to the React and Node.js communities
- Inspired by the need for a simple, efficient shopping list app

---

**Happy Shopping! 🛒✨**

*Made with love and lots of coffee ☕* 