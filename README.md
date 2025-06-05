
# Manor - Nightclub Website

A modern, responsive website for Manor nightclub built with React, TypeScript, and Tailwind CSS.

## Project Features

- Modern React application with TypeScript
- Responsive design with Tailwind CSS
- Video background hero section
- Multiple pages (Home, Services, Contact)
- Component-based architecture using shadcn/ui

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite
- **State Management**: TanStack Query
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js (recommended: install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm or yarn

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
```

2. Navigate to the project directory:
```sh
cd <YOUR_PROJECT_NAME>
```

3. Install dependencies:
```sh
npm install
```

4. Start the development server:
```sh
npm run dev
```

The application will be available at `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## Deployment

This project can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Build the project with `npm run build` and deploy the `dist` folder.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
