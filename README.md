# Tradewind Flights Tracker

A small React + TypeScript app that visualizes airports and live flights on an interactive map.

Built as part of the Tradewind Scientific Full Stack Software Developer take-home assignment.

---

## Tech Stack

- React
- TypeScript
- Vite
- Leaflet (react-leaflet)

---

## Features

- Display airports on the map
- Poll live flights every 1 second
- Show flights as labeled markers
- Sidebar with current flights list
- Click a flight to navigate to its current position
- Clean component structure (api / hooks / components / types)
- Type-safe code with strict TypeScript

---

## Setup

### 1. Install dependencies

npm install

### 2. Create environment file

Create a `.env` file in the project root:

VITE_API_BASE_URL=http://xiapp.tradewindapps.com:9912  
VITE_API_TOKEN=YOUR_TOKEN_HERE

### 3. Start the app

npm run dev

Open:
http://localhost:5173

---

## Project Structure

src/
- api/        → API calls
- hooks/      → data fetching logic
- components/ → Map + Sidebar UI
- types/      → shared TypeScript types

---

## Notes

- Flights are polled every second using a custom hook.
- Environment variables are used for API configuration.
- In a production system, secrets should be handled by a backend.
- With more time, I would add:
  - follow-mode toggle
  - clustering for dense markers
  - improved mobile UI
  - unit tests

---

## Author

Olivia Durman
