import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Accessibility, Type, Sun, Moon, Eye } from "lucide-react";

export default function AccessibilityMenu() {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [highContrast]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" className="h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-white">
            <Accessibility className="h-6 w-6" />
            <span className="sr-only">Accessibility Options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Accessibility Tools</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="flex justify-between items-center">
            <span className="flex items-center gap-2"><Type className="h-4 w-4" /> Text Size</span>
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-6 w-6 p-0 text-xs"
                onClick={() => setFontSize(Math.max(80, fontSize - 10))}
              >
                -
              </Button>
              <span className="text-xs w-8 text-center leading-6">{fontSize}%</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-6 w-6 p-0 text-xs"
                onClick={() => setFontSize(Math.min(150, fontSize + 10))}
              >
                +
              </Button>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="flex justify-between items-center mt-2">
            <span className="flex items-center gap-2"><Eye className="h-4 w-4" /> High Contrast</span>
            <Button 
              variant={highContrast ? "default" : "outline"} 
              size="sm" 
              className="h-6 px-2 text-xs"
              onClick={() => setHighContrast(!highContrast)}
            >
              {highContrast ? "On" : "Off"}
            </Button>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => { setFontSize(100); setHighContrast(false); }}>
            Reset All
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
