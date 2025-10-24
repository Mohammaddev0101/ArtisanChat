/**
 * Simple RTL utility functions for Persian/Arabic UI
 */

/**
 * Get RTL-aware classes for common patterns
 */
export const rtl = {
  // Text alignment
  text: 'text-right',
  
  // Flex direction
  flexRow: 'flex-row-reverse',
  flexRowReverse: 'flex-row',
  
  // Spacing
  spaceX: 'space-x-reverse',
  
  // Margins
  marginLeft: (value) => `mr-${value}`,
  marginRight: (value) => `ml-${value}`,
  
  // Padding
  paddingLeft: (value) => `pr-${value}`,
  paddingRight: (value) => `pl-${value}`,
  
  // Positioning
  left: (value) => `right-${value}`,
  right: (value) => `left-${value}`,
  
  // Borders
  borderLeft: (value) => `border-r-${value}`,
  borderRight: (value) => `border-l-${value}`,
  
  // Rounded corners
  roundedLeft: (value) => `rounded-r-${value}`,
  roundedRight: (value) => `rounded-l-${value}`,
  
  // Icons
  chevronRight: 'rotate-180',
  chevronLeft: 'rotate-180',
  arrowRight: 'rotate-180',
  arrowLeft: 'rotate-180',
}

/**
 * Apply RTL classes to a base class
 */
export const applyRTL = (baseClass, rtlClass) => {
  return `${baseClass} rtl:${rtlClass}`
}

/**
 * Get RTL-aware close button positioning
 */
export const getCloseButtonClass = () => {
  return 'absolute right-4 top-4 rtl:right-auto rtl:left-4'
}

/**
 * Get RTL-aware icon rotation
 */
export const getIconRotation = (iconType) => {
  const rotations = {
    'chevron-right': 'rtl:rotate-180',
    'chevron-left': 'rtl:rotate-180',
    'arrow-right': 'rtl:rotate-180',
    'arrow-left': 'rtl:rotate-180',
  }
  return rotations[iconType] || ''
}

/**
 * Get RTL-aware spacing for flex items
 */
export const getFlexSpacing = (spacing) => {
  return `space-x-${spacing} rtl:space-x-reverse`
}

/**
 * Get RTL-aware margin classes
 */
export const getMargin = (side, value) => {
  const map = {
    left: `ml-${value} rtl:mr-${value}`,
    right: `mr-${value} rtl:ml-${value}`,
    top: `mt-${value}`,
    bottom: `mb-${value}`,
  }
  return map[side] || ''
}

/**
 * Get RTL-aware padding classes
 */
export const getPadding = (side, value) => {
  const map = {
    left: `pl-${value} rtl:pr-${value}`,
    right: `pr-${value} rtl:pl-${value}`,
    top: `pt-${value}`,
    bottom: `pb-${value}`,
  }
  return map[side] || ''
}

/**
 * Get RTL-aware positioning classes
 */
export const getPosition = (side, value) => {
  const map = {
    left: `left-${value} rtl:right-${value}`,
    right: `right-${value} rtl:left-${value}`,
    top: `top-${value}`,
    bottom: `bottom-${value}`,
  }
  return map[side] || ''
}

export default rtl
