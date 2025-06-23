# 📅 Year at a Glance Time – Personal Planner App
Een visueel overzicht, één blik vooruit.  
Dit is een persoonlijke planningsapp ontworpen om structuur en overzicht te bieden binnen drukke studie- of werkschema’s.

## 🔗 Live Project

View or edit the project directly via Vercel:
👉 [Open projectlink](https://year-at-a-glance-time.lovable.app/)

## 🧠 About the Project

During my semester, I developed this app as a personal tool to visually map out my planning and priorities. The application helps me structure tasks, deadlines, and time blocks in a yearly overview. It not only boosts my productivity but also aligns with my learning goals in front-end development and visual design.

Key features:
- Year, month, and week view
- Clean and consistent visual style using Tailwind & shadcn/ui
- Easy to expand and customize
- Built with the help of Lovable AI, but also editable locally

## ✨ Features
### 🗺️  Real-time conversations with philosophers
- Philosophers respond live based on user-submitted messages and questions.
### 🔍 Philosophical variety across multiple eras
- A diverse range of philosophers from the Modern era, Ancient Rome, and the Enlightenment.
- Currently, users can talk to René Descartes, Marcus Aurelius, and Friedrich Nietzsche.
### 🧠 Choice of Gemini AI models
- Users can choose from different Gemini AI models, such as Gemini 2.0 Flash or Gemini 1.5 Pro.
### 🧩 Optional prompt optimization
- Messages can be optimized before being sent to philosophers, generating shorter and more specific prompts automatically.
### 🎨 Timeless UI/UX
- Responsive design for desktop and mobile
- Styled with Tailwind CSS
- Smooth animations and hover effects
- Intuitive interface with clear user feedback

## 🏗️ Projectstructure
```bash
world-view-news/

├── public/

│   └── ...                       # Statische bestanden (afbeeldingen, favicon, etc.)

├── src/

│   ├── components/

│   │   ├── Header.tsx           # Navigatiebalk (verplaatsen uit ui)

│   │   ├── MapComponent.tsx     # Leaflet-kaart (hernoemen indien nodig)

│   │   ├── NewsPanel.tsx        # Nieuwsweergave

│   │   ├── chat/                # AI-gerelateerde UI componenten

│   │   └── ui/                  # Knoppen, modals etc. (zoals CTAButtons, ApiKeyModal)

│   ├── pages/

│   │   ├── Index.tsx            # Hoofdpagina

│   │   ├── News.tsx             # Nieuwsfilter pagina

│   │   ├── Chat.tsx             # Chatpagina (optioneel als extra functie)

│   │   ├── About.tsx            # Over ons

│   │   ├── Login.tsx            # (Toevoegen indien nodig)

│   │   └── NotFound.tsx         # Fallbackpagina

│   ├── services/

│   │   ├── LocationService.ts   # Geocoding/search op locatie

│   │   ├── NewsService.ts       # Nieuwsdata ophalen of mocken

│   │   └── GeminiService.ts     # Externe AI-koppeling (verplaatsen vanuit utils)

│   ├── hooks/

│   │   └── use-toast.ts         # Feedbackmeldingen

│   ├── lib/

│   │   └── utils.ts             # Algemene hulpfuncties (merge met promptOptimizer.ts)

│   ├── App.tsx

│   ├── App.css

│   ├── index.css

│   ├── main.tsx

│   └── vite-env.d.ts

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
## 🚀 Installation
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

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2479f9a0-2334-48df-9853-53317d0eaf8e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
