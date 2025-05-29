# Share Your Travels – Frontend

> This is the frontend for the Share Your Travels platform, a social web app for sharing travel experiences.  
> Live: [benevolent-mochi-18fb47.netlify.app](https://benevolent-mochi-18fb47.netlify.app/home)

---

### Table of Contents

1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Environment Variables](#environment-variables)
6. [Testing](#test)
7. [Project Structure](#project-structure)
8. [Known Issues & Improvements](#known-issues--improvements)
9. [Contributing](#contributing)
10. [License](#license)

---

## About the Project

**Share Your Travels** is a web application where users can:

- Create, view, and edit personal travels
- Add places to their travels with ratings and descriptions
- Explore travel destinations added by others (if public)
- Authenticate using JWT tokens

This repo contains the frontend client built with React and communicates with the [backend API](https://github.com/esterhugosson/Shareyoutravels-backend).

---

## Features

- JWT-based login & refresh flow
- Auth-protected routes
- Interactive map using **Mapbox** and OpenStreetMap
- Toast notifications with `react-toastify`
- Responsive UI for desktop and mobile
- User feedback for errors/success
- Integration with backend for CRUD operations on travels and places

---

## Tech Stack

- **React.js** (Vite)
- **React Router** for routing
- **Tailwind CSS** for styling
- **React Toastify** for notifications
- **Mapbox GL JS** for maps
- **OpenStreetMap** for geolocation
- **Axios** for API requests
- **Netlify** for deployment

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
git clone https://github.com/esterhugosson/Shareyourtravels-frontend.git
cd Shareyourtravels-frontend
npm install
```

### Environment Variables
Create a .env file in the root directory:

```
VITE_API_URL='api_url' # See backend repo above or your deployed backend URL
VITE_APP_FEATURE_FLAG='true'
VITE_APP_MAPBOX = 'your_mapbox_token' # Get from https://www.mapbox.com
```

### Running locally

```bash
npm run dev
Open http://localhost:5173 to view it in the browser.
```

---

### Testing

The project uses **Vitest**
```bash
npm run test
```
For now, only one test is available, feel free to add more under /tests.


---

### Project Structure
```bash
src
├── assets/
├── components/
├── services/
├── tests/
├── App.jsx
├── main.jsx
└── index.css
```

- components/ – Reusable UI components
- services/ – Axios setup and API calls

---

### Known Issues & Improvements

- Limited test coverage

- Form validation could be improved

- Mobile layout needs some polish

- Linting setup is not yet added 

- Place update/delete not implemented

- No user info display on Explore page

Do you see any further improvment/bugs? Feel free to create an issue!

Want to contribute? (see Contributing)


---

### Contributing

1. Fork the repo

2. Create a new branch: git checkout -b feature/your-feature

3. Make changes

4. Push and open a pull request

---

### License

This project is licensed under the MIT License. See [LICENSE](./LICENSE.txt) for more info.
