
import { Shirt, ShoppingCart, FileText, User } from "lucide-react";

interface SidebarControlsProps {
  onItemSelect: () => void;
}

const SidebarControls = ({ onItemSelect }: SidebarControlsProps) => {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-8 bg-white/20 backdrop-blur-lg p-4 rounded-full">
      <button 
        className="flex flex-col items-center justify-center w-12 h-12 bg-white/30 backdrop-blur-md rounded-full hover:bg-white/40 transition-all"
        onClick={onItemSelect}
      >
        <Shirt className="w-6 h-6 text-white" />
      </button>
      
      <button className="flex flex-col items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all">
        <ShoppingCart className="w-6 h-6 text-white" />
      </button>
      
      <button className="flex flex-col items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all">
        <FileText className="w-6 h-6 text-white" />
      </button>
      
      <button className="flex flex-col items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all">
        <User className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default SidebarControls;
