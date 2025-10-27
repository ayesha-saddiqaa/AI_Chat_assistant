# AI Chat Assistant (LLM-based Chat UI)

An intelligent **AI Chat Assistant** built using **React.js**, **Firebase**, and **Google Gemini API**.  
It allows users to **log in**, **chat with AI**, and **save chat history** securely in Firestore.  
The app features a modern **dark theme** and **responsive interface**.


## Table of Contents
1. [Overview](#-overview)
2. [Features](#-features)
3. [Prerequisites](#-prerequisites)
4. [Dependencies](#-dependencies)
5. [Installation Guide](#-installation-guide)

## Overview
The **AI Chat Assistant** is a modern web-based chatbot built on **React.js** and integrated with **Google Gemini API** for AI-powered responses.  
It provides the following capabilities:
- Secure **Firebase Authentication**
- Real-time chat interface
- Message storage using **Cloud Firestore**
- Clean, minimal **dark UI**


## Features
User login & signup with Firebase Authentication  
Real-time messaging powered by Gemini API  
Chat history automatically saved in Firestore  
Responsive design with Tailwind CSS  
Modern, smooth UI with a focus on usability  


## Prerequisites
Before running this project, make sure you have the following installed:
- **Node.js** ≥ 18  
- **npm** ≥ 9  
- **Firebase project** with Authentication and Firestore enabled  
- **Google Gemini API key**  


## Dependencies
You can install all dependencies at once with:
npm install
npm install firebase
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p (after installation)

# Installation Guide
## Steps to Run the Project

# Clone the Repository:
git clone https://github.com/your-username/AI_Chat_Assistant.git
cd AI_Chat_Assistant

# Install Dependencies:
Install all required packages using npm:
npm install

# Initialize Tailwind CSS
Then, in your tailwind.config.js, set up your paths as:
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
Add the following lines to your index.css file:
@tailwind base;
@tailwind components;
@tailwind utilities;

# Run the Development Server
Now you can run the app locally using:
npm run dev
