# GPA Calculator and Simulator (ASM)

![Status](https://img.shields.io/badge/Status-Production--Ready-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Tech](https://img.shields.io/badge/Tech-React%20%7C%20Vite%20%7C%20Tailwind-blueviolet)

A comprehensive academic tool designed to help students track their academic progress, simulate future GPA scenarios, and receive personalized study strategies using AI.

## 🚀 Features

- **GPA Calculator:** Accurate calculation of Semester and Cumulative GPA.
- **Future Simulator:** "What-if" analysis to plan future semesters and target grades.
- **Cognitive Learning Profile (CLP):** Assess your learning style and get tailored advice.
- **AI Academic Assistant:** Powered by Google Gemini to provide personalized study plans and insights.
- **Multi-language Support:** English and Arabic.
- **Privacy First:** All data is stored locally in your browser.

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, TypeScript
- **UI:** Tailwind CSS, Radix UI, Lucide Icons
- **AI:** Google Gemini API
- **Charts:** Recharts
- **State/Storage:** LocalStorage

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ECHOPI207/GPA-Calculator-and-Simulator-ASM-.git
    cd GPA-Calculator-and-Simulator-ASM-
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Environment Setup:**
    Copy `.env.example` to `.env` and add your Google Gemini API Key.
    ```bash
    cp .env.example .env
    ```
    Edit `.env`:
    ```env
    VITE_GEMINI_API_KEY=your_api_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Build for production:**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
gpa-calculator-asm/
├── data/               # Static data files and templates
├── docs/               # Documentation and guides
├── public/             # Static assets (images, icons)
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React Context (Language, Theme)
│   ├── hooks/          # Custom React Hooks
│   ├── lib/            # Business logic and helpers
│   ├── pages/          # Application routes/pages
│   ├── services/       # External API services (Gemini)
│   ├── types/          # TypeScript definitions
│   └── main.tsx        # Entry point
├── .env.example        # Environment variables template
├── package.json        # Dependencies
└── vite.config.ts      # Vite configuration
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
