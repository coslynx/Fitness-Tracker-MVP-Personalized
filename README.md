<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
Fitness-Tracker-MVP-Personalized
</h1>
<h4 align="center">A user-centric platform for personalized fitness tracking and a thriving community</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="Framework used">
  <img src="https://img.shields.io/badge/Frontend-React,_JavaScript,_HTML,_CSS-red" alt="Frontend technologies">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Backend technology">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-green" alt="Database used">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/Fitness-Tracker-MVP-Personalized?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/Fitness-Tracker-MVP-Personalized?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/Fitness-Tracker-MVP-Personalized?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>


## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository houses a Minimum Viable Product (MVP) for a Fitness Tracker application. The MVP is designed to empower users with personalized goal setting, detailed progress tracking, and a vibrant social community. 

The project leverages a modern tech stack, including:

- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **State Management:** Zustand
- **Authentication:** NextAuth.js

## 📦 Features

|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔐 | **User Authentication** | Secure login and signup using email and password, with support for potential social login integrations in future iterations. |
| 🎯 | **Goal Setting**       | Users can create personalized fitness goals with specific targets, deadlines, and measurable metrics. |
| 📊 | **Progress Tracking**   | Track workout logs, including activity type, duration, calories burned, and other relevant metrics. |
| 📈 | **Data Visualization** | Visualize progress towards goals using charts and graphs for a clear understanding of achievements. |
| 💬 | **Social Sharing**     | Share workout logs and progress updates with friends and followers to build motivation and accountability within a community. |

## 📂 Structure

```text
Fitness-Tracker-MVP-Personalized
├── src
│   ├── components
│   │   ├── Button.tsx
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   ├── GoalInput.tsx
│   │   ├── ProgressChart.tsx
│   │   └── SocialShareButton.tsx
│   ├── pages
│   │   ├── _app.tsx
│   │   ├── index.tsx
│   │   ├── dashboard.tsx
│   │   └── login.tsx
│   │       └── index.tsx
│   ├── styles
│   │   └── global.css
│   ├── utils
│   │   ├── helpers.ts
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── validation.ts
│   └── config
│       └── next-auth.config.ts
└── middleware
    └── authentication.ts

```

## 💻 Installation

### 🔧 Prerequisites

- Node.js (LTS version recommended)
- npm (or yarn)
- PostgreSQL (with a running instance)

### 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/coslynx/Fitness-Tracker-MVP-Personalized.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Fitness-Tracker-MVP-Personalized
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Create a `.env` file (example):**
   ```bash
   cp .env.example .env
   ```
   - Update the `.env` file with your PostgreSQL credentials.

## 🏗️ Usage

### 🏃‍♂️ Running the Development Server

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser and navigate to:** [http://localhost:3000](http://localhost:3000).

### ⚙️ Configuration

- Configure the database connection in your `.env` file.
- Adjust other settings as needed (e.g., social media API keys, if applicable).

### 📚 Examples

- **📝 Example 1: Setting a Fitness Goal**
   - Login to the application.
   - Navigate to the "Goals" section.
   - Click the "Add Goal" button.
   - Enter a goal name (e.g., "Lose 10 pounds"), target value (e.g., "10"), and deadline (e.g., "2024-12-31").
   - Submit the goal.

- **📝 Example 2: Logging a Workout**
   - Login to the application.
   - Navigate to the "Workouts" section.
   - Click the "Log Workout" button.
   - Select the activity type (e.g., "Running").
   - Enter the workout duration (e.g., "30 minutes").
   - Submit the workout log.

- **📝 Example 3: Sharing Workout Progress**
   - Login to the application.
   - Navigate to your workout logs.
   - Click the "Share" button next to a specific workout entry.
   - Choose your preferred social media platform to share your progress.

## 🌐 Hosting

### 🚀 Deployment Instructions

#### Using Vercel (Recommended)

1. **Login to Vercel:**
   - [https://vercel.com/](https://vercel.com/)

2. **Import project:**
   - Click the "Import Project" button and select the `Fitness-Tracker-MVP-Personalized` directory.
   - Follow the Vercel instructions to configure your project and deploy.

#### Using Netlify

1. **Login to Netlify:**
   - [https://www.netlify.com/](https://www.netlify.com/)

2. **Import project:**
   - Click the "New site from Git" button.
   - Connect your GitHub account and select the `Fitness-Tracker-MVP-Personalized` repository.
   - Follow the Netlify instructions to configure your project and deploy.

#### Using GitHub Pages

1. **Create a `gh-pages` branch:**
   ```bash
   git checkout -b gh-pages
   ```

2. **Install the `gh-pages` package:**
   ```bash
   npm install gh-pages --save-dev
   ```

3. **Configure the `gh-pages` package:**
   - Update your `package.json` file with the following:
     ```json
     "scripts": {
       "deploy": "gh-pages -d build"
     }
     ```

4. **Build the application:**
   ```bash
   npm run build
   ```

5. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

6. **Push the changes to the `gh-pages` branch:**
   ```bash
   git push origin gh-pages
   ```

#### Using AWS

1. **Create an AWS account (if you don't have one):**
   - [https://aws.amazon.com/](https://aws.amazon.com/)

2. **Create an S3 bucket:**
   - Go to the S3 console and create a new bucket.

3. **Configure an S3 bucket website:**
   - In the S3 bucket settings, enable "Static website hosting" and configure the index document (`index.html`).

4. **Deploy the build files:**
   - Use the AWS CLI or a tool like the AWS S3 plugin for VS Code to upload the build files (from the `build` directory) to the S3 bucket.

5. **Configure a CloudFront distribution (optional):**
   - Set up a CloudFront distribution to serve your S3 website content with a custom domain name and caching.

#### Using Google Cloud

1. **Create a Google Cloud Platform (GCP) account (if you don't have one):**
   - [https://cloud.google.com/](https://cloud.google.com/)

2. **Create a Cloud Storage bucket:**
   - Go to the Cloud Storage console and create a new bucket.

3. **Configure a website on Cloud Storage:**
   - In the Cloud Storage bucket settings, enable "Website hosting" and configure the index document (`index.html`).

4. **Deploy the build files:**
   - Use the Google Cloud Storage CLI or a tool like the Google Cloud Storage plugin for VS Code to upload the build files (from the `build` directory) to the Cloud Storage bucket.

5. **Configure a Cloud CDN (optional):**
   - Use Cloud CDN to cache and accelerate your Cloud Storage website content.

### 🔑 Environment Variables

- `NEXT_PUBLIC_APP_NAME`: Your application name (displayed in the header).
- `NEXT_PUBLIC_APP_DESCRIPTION`: Your application description (displayed in the header).
- `DATABASE_URL`: Your PostgreSQL database URL (e.g., `postgres://username:password@host:port/database_name`).

## 📜 API Documentation

### 🔍 Endpoints

- **`GET /api/goals`:** Retrieves a list of goals for the current user.
- **`POST /api/goals`:** Creates a new goal for the current user.
- **`GET /api/goals/:id`:** Retrieves a specific goal by its ID.
- **`PUT /api/goals/:id`:** Updates an existing goal by its ID.
- **`DELETE /api/goals/:id`:** Deletes a goal by its ID.
- **`POST /api/workouts`:** Logs a new workout for the current user.
- **`GET /api/workouts`:** Retrieves a list of workouts for the current user.
- **`GET /api/workouts/:id`:** Retrieves a specific workout by its ID.
- **`PUT /api/workouts/:id`:** Updates an existing workout by its ID.
- **`DELETE /api/workouts/:id`:** Deletes a workout by its ID.

### 🔒 Authentication

- The API endpoints require authentication.
- Authentication is handled through NextAuth.js, using JWT tokens for session management.

### 📝 Examples

```bash
# Get all goals
curl -X GET -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:3000/api/goals

# Create a new goal
curl -X POST -H "Authorization: Bearer YOUR_JWT_TOKEN" -H "Content-Type: application/json" -d '{"name": "Lose 10 pounds", "target": "10", "deadline": "2024-12-31"}' http://localhost:3000/api/goals

# Log a new workout
curl -X POST -H "Authorization: Bearer YOUR_JWT_TOKEN" -H "Content-Type: application/json" -d '{"type": "Running", "duration": "30 minutes"}' http://localhost:3000/api/workouts
```

## 📜 License & Attribution

### 📄 License

This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.

### 🤖 AI-Generated MVP

This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).

No human was directly involved in the coding process of the repository: Fitness-Tracker-MVP-Personalized

### 📞 Contact

For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>