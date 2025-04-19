# MountSPA Hot Tub Configurator

A modern web application that allows users to configure and customize Caldera hot tubs with real-time visualization, share configurations, and generate PDF quotes.

## Features

- **Interactive 3D Visualization**: See real-time changes as you customize your hot tub
- **Comprehensive Customization**: Choose from various models, shell colors, cabinet options, and accessories
- **Detailed Pricing**: View pricing updates for each configuration change
- **Configuration Sharing**: Generate shareable links to configurations or send via email
- **PDF Quote Generation**: Create professional PDF quotes for selected configurations
- **Mobile Responsive**: Full functionality on both desktop and mobile devices

## Tech Stack

- React 18
- TypeScript
- Vite
- Material UI
- i18n for internationalization
- PDF generation with PDF-lib

## Getting Started

### Prerequisites

- Node.js 16.0 or higher
- npm 8.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/hottube-configurator.git

# Navigate to the project directory
cd hottube-configurator

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

1. Browse available hot tub models in the main configurator page
2. Select a model to start configuring
3. Customize shell color, cabinet finish, water care options, and add accessories
4. View the configuration summary and total price
5. Generate a PDF quote or share your configuration via link or email



## WordPress Integration

This application integrates with WordPress via a custom API endpoint for:
- Sending configuration emails
- Generating PDF quotes
- Storing customer inquiries

## License

This project is proprietary software developed for MountSPA.

---

# Original Vite React + TypeScript Setup

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
