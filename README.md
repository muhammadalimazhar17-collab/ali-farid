# Muhammad Ali Farid — Web Developer Portfolio

A modern, responsive, and professional personal portfolio website for **Muhammad Ali Farid**, Web Developer and student at **Peak Solution**.

Designed from the ground up to be **100% compatible with GitHub Pages** using only standard HTML5, CSS3, and Vanilla JavaScript—without requiring any backend servers, build tools, or complex runtime dependencies.

---

## 📑 Table of Contents

1. [About the Portfolio](#about-the-portfolio)
2. [Technologies Used](#technologies-used)
3. [Folder Structure](#folder-structure)
4. [How to Run Locally](#how-to-run-locally)
5. [Customization Guide](#customization-guide)
   - [Replacing Your Profile Photo](#1-replacing-your-profile-photo)
   - [Replacing Project Screenshots](#2-replacing-project-screenshots)
   - [Updating Your CV / Resume](#3-updating-your-cv--resume)
   - [Updating GitHub, LinkedIn & Email](#4-updating-github-linkedin--email)
   - [Connecting the Contact Form](#5-connecting-the-contact-form-optional)
6. [Step-by-Step GitHub Pages Deployment](#step-by-step-github-pages-deployment)
7. [License & Credits](#license--credits)

---

## 🚀 About the Portfolio

This portfolio was designed to showcase web development projects, practical skills, and educational milestones at Peak Solution.

### Key Highlights:
- **Clean Aesthetic**: Built following modern visual standards with the 60-30-10 color rule and anti-slop design principles.
- **Dark / Light Mode**: Seamless theme switcher that respects system preferences and persists user choice via `localStorage`.
- **Responsive Layout**: Mobile-first architecture tested from 320px mobile screens to desktop monitors.
- **Featured Project — Smart Medico**: Dedicated showcase highlighting the architecture, role-based dashboards, and PDO database security of the healthcare management project.
- **Interactive Modals**: Detailed modal inspection dialogs for projects without page refreshes.
- **Fast & Accessible**: Semantic HTML5 elements, ARIA labels, zero heavy frameworks, and high-performance loading.

---

## 🛠️ Technologies Used

* **HTML5**: Semantic document structure, SEO meta tags, and accessibility attributes.
* **CSS3**: CSS Custom Properties (Variables), Flexbox, CSS Grid, media queries, and subtle micro-animations.
* **Vanilla JavaScript (ES6+)**: Dark mode toggling, mobile drawer navigation, scrollspy, modal popups, and smooth interactions.
* **Google Fonts**: `Outfit` (Headings) and `Plus Jakarta Sans` (Body).
* **Font Awesome 6 (CDN)**: Crisp vector icons for UI affordances and social channels.

> **Note**: No PHP, Node.js, Python, or MySQL servers are required to host or view this portfolio. It is entirely static and client-side.

---

## 📂 Folder Structure

```text
portfolio/
│
├── index.html                           # Main portfolio homepage (HTML5)
│
├── assets/
│   ├── css/
│   │   └── style.css                    # Complete responsive & theme stylesheet
│   │
│   ├── js/
│   │   └── script.js                    # Vanilla JS interactions (Theme, Mobile menu, Modal)
│   │
│   ├── images/
│   │   ├── profile.jpg                  # Profile photo of Muhammad Ali Farid
│   │   ├── smart-medico.jpg             # Preview mockup of Smart Medico application
│   │   ├── business-project.jpg         # Responsive business site preview
│   │   ├── restaurant-project.jpg       # Restaurant website preview
│   │   └── project-placeholder.jpg      # Placeholder preview for other projects
│   │
│   └── cv/
│       └── Muhammad-Ali-Farid-CV.pdf    # Downloadable Curriculum Vitae
│
└── README.md                            # Complete documentation and deployment guide
```

---

## 💻 How to Run Locally

You can run and test this website locally on your computer in any of the following ways:

### Option 1: Direct File Open (Easiest)
1. Navigate to the project folder on your computer.
2. Double-click `index.html` to open it directly in Google Chrome, Firefox, Safari, or Microsoft Edge.

### Option 2: VS Code Live Server (Recommended for Editing)
1. Open the project folder in **VS Code**.
2. Install the **Live Server** extension (by Ritwick Dey) if you haven't already.
3. Right-click `index.html` in the file explorer and click **"Open with Live Server"**.
4. The site will open at `http://127.0.0.1:5500/index.html` with instant live reload as you make edits.

### Option 3: Python Built-in Server
Open your terminal in the portfolio directory and run:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## ✏️ Customization Guide

All personal placeholders are clearly marked in `index.html`, `assets/js/script.js`, and the `assets/` folders.

### 1. Replacing Your Profile Photo
1. Prepare your photograph (a square aspect ratio `1:1`, e.g. 600x600 px is ideal).
2. Rename your photo file to `profile.jpg`.
3. Replace the existing file at `assets/images/profile.jpg`.

### 2. Replacing Project Screenshots
To update the project screenshots:
- **Smart Medico**: Replace `assets/images/smart-medico.jpg` with a screenshot of your Smart Medico dashboard or homepage (16:9 ratio recommended).
- **Business Project**: Replace `assets/images/business-project.jpg`.
- **Restaurant Project**: Replace `assets/images/restaurant-project.jpg`.
- **Additional Projects**: Replace `assets/images/project-placeholder.jpg`.

### 3. Updating Your CV / Resume
1. Export your updated resume from Word, Canva, or LaTeX as a PDF named:
   ```text
   Muhammad-Ali-Farid-CV.pdf
   ```
2. Place this file inside the `assets/cv/` directory, overwriting the existing file:
   ```text
   assets/cv/Muhammad-Ali-Farid-CV.pdf
   ```
3. The "Download CV" buttons in the navigation bar, hero section, and CV banner will automatically download your updated resume.

### 4. Updating GitHub, LinkedIn & Email
Open `index.html` in VS Code and perform a Find & Replace (`Ctrl + H` or `Cmd + H`):

| Placeholder Text | Replace With | Where It Appears |
| :--- | :--- | :--- |
| `YOUR_USERNAME` | Your actual GitHub and LinkedIn usernames | Social links, Project links, Footer |
| `your-email@example.com` | Your real email address | Hero section, Contact cards, Footer |
| `https://github.com/YOUR_USERNAME` | `https://github.com/ali-farid` (example) | Hero, GitHub CTA banner, cards |
| `https://linkedin.com/in/YOUR_USERNAME` | `https://linkedin.com/in/ali-farid` (example) | Social links, Contact cards |

Also update the email in `assets/js/script.js`:
- Line 248: replace `your-email@example.com` with your real email for the "Copy Email" button and mailto generator.

### 5. Connecting the Contact Form (Optional)
Because GitHub Pages is a static host, the contact form currently drafts an email using `mailto:`.
If you want form submissions to arrive directly in your inbox without opening the user's email client, you can connect a free static form service:

#### Using Formspree (Free):
1. Sign up at [formspree.io](https://formspree.io).
2. Create a new form and copy your unique form URL (e.g., `https://formspree.io/f/xyzabcde`).
3. In `index.html`, find `<form id="contact-form">` and add:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

---

## 🌐 Step-by-Step GitHub Pages Deployment

Follow these exact steps to publish your portfolio online for free with GitHub Pages:

### Step 1: Create a GitHub Account
If you do not have a GitHub account yet, sign up for free at [github.com](https://github.com/).

### Step 2: Create a New Repository
1. Log into GitHub and click the **`+`** icon in the top-right corner, then click **"New repository"**.
2. For the repository name:
   - To host at your primary domain (`https://YOUR_USERNAME.github.io/`), name the repository:
     ```text
     YOUR_USERNAME.github.io
     ```
     *(Replace `YOUR_USERNAME` with your exact GitHub username)*.
   - Alternatively, you can name it `portfolio` (the site will be available at `https://YOUR_USERNAME.github.io/portfolio/`).
3. Set the repository visibility to **Public**.
4. Leave "Add a README file" unchecked (we already have one).
5. Click **"Create repository"**.

### Step 3: Upload Your Files
Upload the following files and folders to your repository:
```text
index.html
assets/
README.md
```

You can upload them either using Git in your terminal:
```bash
git init
git add .
git commit -m "Initial commit - Muhammad Ali Farid Portfolio"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```
Or simply drag and drop the files using GitHub's **"Upload files"** button in your browser.

### Step 4: Configure GitHub Pages
1. Go to your repository on GitHub.
2. Click on the **Settings** tab (gear icon at the top).
3. In the left sidebar, click on **Pages** (under "Code and automation").
4. Under **"Build and deployment"**:
   - Source: Select **"Deploy from a branch"**.
   - Branch: Select **`main`**.
   - Folder: Select **`/(root)`**.
5. Click **Save**.

### Step 5: View Your Live Portfolio
1. Wait 1 to 2 minutes for GitHub Pages to complete the deployment.
2. Refresh the **Settings → Pages** screen. A banner will appear at the top saying:
   > *"Your site is live at `https://YOUR_USERNAME.github.io/`"*
3. Click the link to view your live portfolio!

---

## 📄 License & Credits

* **Developer:** Muhammad Ali Farid
* **Institute:** Peak Solution
* **Icons:** [Font Awesome 6 Free](https://fontawesome.com/)
* **Typography:** [Google Fonts](https://fonts.google.com/) (`Outfit`, `Plus Jakarta Sans`, `Fira Code`)
* **License:** Free to use, adapt, and customize for personal portfolios.
