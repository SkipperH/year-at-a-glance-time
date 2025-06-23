# 📅 Year at a Glance Time – Personal Planner App
A visual overview, in one glance.
This is a personal planning app designed to provide structure and overview within busy study time or work schedules.

## 🔗 Live Project

View or edit the project directly via Vercel:
👉 [Open projectlink](https://year-at-a-glance-time.vercel.app/)

## 🧠 About the Project

During my semester, I developed this app as a personal tool to visually map out my planning and priorities. The application helps me structure tasks, deadlines, and time blocks in a yearly overview. It not only boosts my productivity but also aligns with my learning goals in front-end development and visual design.

Key features:
- Year, month, and week view
- Clean and consistent visual style using Tailwind & shadcn/ui
- Easy to expand and customize
- Built with the help of Lovable AI, but also editable locally

## ✨ Features
### ⚪  Create notes for a certain timeframe
- Click on any month name to select/deselect the entire month
- Added a Notes panel that can be toggled with the purple "Notes" button
- Notes persist during your session (to make them permanent, you'd need backend storage)
- Each note shows how many days were selected when it was created
You can delete individual notes
### ⚪ Color coding and visual indicators
- Visual indicators for selected periods with different colors
- Selected months have a blue border and background tint
### ⚪ Highlight certain time periods
- Added a counter showing how many months are selected
### ⚪ Clear overview of a 12 month time span
- A clean yearly calendar grid showing all 12 months
- A summary showing total selected days and percentage of the year
### ⚪ Intuitive and easy to use UI
- Responsive design for desktop and mobile
- Styled with Tailwind CSS
- Interactive day selection with click and drag functionality
- Intuitive interface with clear user feedback

## 🏗️ Projectstructure
```bash
calendar-app/
├── public/                         # Statische bestanden (favicon, manifest, icons)
├── src/
│   ├── components/                 # UI-componenten
│   │   └── ui/
│   │       ├── CalendarMonth.tsx      # Weergave per maand
│   │       ├── CalendarStats.tsx      # Statistieken over dagen/gebruik
│   │       ├── NotesPanel.tsx         # Notities of taken gekoppeld aan dagen
│   │       └── YearlyCalendar.tsx     # Jaaroverzicht
│   ├── hooks/                      # Custom React Hooks
│   │   ├── use-mobile.tsx              # Mobiele weergavedetectie
│   │   ├── use-toast.ts                # Feedbackmeldingen
│   │   ├── useCalendarPersistence.ts   # Opslaan en laden van data
│   │   └── useCalendarUtils.ts         # Hulpfuncties voor datumlogica
│   ├── lib/
│   │   └── utils.ts                    # Algemene utility functies (bv. datumformaat)
│   ├── pages/
│   │   └── index.tsx                   # (Nog leeg — eventueel homepage of routing entry)
│   ├── types/
│   │   └── calendar.ts                 # Interfaces/types voor data zoals events of notities
│   ├── App.tsx                         # Root component
│   ├── App.css                         # Component-specifieke stijlen
│   ├── index.css                       # Globale Tailwind styles
│   ├── main.tsx                        # Entry point van React-app
│   └── vite-env.d.ts                   # Vite-types
├── .gitignore
├── bun.lockb
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts

 
```
## ⚙️ Installation
### Requirements
- Node.js (version 18 or higher)
- npm, yarn, of bun package manager
### Steps
**Clone the repository**

```bash
git clone https://github.com/SkipperH/year-at-a-glance-time.git
cd local-story-explorer
```
**Instal dependencies**
```bash
npm install
# or
yarn install
# or
bun install
```

**Start the development server**
```bash
npm run dev
# or
yarn dev
# or
bun dev
```
**Open the application**
```bash
Go to http://localhost:5173 in your browser.
The application will load by default with an overview of all stories.
```
## 📝 License
This project is licensed under MIT License.


## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2479f9a0-2334-48df-9853-53317d0eaf8e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
