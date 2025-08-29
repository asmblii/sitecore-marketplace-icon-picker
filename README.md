# Marketplace Icon Picker

An icon picker application for the Sitecore Marketplace, based on [Material UI Icons](https://mui.com/material-ui/material-icons/). This is a sample application showingcasing how to create a custom field extension to be leveraged in the Sitecore Marketplace with XM Cloud.

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

## 🔗 Sitecore Integration

This application is designed to function using the [Custom Field extension point](https://doc.sitecore.com/mp/en/developers/marketplace/page-builder-custom-fields.html) in the Sitecore Marketplace.

To test the application, you can follow the guide above to register the application using the Custom Field Extension Point, tied to a specific field in XM Cloud.

## 🌎 Head application integration
After configuring this application as a custom field, and storing the selected icon in a field value. You need to perform a small integration in your head application to enable display of the selected icon.

- Follow the [Material UI Icon installation instructions](https://mui.com/material-ui/getting-started/installation/) for your Head Application.
- Ensure the field value is returned in your Component props.
- In your Component output the value of the custom field according to the Martial UI Icons usage guide e.g.

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
