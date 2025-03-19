
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ProductInfoProps {
  name: string;
  price: number;
  size: string;
  color: string;
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
  onEdit: () => void;
}

const ProductInfo = ({
  name,
  price,
  size,
  color,
  onSizeChange,
  onColorChange,
  onEdit
}: ProductInfoProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-black/30 backdrop-blur-md text-white p-4 rounded-b-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">{name}</h2>
        <span className="text-xl font-bold">${price}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="text-sm mr-2">Size</span>
            <Select value={size} onValueChange={onSizeChange}>
              <SelectTrigger className="w-20 h-8 bg-white/10 border-0 text-white">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="S">S</SelectItem>
                <SelectItem value="M">M</SelectItem>
                <SelectItem value="L">L</SelectItem>
                <SelectItem value="XL">XL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm mr-2">Color</span>
            <Select value={color} onValueChange={onColorChange}>
              <SelectTrigger className="w-24 h-8 bg-white/10 border-0 text-white">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="White">White</SelectItem>
                <SelectItem value="Black">Black</SelectItem>
                <SelectItem value="Blue">Blue</SelectItem>
                <SelectItem value="Red">Red</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="bg-white/20 border-0 text-white hover:bg-white/30"
          onClick={onEdit}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
