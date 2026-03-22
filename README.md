# GitHub Profile SPA Clone

A high-fidelity, API-driven GitHub profile replica built with **React**, **Tailwind CSS**, and **Framer Motion**. This application dynamically mirrors a real GitHub profile, fetching live data for repositories, stars, contributions, and activity.

## ✨ Features

- **Dynamic Data**: Everything is fetched live from the GitHub REST API and a public contribution proxy.
- **SPA Navigation**: Five functional tabs (Overview, Repositories, Projects, Packages, Stars) with seamless transitions.
- **Dark Mode**: Fully supported premium theme toggle.
- **Premium Animations**: Framer Motion entrance and hover effects for a modern UX.
- **Repository Management**: Search, filter by language, and sort repositories live.
- **Contribution Heatmap**: Real-time activity visualization matching the official GitHub style.
- **Performance**: Integrated `localStorage` caching to minimize API hits and handle rate limits.
- **Responsive Design**: Optimized for mobile, tablet, and desktop views.

## 🛠️ Tech Stack

- **Frontend**: React 18+
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:4000`.

3. **Change Profile**:
   Update the `GITHUB_USERNAME` constant in `src/services/githubService.js` to mirror any GitHub account.

## 📁 Project Structure

- `src/components/`: Reusable UI components (Sidebar, Tabs, Nav, etc.)
- `src/services/`: API communication and caching logic.
- `src/App.jsx`: Main entry point and state management.
- `src/index.css`: Tailwind directives and custom theme variables.

## 📝 License

Distributed under the MIT License.
