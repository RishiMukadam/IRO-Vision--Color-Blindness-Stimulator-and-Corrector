# 🧠 IRO Vision — Color Blindness Simulator and Corrector

**Live Demo:** 🌐 [IRO Vision Web App](https://super-gaufre-1b6b5f.netlify.app/test)

IRO Vision is an accessibility-focused application designed to simulate and correct images for individuals with color vision deficiency (CVD), commonly known as color blindness. It supports major CVD types such as Protanomaly, Deuteranomaly, and Tritanomaly.

---

## 📌 Features

- 🎨 **Color Blindness Simulation**  
  Experience how individuals with various types of color blindness perceive images.

- 🛠️ **Image Correction**  
  View corrected versions of images for improved visibility tailored to CVD types.

- 📤 **Image Upload & Processing**  
  Upload local images (JPG, PNG) and apply real-time simulation or correction.

- 📱 **Responsive Web UI**  
  Built with React, Tailwind CSS, and Vite for blazing-fast user experience.

---

## 🚀 Getting Started (Local Setup)

> Make sure you have **Node.js (>=16)** and **npm** installed.

```bash
git clone https://github.com/your-username/iro-vision.git
cd iro-vision

npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
├── public/
├── src/
│   ├── components/     → Header & Footer
│   ├── pages/          → Home, Info, Test pages
│   ├── services/       → imageProcessor.ts (core logic)
│   ├── App.tsx         → Root component
│   └── main.tsx        → Entry point
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── package.json
```

---

## ⚙️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Build Tool:** Vite
- **Image Processing:** Custom logic in `imageProcessor.ts`
- **Hosting:** Netlify

---

## 📖 About the Project

**IRO Vision** originated as a third-year mini project at **Datta Meghe College of Engineering, Airoli**, under the University of Mumbai. The aim is to improve accessibility in design, education, and everyday life by making images more colorblind-friendly.

Key simulation types supported:
- 🔴 Protanomaly (Red-weak)
- 🟢 Deuteranomaly (Green-weak)
- 🔵 Tritanomaly (Blue-weak)
- ⚫ Severe Tritanomaly

---

## 📌 Future Scope

- ✅ OCR + Image Translation
- 🔍 Drag-and-drop functionality
- 📱 Native mobile version
- 🤖 Improved color correction using ML
- 🌐 Browser extensions for web image correction

---

## 👥 Team Members

- **Dipali Gunjal**
- **Anushka Jagadale** 
- **Rishikesh Mukadam** 
- **Bramha Navale** 


---

