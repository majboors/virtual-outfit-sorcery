
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs = ({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryTabsProps) => {
  return (
    <div className="flex items-center justify-center bg-white/20 backdrop-blur-sm p-1 rounded-full max-w-md mx-auto">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-medium transition-all",
            activeCategory === category 
              ? "bg-white/80 text-black shadow-sm" 
              : "text-white/90 hover:bg-white/10"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
