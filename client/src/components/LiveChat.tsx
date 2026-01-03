import { useEffect } from "react";

export default function LiveChat() {
  useEffect(() => {
    // Tawk.to Live Chat Script
    // This is a free live chat widget - you can create your own account at https://www.tawk.to/
    // Replace the property ID below with your own Tawk.to property ID after signing up
    
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    
    // Add script to document
    document.body.appendChild(script);
    
    // Cleanup function to remove script when component unmounts
    return () => {
      document.body.removeChild(script);
      // Also remove the Tawk.to iframe if it exists
      const tawkIframe = document.getElementById("tawk-bubble-container");
      if (tawkIframe) {
        tawkIframe.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
}
