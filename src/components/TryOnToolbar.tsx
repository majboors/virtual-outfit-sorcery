
import { Shirt, ShoppingCart, Check, Grid, List, User, FileText, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface TryOnToolbarProps {
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  onAddToCart: () => void;
  onCheckout: () => void;
}

const TryOnToolbar = ({
  view,
  onViewChange,
  onAddToCart,
  onCheckout
}: TryOnToolbarProps) => {
  return (
    <div className="flex items-center justify-between w-full max-w-6xl mx-auto px-4">
      <div className="flex items-center">
        <button 
          className="flex items-center justify-center bg-white/20 backdrop-blur-md p-2 rounded-full mr-3"
        >
          <Shirt className="w-5 h-5 text-white" />
          <span className="text-white font-medium ml-2">VirtualFit</span>
        </button>

        <button className="flex items-center justify-center bg-white/20 backdrop-blur-md p-2 rounded-full mr-2">
          <User className="w-5 h-5 text-white" />
        </button>

        {/* View options */}
        <div className="flex space-x-1">
          <button 
            className={cn(
              "flex items-center justify-center p-2 rounded-full",
              view === "grid" ? "bg-white/30" : "bg-white/10"
            )}
            onClick={() => onViewChange("grid")}
          >
            <Grid className="w-5 h-5 text-white" />
          </button>
          <button 
            className={cn(
              "flex items-center justify-center p-2 rounded-full",
              view === "list" ? "bg-white/30" : "bg-white/10"
            )}
            onClick={() => onViewChange("list")}
          >
            <List className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button 
          className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/30 transition-all"
          onClick={onAddToCart}
        >
          <ShoppingCart className="w-5 h-5 text-white" />
          <span className="text-white font-medium">Add to cart</span>
        </button>
        
        <button 
          className="flex items-center justify-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full hover:bg-white/30 transition-all"
          onClick={onCheckout}
        >
          <Check className="w-5 h-5 text-white" />
          <span className="text-white font-medium">Checkout</span>
        </button>
        
        <button className="flex items-center justify-center bg-white/20 backdrop-blur-md p-2 rounded-full">
          <Settings className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default TryOnToolbar;
