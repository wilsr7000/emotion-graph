// Mock SVG methods that aren't available in jsdom
global.SVGElement.prototype.getBBox = () => ({
  x: 0,
  y: 0,
  width: 0,
  height: 0
});

// Add custom matchers
expect.extend({
  toHaveAttribute(received, attr, value) {
    const hasAttr = received.hasAttribute(attr);
    const attrValue = received.getAttribute(attr);
    
    if (!hasAttr) {
      return {
        message: () => `expected element to have attribute "${attr}"`,
        pass: false
      };
    }
    
    if (value !== undefined && attrValue !== value) {
      return {
        message: () => `expected attribute "${attr}" to have value "${value}" but got "${attrValue}"`,
        pass: false
      };
    }
    
    return {
      message: () => `expected element not to have attribute "${attr}"${value ? ` with value "${value}"` : ''}`,
      pass: true
    };
  }
}); 