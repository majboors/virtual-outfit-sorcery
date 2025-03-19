
interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  onClick: () => void;
  isSelected?: boolean;
}

const ProductCard = ({
  image,
  name,
  price,
  onClick,
  isSelected = false
}: ProductCardProps) => {
  return (
    <div 
      className={`flex flex-col items-center ${isSelected ? 'scale-105' : ''} transition-all duration-200 cursor-pointer`}
      onClick={onClick}
    >
      <div className="bg-white/80 rounded-lg p-2 mb-2 h-32 w-32 flex items-center justify-center">
        <img 
          src={image} 
          alt={name} 
          className="max-h-28 max-w-28 object-contain" 
        />
      </div>
      <div className="text-center">
        <h3 className="text-white text-sm font-medium">{name}</h3>
        <p className="text-white text-sm font-bold">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
