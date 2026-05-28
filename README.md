# Lendsqr Admin Portal (Demo)

A premium, feature-rich administrator dashboard built with **React**, **TypeScript**, **Tailwind**, and **Redux Toolkit** to manage Lendsqr users, view detailed profiles, monitor network status, and perform administrative actions such as filtering, sorting, activating, and blacklisting users.

---

## Key Features

- **🔐 Admin Authentication Screen**: A modern login interface featuring toggleable password visibility.

- **📊 Interactive Dashboard Stats**: Real-time stats counting total users, active users, users with loans, and users with savings.

- **⚡ High-Performance Virtualized Table**: Utilizes `react-virtuoso` for rendering large datasets smoothly with lazy rendering and virtual scroll.

- **🔍 Filtering & Sorting**:
  - Multi-field filters (Organization, Username, Email, Phone Number, Date Joined, Status).
  - Ascending/descending sorting across column fields.

- **🛠️ Quick Administrative Actions**: Activate or blacklist users directly from the table row context menu or the user details page.

- **🗂️ Comprehensive User Profiles**: Detailed profile view grouped logically into tabs:
  - _General Details_: Personal Information, Education & Employment, Social Links, and Guarantor details.

- **🌐 Real-Time Connectivity Monitor**: Uses an `InternetStatusBar` to watch browser connectivity status, providing instant visual feedback when the network drops or is restored.

- **💾 Local Storage Persistence**: Saves selected user details so page refreshes retain context.

- **🌐 Not Found Page**: Shows the user a 404 Not Found page to let the user know the page does not exist or mismatch url

---

## 🛠️ Technology Stack

| **Core Framework** | React (TypeScript) | UI library with modern compiler |

| **Bundler & Tooling** | Vite | Fast development builds and hot module replacement |

| **State Management** | Redux Toolkit | Centralized state management for users and UI states |

| **Routing** | React Router DOM v7 | Nested route configuration and navigation layouts |

| **Styling** | Tailwind CSS v4 & Vanilla CSS | Modular styling, theme variables, and grid layouts |

| **UI Components** | Material UI (MUI) | Structured table components (`Paper`, `Table`, `TableCell`) |

| **Icons** | React Icons | Modern custom iconography  
 |
| **Mock Database** | JSON Server | Local REST API mimicking remote servers |

---

---

## ⚙️ Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or higher recommended)
- npm or yarn package manager

### 1. Clone & Install Dependencies

Clone the repository and install all required node modules:

```bash
npm install
```

### 2. Running the Project Locally

The application depends on both the frontend development server and the mock database server. You should start both:

#### Option A: Run concurrently (Default local setup)

1. **Start the API Server**:

   ```bash
   npm run api
   ```

   This will spin up `json-server` on port `3001` parsing `db.json`.

2. **Start the Frontend Application**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the application.

---

## 📜 Available Scripts

Here is a list of available package scripts:

- `npm run dev`: Starts the Vite dev server with Hot Module Replacement.
- `npm run api`: Starts the mock backend server (`json-server`) on `http://localhost:3001`.
- `npm run server`: Runs the mock server on port `10000` hosted on `0.0.0.0` (ideal for remote device testing).
- `npm run build`: Compiles TypeScript files and compiles code to `dist/` for production.
- `npm run preview`: Previews the production-ready code locally.
- `npm run lint`: Analyzes code quality using ESLint rules.

---

## 🔄 State Flow & API Integration

1. **API Requests**: Redux Toolkit `createAsyncThunk` is used in [users_slice.ts](file:///C:/Users/Vhyper/Desktop/lendsqr_demo/src/store/features/users_slice.ts) to fetch paginated users (`https://lendsqr-api-zxvj.onrender.com/users`).
2. **Local State updates**: When an administrator triggers `Activate` or `Blacklist`, the Redux store instantly updates the matching user record's state across all paginated views (`usersByPage`) and syncs the detail view state.
3. **Data Caching**: Fetched pages are recorded inside the Redux slice (`fetchedPages`) to prevent redundant network requests when switching between pages.
