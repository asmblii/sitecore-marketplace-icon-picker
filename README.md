# Marketplace Icon Picker

An icon picker application for the Sitecore Marketplace. It is based on [sample Marketplace Icon Picker by Sitecore](https://github.com/Sitecore/marketplace-icon-picker). However, this icon picker doesn't rely on Material UI Icons, instead the rendering host provide a stylesheet with icons. Hereby you can provide your own beutifull custom icons.

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
   npm start
   ```

## 🔗 Sitecore Integration

This application is designed to function using the [Custom Field extension point](https://doc.sitecore.com/mp/en/developers/marketplace/page-builder-custom-fields.html) in the Sitecore Marketplace.

To test the application, you can follow the guide above to register the application using the Custom Field Extension Point, tied to a specific field in XM Cloud.

## 🌎 Head application integration

Your application must allow CORS from the extensions. When using Sitecore ASP.NET Core SDK this can be configured in your startup with:

```csharp
if (sitecoreSettings.EditingSecret != null)
{
   app.UseCors(builder =>
   {
         builder.WithOrigins([
            "https://pages.sitecorecloud.io",
            "https://sc-marketplace-html-validator.asmblii.dev",
            "https://sc-marketplace-icon-picker.asmblii.dev",
            ])
         .AllowAnyMethod()
         .WithHeaders("Content-Type", "Authorization")
         .AllowCredentials()
         ;
   });
}
```

Secondly your application must expose an endpoint at `/api/xmc-icons` at the editing host telling the extension which stylesheet to load and about the icons (unfortunately we cannot use the `cssRules` from javascript due to  sandboxing of the extension). `name` is required and is the css class that will be applied to the icon options:

```json
{
   "stylesheet": "/dist/icons.css",
   "icons": [
      { "name": "icon-leafs", "category": "Sample category", "title": "Leafs" }
   ]
}
```

## 📝 License

This project is licensed under the terms specified in the [LICENSE](LICENSE) file.

## 🐛 Issues

If you encounter any issues or have suggestions for improvements, please open an issue on the repository.
