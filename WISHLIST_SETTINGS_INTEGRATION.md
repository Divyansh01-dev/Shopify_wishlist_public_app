# Wishlist Settings Integration Guide

## Overview
This integration connects your Shopify app dashboard settings to the front-end wishlist page, allowing real-time customization of layout, colors, and display options.

## Setup Steps

### 1. Database Migration
Navigate to the backend folder and run the Prisma migration:

```bash
cd Shopify_wishlist_backend
npx prisma migrate dev --name add_wishlist_settings
npx prisma generate
```

### 2. Start the Backend Server
Make sure your backend server is running:

```bash
cd Shopify_wishlist_backend
npm run dev
```

The backend should be running on `http://localhost:5000`

### 3. Update Environment Variables
In your Shopify app (public app), create or update `.env` file:

```
BACKEND_URL=http://localhost:5000
```

For production, update this to your deployed backend URL.

### 4. How It Works

#### Backend API (Shopify_wishlist_backend)
- **Database**: PostgreSQL with Prisma ORM
- **Model**: `WishlistSettings` table stores settings per shop
- **Routes**: 
  - `GET /api/settings?shop={shop}` - Fetches settings
  - `POST /api/settings` - Saves settings
- **Controller**: `src/controllers/settingsController.ts`
- CORS enabled for cross-origin requests

#### Dashboard (Shopify_wishlist_public_app)
- **Route**: `app/routes/app.wishlistsettings.tsx`
- Fetches settings from backend on load
- Saves settings to backend when you click "Save Settings"
- Each shop has its own isolated settings

#### Frontend (Liquid)
- **File**: `extensions/wishlist-extension/blocks/wishlistpage.liquid`
- Fetches settings from backend on page load
- Applies layout (grid/list), colors, and display options dynamically
- Falls back to default settings if API fails

## Available Settings

### Wishlist Page Settings
- **Layout**: Grid or List view
- **Items Per Page**: 6, 12, 24, or 48
- **Show Prices**: Toggle price display
- **Show Stock**: Toggle stock status
- **Social Sharing**: Enable/disable sharing options

### Color Settings
- Primary Color
- Secondary Color
- Accent Color
- Background Color
- Text Color

## Testing

1. Go to your app dashboard → Wishlist Settings
2. Change the layout from "Grid" to "List"
3. Change colors
4. Click "Save Settings"
5. Visit your wishlist page on the storefront
6. The changes should reflect immediately

## Troubleshooting

### Settings not applying?
- Check browser console for API errors
- Verify the backend server is running on `http://localhost:5000`
- Ensure CORS is properly configured in the backend
- Check that the shop parameter is being passed correctly
- Check network tab to see if API calls are successful

### Database errors?
- Navigate to `Shopify_wishlist_backend` folder
- Run `npx prisma generate` to regenerate the Prisma client
- Check that the migration ran successfully
- Verify database connection in `prisma/schema.prisma`
- Make sure PostgreSQL is running and DATABASE_URL is correct in `.env`

### Backend not connecting?
- Check if backend server is running: `npm run dev` in backend folder
- Verify port 5000 is not being used by another application
- Check BACKEND_URL environment variable in the Shopify app

## File Structure

```
Shopify_wishlist_backend/
├── src/
│   ├── controllers/
│   │   └── settingsController.ts     # Settings API logic
│   ├── routes/
│   │   └── settings.routes.ts        # Settings routes
│   └── index.ts                       # Main server file
└── prisma/
    └── schema.prisma                  # Database schema with WishlistSettings model

Shopify_wishlist_public_app/
├── app/
│   └── routes/
│       └── app.wishlistsettings.tsx  # Dashboard settings page
└── extensions/
    └── wishlist-extension/
        └── blocks/
            └── wishlistpage.liquid    # Front-end wishlist page
```

## Next Steps

1. Deploy your app to get a production URL
2. Update the API URL in wishlistpage.liquid
3. Test on a live store
4. Customize additional settings as needed
