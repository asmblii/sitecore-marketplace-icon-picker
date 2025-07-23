# Marketplace Icon Picker

A modern icon picker application for the Sitecore Marketplace, built with React and TypeScript. This application provides an intuitive interface for selecting and managing icons within the Sitecore ecosystem.

## 🚀 Features

- **Interactive Icon Selection**: Browse and select icons with a user-friendly interface
- **Sitecore Integration**: Seamless integration with Sitecore Marketplace SDK
- **Real-time Feedback**: Live save status updates and error handling
- **Modern UI**: Clean, responsive design built with Tailwind CSS and Radix UI
- **TypeScript Support**: Full type safety throughout the application

## 🛠 Tech Stack

### Core Framework
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server

### Sitecore Integration
- **@sitecore-marketplace-sdk/client** (^0.1.4) - Sitecore Marketplace client SDK
- **@sitecore-marketplace-sdk/xmc** (^0.1.7) - Sitecore XM Cloud integration

### UI & Styling
- **Tailwind CSS** (^4.1.11) - Utility-first CSS framework
- **@tailwindcss/vite** (^4.1.11) - Vite integration for Tailwind
- **Radix UI** (@radix-ui/react-slot ^1.2.3) - Unstyled, accessible UI primitives
- **Lucide React** (^0.525.0) - Beautiful & consistent icon library
- **Class Variance Authority** (^0.7.1) - CSS-in-TS variant API
- **clsx** (^2.1.1) - Utility for constructing className strings
- **tailwind-merge** (^3.3.1) - Merge Tailwind CSS classes without conflicts

### Development Tools
- **ESLint** (^9.30.1) - Code linting and formatting
- **TypeScript ESLint** (^8.35.1) - TypeScript-specific linting rules
- **Vite** (^7.0.4) - Development server and build tool

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd marketplace-icon-picker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏃‍♂️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## 🔧 Development

### Project Structure
```
src/
├── components/
│   └── ui/           # Reusable UI components
├── utils/
│   └── hooks/        # Custom React hooks
├── lib/              # Utility functions
└── assets/           # Static assets
```

### Key Components
- **useMarketplaceClient** - Custom hook for Sitecore Marketplace SDK integration
- **Button** - Reusable button component with Tailwind styling
- **App** - Main application component with icon picker functionality

## 🔗 Sitecore Integration

This application integrates with the Sitecore Marketplace using the official SDKs:

- Retrieves application context from the marketplace
- Saves icon selections with real-time feedback
- Handles marketplace client initialization and error states
- Provides seamless close app functionality after successful saves

## 🎨 UI Components

Built with modern, accessible components:
- Radix UI primitives for accessibility
- Tailwind CSS for responsive styling
- Lucide React icons for consistent iconography
- Custom button variants with loading and error states

## 📝 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Issues

If you encounter any issues or have suggestions for improvements, please open an issue on the repository.
