/**
 * Example component showing how to use RTL utilities
 * This is just for demonstration - you can delete this file
 */
import { getMargin, getPadding, getPosition, getCloseButtonClass } from '@/lib/rtl'

export default function RTLExample() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">RTL Examples</h2>
      
      {/* Example 1: Close button with RTL positioning */}
      <div className="relative bg-gray-100 p-4 rounded mb-4">
        <button className={getCloseButtonClass()}>
          ✕
        </button>
        <p>Close button positioned correctly for RTL</p>
      </div>
      
      {/* Example 2: Icons with RTL margins */}
      <div className="flex items-center space-x-4 mb-4">
        <span>←</span>
        <span>Icon with RTL margin</span>
      </div>
      
      {/* Example 3: Text alignment */}
      <div className="text-right mb-4">
        <p>This text is right-aligned for RTL</p>
      </div>
      
      {/* Example 4: Flex layout */}
      <div className="flex flex-row-reverse space-x-reverse space-x-4 mb-4">
        <div className="bg-blue-100 p-2 rounded">Item 1</div>
        <div className="bg-green-100 p-2 rounded">Item 2</div>
        <div className="bg-red-100 p-2 rounded">Item 3</div>
      </div>
      
      {/* Example 5: Using RTL utility functions */}
      <div className="space-y-2">
        <div className={`flex items-center ${getMargin('left', 4)}`}>
          <span>Item with RTL margin</span>
        </div>
        <div className={`flex items-center ${getPadding('right', 4)}`}>
          <span>Item with RTL padding</span>
        </div>
      </div>
    </div>
  )
}
