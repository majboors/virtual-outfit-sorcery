
import { useState } from 'react';
import { toast } from 'sonner';
import { MetaTags } from '@/utils/MetaTags';
import CategoryTabs from '@/components/CategoryTabs';
import TryOnToolbar from '@/components/TryOnToolbar';
import SidebarControls from '@/components/SidebarControls';
import ProductCard from '@/components/ProductCard';
import ProductInfo from '@/components/ProductInfo';

const VirtualTryOn = () => {
  const [activeCategory, setActiveCategory] = useState('Full body');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedProduct, setSelectedProduct] = useState({
    id: '3',
    name: 'Basic t-shirt',
    price: 105,
    image: '/lovable-uploads/43cf07dc-582a-48d8-b7b4-aa62ffb4c6a3.png',
    size: 'M',
    color: 'White'
  });
  const [size, setSize] = useState('M');
  const [color, setColor] = useState('White');

  const categories = ['Full body', 'Top Body', 'Head', 'Pants', 'Foot'];
  
  const products = [
    {
      id: '1',
      name: 'Basic Sweater',
      price: 105,
      image: 'https://i.imgur.com/JFHjdNZ.png',
    },
    {
      id: '2',
      name: 'Basic Shirt',
      price: 105,
      image: 'https://i.imgur.com/yXOvdOSs.jpg',
    },
    {
      id: '3',
      name: 'Basic t-shirt',
      price: 105,
      image: '/lovable-uploads/43cf07dc-582a-48d8-b7b4-aa62ffb4c6a3.png',
    },
    {
      id: '4',
      name: 'Basic Polo',
      price: 105,
      image: 'https://i.imgur.com/6G3JDn.png',
    },
  ];

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    toast(`Category changed to ${category}`);
  };

  const handleViewChange = (newView: 'grid' | 'list') => {
    setView(newView);
  };

  const handleAddToCart = () => {
    toast.success(`Added ${selectedProduct.name} to cart!`);
  };

  const handleCheckout = () => {
    toast.success('Proceeding to checkout!');
  };

  const handleProductSelect = (product: typeof products[0]) => {
    setSelectedProduct({
      ...product,
      size,
      color
    });
    toast.success(`Selected ${product.name}`);
  };

  const handleSizeChange = (newSize: string) => {
    setSize(newSize);
    toast(`Size changed to ${newSize}`);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    toast(`Color changed to ${newColor}`);
  };

  const handleEdit = () => {
    toast('Edit mode activated');
  };

  const handleItemSelect = () => {
    toast('Item selection mode activated');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
      <MetaTags 
        title="Virtual Try-On Experience"
        description="Try on clothes virtually with our advanced AI technology. See how clothes fit on your body before purchasing."
        canonicalUrl="https://virtualfit.ai/virtual-tryon"
      />

      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1600607687644-c7171b42498f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')" 
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Category tabs */}
        <div className="mt-6 px-4">
          <CategoryTabs 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategoryChange={handleCategoryChange} 
          />
        </div>

        {/* Main toolbar */}
        <div className="mt-6 px-4">
          <TryOnToolbar 
            view={view} 
            onViewChange={handleViewChange} 
            onAddToCart={handleAddToCart}
            onCheckout={handleCheckout}
          />
        </div>

        {/* Sidebar controls */}
        <SidebarControls onItemSelect={handleItemSelect} />

        {/* Main content area */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="bg-black/20 backdrop-blur-md rounded-3xl w-full max-w-6xl aspect-video relative overflow-hidden">
            {/* Central model with selected product */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Product selection carousel at the bottom */}
            <div className="absolute bottom-20 left-0 right-0 flex items-center justify-center space-x-4 px-4">
              {products.map((product) => (
                <ProductCard 
                  key={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  onClick={() => handleProductSelect(product)}
                  isSelected={selectedProduct.id === product.id}
                />
              ))}
            </div>

            {/* Product info */}
            <ProductInfo 
              name={selectedProduct.name}
              price={selectedProduct.price}
              size={size}
              color={color}
              onSizeChange={handleSizeChange}
              onColorChange={handleColorChange}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
