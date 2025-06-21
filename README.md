# LUXE - Premium Fashion Store

A modern ecommerce clothing website built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Key Features
- ✨ **Modern UI/UX** - Clean, responsive design with smooth animations
- 🎨 **Framer Motion** - Beautiful page transitions and micro-interactions
- 📱 **Mobile Responsive** - Optimized for all device sizes
- 🛒 **Shopping Cart** - Add/remove items with quantity management
- ❤️ **Wishlist** - Save favorite items for later
- 🔍 **Search Functionality** - Find products quickly
- 🎯 **Product Categories** - Browse by men, women, accessories

### Pages
- **Home** (`/`) - Landing page with featured products
- **Shop** (`/shop`) - Product catalog with filters
- **Product Details** (`/product/[id]`) - Individual product pages
- **Cart** (`/cart`) - Shopping cart management
- **Wishlist** (`/wishlist`) - Saved items

### Technical Stack
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Radix UI** - Accessible component primitives
- **Context API** - State management

### Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

### File Structure
```
app/
├── cart/
│   └── page.tsx
├── product/
│   └── [id]/
│       └── page.tsx
├── shop/
│   └── page.tsx
├── wishlist/
│   └── page.tsx
├── components/
│   ├── home/
│   ├── layout/
│   └── shop/
└── layout.tsx

contexts/
├── cart-context.tsx
└── wishlist-context.tsx

components/
├── layout/
│   └── header.tsx
└── ui/
    └── [shadcn/ui components]
```

### Features

#### Shopping Cart
- Add/remove products
- Quantity management
- Persistent cart state
- Cart total calculation

#### Wishlist
- Save favorite products
- Remove from wishlist
- Wishlist counter in header

#### Product Management
- Product grid with filters
- Product detail pages
- Category filtering
- Search functionality

#### Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions

### Customization

The ecommerce system is designed to be easily customizable:

- **Styling**: Modify Tailwind classes in the components
- **Products**: Add your product data
- **Categories**: Customize product categories
- **Branding**: Update colors and logos

### Future Enhancements

- [ ] Product reviews and ratings
- [ ] Advanced filtering options
- [ ] Product recommendations
- [ ] Newsletter subscription
- [ ] Contact form
- [ ] About page
- [ ] Blog section

---

Built with ❤️ using modern web technologies 