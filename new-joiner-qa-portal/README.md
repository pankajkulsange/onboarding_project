# new-joiner-qa-portal

This project is a web portal designed for new joiners in the QA department. It allows project managers to manage new joiners, track their progress, and provide them with the necessary applications, tools, and resources.

## Project Structure

```
new-joiner-qa-portal
├── src
│   ├── pages
│   │   ├── index.tsx          # Home page with welcome message or redirects
│   │   ├── manager.tsx        # Project manager actions and tracking
│   │   └── new-joiner.tsx     # New joiner dashboard displaying resources
│   ├── components
│   │   └── Navbar.tsx         # Navigation component for routing
│   └── styles
│       └── globals.css        # Global styles including TailwindCSS
├── public                      # Static assets directory
├── package.json                # NPM configuration file
├── tailwind.config.js          # TailwindCSS configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd new-joiner-qa-portal
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the development server:**
   ```
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Features

- **Manager Dashboard:** Project managers can manage new joiners and track their progress.
- **New Joiner Dashboard:** New joiners can view applications, tools, and resources assigned to them.
- **Responsive Design:** The application is styled using TailwindCSS for a modern and responsive UI.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.