# ⚡ Iron Pulse - Elite Performance & Gym Management Platform

An energetic, high-performance web application designed for fitness enthusiasts, certified personal trainers, and platform administrators. The system enables a seamless, end-to-end orchestration of workout session tracking, automated scheduling, role elevation channels, secure financial transactions, and global community moderation.

**🌐 Live Deployment:** [Live Site Link](https://b13-a10-frontend.vercel.app/)

---

## 🎯 Project Purpose

The primary mission of **Iron Pulse** is to bridge the gap between dedicated athletes and specialized fitness coaches. By unifying scheduling matrices, interactive community forums, and a multi-tenant dashboard system, it streamlines gym operations while providing recruiters with an immersive demonstration of modern full-stack architecture, clean code practices, and asynchronous data pipelines.

---

## 🚀 Key Features

### 👤 Member Workspace (User Role)
* **Dynamic Search & Filtering:** Instant text search with MongoDB `$regex` alongside robust category filtering utilizing the `$in` operator.
* **Guarded Checkout Pipeline:** Enforces multi-step server-side checks to ensure slots are open and prevent duplicate item purchases before spawning Stripe checkout sessions.
* **Interactive Community Pulse:** Complete profile parsing to vote (like/dislike), write, reply, edit, or clear comments on authorized forum logs.
* **Trainer Tracking Application:** Specialized onboarding terminal converting users to "Pending" trainer status.

### 👟 Instructor Dashboard (Trainer Role)
* **Class Lifecycle Administration:** Full control terminal to create new classes (defaults to "Pending"), view real-time student attendee lists via dynamic modals, update records, or safely drop items.
* **Knowledge Contribution:** Native markdown-supported forms to publish targeted educational content directly onto the Community Forum.

### 🛡️ Administrative Command Center (Admin Role)
* **Unified Analytical Overview:** Real-time data parsing using high-performance MongoDB `$facet` aggregation pipelines, paired with interactive multi-metric charts for platform velocity tracking.
* **Onboarding Moderation Hub:** Multi-action module to analyze applicant experience, input structured feedback logs, and approve or reject prospective instructors.
* **Granular Access Control System:** Implements active "Soft Blocking" mechanisms, restricting misbehaving profiles from executing state modifications across backend routes.

---

## 📦 Core NPM Packages Utilized

### 💻 Client Sub-system (Dependencies)
* `next` (v16.2.9) – Core framework optimizing server-side actions, route layout splits, and parallel asset pre-fetching.
* `react` & `react-dom` (v19.2.4) – Direct integration layer rendering advanced reactive UI trees.
* `@heroui/react` & `@heroui/styles` (v3.2.1) – Component library handling layout consistency, interactive states, and theme toggle context tokens.
* `motion` (v12.4.0) – Drives smooth, spring-based component lifecycle entries and micro-interactions.
* `recharts` (v3.9.0) – Interactive charting engine delivering clean data displays for admin statistics.
* `better-auth` & `@better-auth/mongo-adapter` (v1.6.19) – Complete cookie-based multi-provider credential session tracker.
* `@stripe/stripe-js` & `stripe` – Handles client-side tokens and backend checkout redirects.
* `lucide-react` & `react-icons` – Comprehensive context-specific icon suites.
* `mongodb` (v7.3.0) – Native node connection layer executing complex query matrices.

---

## 🛠️ Installation & Environment Configuration

### 1. Clone the Repository and Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root with the following keys:

```env
# Authentication Secrets
BETTER_AUTH_SECRET=your_auth_hash_secret
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database Engine Access Keys
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ironpulse

# Financial Gateway API Credentials
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3. Run the Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## ⚖️ Quality Assurance & Platform Standards

* **Authentication Security:** Secure session enforcement utilizing robust HttpOnly cookie tracking.
* **Server-Driven Pagination:** Paginated layouts to optimize database performance on heavily populated class grids and community streams.
* **Responsive Architecture:** Fully optimized layout engine adapting seamlessly to Mobile, Tablet, and Desktop configurations.

---

## 📋 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (dashboard)/             # Protected dashboard routes
│   │   ├── admin/              # Admin panel
│   │   ├── trainer/            # Trainer workspace
│   │   └── user/               # User dashboard
│   ├── (main)/                 # Public routes
│   │   ├── classes/            # Class browsing
│   │   ├── forum/              # Community forum
│   │   ├── login/              # Authentication
│   │   └── register/           # User signup
│   └── api/                    # Backend API routes
├── Components/                  # React components
│   ├── AllClasses/             # Public class display
│   ├── ClassDetails/           # Class information
│   ├── Dashboard/              # Role-based dashboards
│   ├── Forum/                  # Forum components
│   ├── Payment/                # Payment integration
│   └── Shared/                 # Reusable components
└── lib/                        # Utilities and helpers
    ├── auth-client.js          # Client auth utilities
    ├── api/                    # API client functions
    ├── action/                 # Server actions
    └── core/                   # Core configurations
```

---

## 🔐 Key Technologies

- **Frontend Framework:** Next.js 16 with React 19
- **Styling:** Tailwind CSS with HeroUI components
- **Database:** MongoDB with complex aggregation pipelines
- **Authentication:** Better Auth with multi-provider support
- **Payment Processing:** Stripe integration
- **Animations:** Framer Motion
- **Charts & Visualization:** Recharts

---

## 📝 Contributing

This is an assignment project for educational purposes. For questions or contributions, please contact the development team.

---

## 📄 License

This project is part of an academic assignment and follows institutional guidelines.
