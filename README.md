# LUXE - Premium Fashion Store

A modern ecommerce clothing website built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Authentication System
- **Login Page** (`/auth/login`) - Beautiful sign-in form with animations
- **Signup Page** (`/auth/signup`) - Registration form with password strength validation
- **Forgot Password** (`/auth/forgot-password`) - Password reset functionality
- **Account Dashboard** (`/account`) - User profile and account management

### Key Features
- ✨ **Modern UI/UX** - Clean, responsive design with smooth animations
- 🔐 **Authentication Context** - Centralized auth state management
- 🎨 **Framer Motion** - Beautiful page transitions and micro-interactions
- 📱 **Mobile Responsive** - Optimized for all device sizes
- 🛒 **Shopping Cart** - Add/remove items with quantity management
- ❤️ **Wishlist** - Save favorite items for later
- 🔍 **Search Functionality** - Find products quickly
- 🎯 **Product Categories** - Browse by men, women, accessories

### Authentication Features
- **Form Validation** - Real-time validation with helpful error messages
- **Password Strength** - Visual password strength indicator
- **Social Login** - Google and Facebook integration (UI ready)
- **Remember Me** - Stay logged in option
- **Secure Routes** - Protected account pages
- **Toast Notifications** - User feedback for all actions

### Pages Created
1. **Login Page** (`/auth/login`)
   - Email/password authentication
   - Social login options
   - Forgot password link
   - Sign up redirect

2. **Signup Page** (`/auth/signup`)
   - First name, last name, email, password
   - Password strength validation
   - Password confirmation
   - Terms and conditions checkbox

3. **Forgot Password** (`/auth/forgot-password`)
   - Email input for reset link
   - Success state with instructions
   - Back to login option

4. **Account Dashboard** (`/account`)
   - User profile display
   - Quick access to orders, wishlist, settings
   - Account statistics
   - Quick actions

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

### Authentication Flow

1. **Sign Up**: Users can create an account with email/password
2. **Sign In**: Existing users can log in with their credentials
3. **Password Reset**: Users can request a password reset link
4. **Account Management**: Authenticated users can manage their profile

### File Structure
```
app/
├── auth/
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── forgot-password/page.tsx
├── account/
│   └── page.tsx
└── layout.tsx

contexts/
├── auth-context.tsx
├── cart-context.tsx
└── wishlist-context.tsx

components/
├── layout/
│   └── header.tsx
└── ui/
    └── [shadcn/ui components]
```

### Customization

The authentication system is designed to be easily customizable:

- **Styling**: Modify Tailwind classes in the components
- **Validation**: Update form validation logic
- **API Integration**: Replace mock functions with real API calls
- **Social Login**: Implement actual OAuth providers
- **Email Templates**: Customize password reset emails

### Security Features

- Password strength requirements
- Form validation and sanitization
- Protected routes for authenticated users
- Secure password handling (ready for backend integration)

### Future Enhancements

- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Profile picture upload
- [ ] Address management
- [ ] Order history
- [ ] Payment integration
- [ ] Admin dashboard

---

Built with ❤️ using modern web technologies 