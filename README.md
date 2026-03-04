# 📦 My SaaS App

A modern **React + TypeScript** SaaS application boilerplate powered by **Tailwind CSS**, **Redux Toolkit**, and essential open-source libraries.

---

## 🚀 Tech Stack

| Tech               | Description                    |
| ------------------ | ------------------------------ |
| React              | Front-end library              |
| TypeScript         | Type-safe JavaScript           |
| Tailwind CSS       | Utility-first CSS framework    |
| React Router       | Client-side routing            |
| Redux Toolkit      | Global state management        |
| Axios              | HTTP requests                  |
| React Helmet       | SEO & meta tags                |
| React Markdown     | Render Markdown content        |
| Formik + Yup       | Form handling + validation     |
| React Toastify     | Notifications and toasts       |
| React Select       | Custom select inputs           |
| React Icons        | Popular icon packs             |
| React Scroll       | Smooth scroll for anchor links |
| React Parallax     | Scroll-based parallax effects  |
| Moment.js          | Date formatting                |
| uuid               | Generate unique IDs            |
| EventEmitter3      | Lightweight event emitter      |
| PostHog            | Analytics & user tracking      |
| Country-State-City | Country/state/city selection   |

---

## 📁 Folder Structure

```
src/
├── app/                # App setup (router, store, providers)
├── assets/             # Static assets
├── components/         # Reusable components (UI + shared)
├── features/           # Domain modules (auth, billing, dashboard)
├── layouts/            # Public, Auth, and Dashboard layouts
├── pages/              # Top-level route pages
├── routes/             # Centralized route configuration
├── services/           # Axios API logic
├── store/              # Redux Toolkit store config
├── types/              # Global TypeScript interfaces
├── utils/              # Utility functions
├── validators/         # Yup validation schemas
└── main.tsx            # Entry point
```

---

## ⚙️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/my-saas-app.git
cd my-saas-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file:

```
VITE_API_URL=https://api.yoursaas.com
VITE_POSTHOG_KEY=your-posthog-key
```

### 4. Start Development Server

```bash
npm run dev
```

The app will be running at [http://localhost:5173](http://localhost:5173) (if using Vite).

---

## 🧪 Scripts

| Script            | Description               |
| ----------------- | ------------------------- |
| `npm run dev`     | Start development server  |
| `npm run build`   | Production build          |
| `npm run lint`    | Lint project using ESLint |
| `npm run preview` | Preview production build  |

---

## 🛠️ Features

- 🔐 Authentication Flow
- 🎨 Tailwind Theming Support
- 🌍 SEO Optimized via React Helmet
- 📦 Scalable Folder Structure (SaaS-ready)
- 🛎️ Toast Notifications
- 📊 PostHog Analytics Integration
- 🌐 Country/State/City Selects
- 🎯 Role-based Route Protection
- 📋 Form Validation with Formik + Yup

---

## 📸 Screenshots

> _(Add screenshots or demo GIFs here)_

---

## 📡 API Integration

All backend requests are handled via Axios. Example usage:

```ts
import api from "@/services/api";

api.get("/user/profile").then((response) => console.log(response.data));
```

---

## 🧠 Architecture Highlights

- **Feature-based structure** for scalability
- **Redux Toolkit + RTK Query** ready
- **Multiple layouts** for different user roles
- **Environment-configurable analytics (PostHog)**

---

## 📈 Analytics (PostHog)

PostHog is initialized in the app entry:

```ts
import posthog from "posthog-js";

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: "https://app.posthog.com",
});
```

---

## 📄 License

MIT License. See [LICENSE](./LICENSE) for more information.

---

## 🙌 Contributing

Feel free to fork, submit PRs, or create issues for suggestions and bugs.

---

## 📬 Contact

If you have questions or need support:

- Twitter: [@yourhandle](https://twitter.com/yourhandle)
- Email: [maulikbhadani999@email.com](mailto:your@email.com)
