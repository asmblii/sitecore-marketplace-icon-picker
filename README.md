# Marketplace Icon Picker

A modern icon picker application for the Sitecore Marketplace, based on [Material UI Icons](https://mui.com/material-ui/material-icons/). This is a sample application showing how you can create a custom field application.

## 📦 Running the Application Locally
You can run this application locally, however note that it requires loading within the Sitecore Marketplace to enable full functionality.

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

This application is designed to function using the [Custom Field extension point](https://doc.sitecore.com/mp/en/developers/marketplace/page-builder-custom-fields.html) in the Sitecore Marketplace.


## 🌎 Head application integration
After configuring this application as a custom field, and storing the selected icon in a field value. You need to perform a small integration in your head application to enable display of the selected icon.

- Follow the [Material UI Icon installation instructions](https://mui.com/material-ui/getting-started/installation/) for your Head Application.
- Ensure the field value is returned in your Component props.
- In your Component output the value of the custom field as a class on the dom element you want to display the icon e.g.

```ts
{props.fields.Icon.value !== '' && (
   <span className="material-icons">
      <Text field={props.fields.Icon} />
   </span>
)}
```

## 📝 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🐛 Issues

If you encounter any issues or have suggestions for improvements, please open an issue on the repository.
