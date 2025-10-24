# RTL Support Guide for ArtisanChat

This guide explains how RTL (Right-to-Left) support is implemented in the ArtisanChat project for Persian/Arabic languages.

## 🎯 Overview

The project is fully configured for RTL languages with:
- ✅ HTML `dir="rtl"` attribute
- ✅ Persian language (`lang="fa"`)
- ✅ RTL-aware CSS classes
- ✅ Simple RTL utility functions
- ✅ Responsive design maintained

## 📁 Files Modified

### Core RTL Configuration
- `src/app/layout.jsx` - HTML dir and lang attributes
- `src/app/globals.css` - RTL-specific CSS rules
- `src/lib/rtl.js` - RTL utility functions

### Components Updated
- `src/components/chat/ResponsiveSidebar.jsx` - RTL-aware sidebar
- All shadcn/ui components have RTL support

## 🛠️ RTL Utility Functions

### Basic Usage
```jsx
import { getMargin, getPadding, getPosition, getCloseButtonClass } from '@/lib/rtl'

// Get RTL-aware margin
const marginClass = getMargin('left', 4) // Returns: "ml-4 rtl:mr-4"

// Get RTL-aware padding  
const paddingClass = getPadding('right', 2) // Returns: "pr-2 rtl:pl-2"

// Get RTL-aware positioning
const positionClass = getPosition('left', 4) // Returns: "left-4 rtl:right-4"

// Get close button positioning
const closeButtonClass = getCloseButtonClass() // Returns: "absolute right-4 top-4 rtl:right-auto rtl:left-4"
```

### Available Functions

| Function | Description | Example |
|----------|-------------|---------|
| `getMargin(side, value)` | RTL-aware margin | `getMargin('left', 4)` → `"ml-4 rtl:mr-4"` |
| `getPadding(side, value)` | RTL-aware padding | `getPadding('right', 2)` → `"pr-2 rtl:pl-2"` |
| `getPosition(side, value)` | RTL-aware positioning | `getPosition('left', 4)` → `"left-4 rtl:right-4"` |
| `getCloseButtonClass()` | Close button positioning | Returns full class string |
| `getIconRotation(iconType)` | Icon rotation for RTL | `getIconRotation('chevron-right')` |
| `getFlexSpacing(spacing)` | Flex spacing with RTL | `getFlexSpacing(4)` → `"space-x-4 rtl:space-x-reverse"` |

## 🎨 CSS Classes for RTL

### Manual RTL Classes
You can also use Tailwind's RTL prefixes directly:

```jsx
// Text alignment
<div className="text-right">RTL text</div>

// Margins and padding
<div className="ml-4 rtl:mr-4">RTL margin</div>
<div className="pl-2 rtl:pr-2">RTL padding</div>

// Positioning
<div className="left-4 rtl:right-4">RTL position</div>

// Flex direction
<div className="flex-row-reverse">RTL flex</div>

// Spacing
<div className="space-x-4 rtl:space-x-reverse">RTL spacing</div>

// Icons
<ChevronRight className="rtl:rotate-180" />
```

## 🔧 Common RTL Patterns

### 1. Close Buttons
```jsx
// Use the utility function
<button className={getCloseButtonClass()}>✕</button>

// Or manually
<button className="absolute right-4 top-4 rtl:right-auto rtl:left-4">✕</button>
```

### 2. Icons with Text
```jsx
// Icon on the right side of text
<div className="flex items-center">
  <span>Text</span>
  <ChevronRight className="ml-2 rtl:ml-0 rtl:mr-2" />
</div>
```

### 3. Navigation
```jsx
// Breadcrumb navigation
<div className="flex items-center space-x-2 rtl:space-x-reverse">
  <span>Home</span>
  <ChevronRight className="rtl:rotate-180" />
  <span>Page</span>
</div>
```

### 4. Form Elements
```jsx
// Form with labels and inputs
<div className="space-y-4">
  <div className="flex items-center justify-between">
    <label>Label</label>
    <input className="text-right" />
  </div>
</div>
```

## 📱 Responsive RTL

The RTL support works seamlessly with responsive design:

```jsx
// Responsive RTL classes
<div className="text-center sm:text-left rtl:text-right">
  Responsive RTL text
</div>

// Mobile-first RTL
<div className="flex-col md:flex-row rtl:md:flex-row-reverse">
  Mobile column, desktop row with RTL
</div>
```

## 🎯 Best Practices

### 1. Use Utility Functions
Prefer the utility functions over manual classes:
```jsx
// ✅ Good
const marginClass = getMargin('left', 4)

// ❌ Avoid
const marginClass = "ml-4 rtl:mr-4"
```

### 2. Test Both Directions
Always test your components in both LTR and RTL modes.

### 3. Icon Handling
```jsx
// ✅ Good - Use rotation for directional icons
<ChevronRight className="rtl:rotate-180" />

// ❌ Avoid - Don't manually flip icons
<ChevronLeft className="rtl:rotate-180" />
```

### 4. Spacing Consistency
```jsx
// ✅ Good - Use space-x-reverse for flex containers
<div className="flex space-x-4 rtl:space-x-reverse">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## 🚀 Implementation Status

- ✅ **Layout**: HTML dir and lang attributes
- ✅ **Global CSS**: RTL-specific styles
- ✅ **Components**: ResponsiveSidebar updated
- ✅ **Utilities**: RTL utility functions
- ✅ **Icons**: Rotation support
- ✅ **Spacing**: Margin/padding utilities
- ✅ **Positioning**: Absolute/fixed positioning
- ✅ **Responsive**: Mobile and desktop support

## 🔍 Testing RTL

To test RTL support:

1. **Browser DevTools**: Change `dir` attribute to `ltr` and `rtl`
2. **CSS**: Check if RTL classes are applied correctly
3. **Layout**: Verify spacing, positioning, and alignment
4. **Icons**: Ensure directional icons are rotated properly

## 📚 Additional Resources

- [Tailwind CSS RTL Support](https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-support)
- [MDN RTL Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Writing_Modes)
- [RTL Best Practices](https://www.w3.org/International/articles/inline-bidi-markup/)

---

**Note**: This RTL implementation is designed to be simple, maintainable, and performant. All components automatically adapt to RTL direction without breaking existing functionality.
