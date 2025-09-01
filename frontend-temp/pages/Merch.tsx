import React, { useState, useCallback, useMemo } from 'react';
import {
  EnhancedCard,
  EnhancedCardContent,
  EnhancedCardHeader,
  EnhancedCardTitle,
  EnhancedCardDescription
} from '../components/ui/enhanced-card';
import {
  EnhancedButton,
  RealTimeCounter,
  RealTimeBadge,
  FloatingActionButton
} from '../components/ui/enhanced-button';
import { useRealTime } from '../components/RealTimeProvider';
import { Badge } from '../components/ui/badge';
import {
  ShoppingCart,
  Shirt,
  Book,
  Music,
  Star,
  Heart,
  Command,
  Flame,
  Wifi,
  WifiOff,
  MessageCircle,
  Filter,
  Search,
  Plus,
  Minus,
  Package,
  Truck,
  Shield,
  Award,
  Gift
} from 'lucide-react';

const Merch: React.FC = () => {
  const { data: realTimeData, isConnected } = useRealTime();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<{[key: string]: number}>({});

  // Memoized data to prevent unnecessary re-renders
  const categories = useMemo(() => [
    { id: 'all', name: 'All Products', icon: <Package className="w-5 h-5" />, count: 24 },
    { id: 'apparel', name: 'Apparel', icon: <Shirt className="w-5 h-5" />, count: 12 },
    { id: 'books', name: 'Books', icon: <Book className="w-5 h-5" />, count: 6 },
    { id: 'music', name: 'Music', icon: <Music className="w-5 h-5" />, count: 4 },
    { id: 'accessories', name: 'Accessories', icon: <Star className="w-5 h-5" />, count: 2 }
  ], []);

  const products = useMemo(() => [
    {
      id: 'supernatural-tshirt',
      title: 'Supernatural Authority T-Shirt',
      description: 'Premium cotton t-shirt featuring the Command Church supernatural authority design.',
      price: 29.99,
      originalPrice: 39.99,
      category: 'apparel',
      rating: 4.9,
      reviews: 128,
      inStock: true,
      featured: true,
      colors: ['black', 'white', 'navy'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      tags: ['bestseller', 'new']
    },
    {
      id: 'kingdom-authority-book',
      title: 'Kingdom Authority Handbook',
      description: 'Comprehensive guide to walking in supernatural authority and Kingdom power.',
      price: 19.99,
      originalPrice: 24.99,
      category: 'books',
      rating: 4.8,
      reviews: 89,
      inStock: true,
      featured: true,
      colors: [],
      sizes: [],
      tags: ['bestseller', 'digital']
    },
    {
      id: 'worship-album',
      title: 'Supernatural Worship',
      description: 'Live worship album featuring powerful supernatural anthems and prophetic songs.',
      price: 14.99,
      originalPrice: 19.99,
      category: 'music',
      rating: 5.0,
      reviews: 156,
      inStock: true,
      featured: false,
      colors: [],
      sizes: [],
      tags: ['new', 'digital']
    }
  ], []);

  // Optimized search and filter logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchTerm]);

  // Optimized cart functions
  const addToCart = useCallback((productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 0) {
        newCart[productId]--;
        if (newCart[productId] === 0) {
          delete newCart[productId];
        }
      }
      return newCart;
    });
  }, []);

  const getTotalItems = useMemo(() => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  }, [cart]);

  const getTotalPrice = useMemo(() => {
    return Object.entries(cart).reduce((sum, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return sum + (product ? product.price * quantity : 0);
    }, 0);
  }, [cart, products]);

  // Optimized event handlers
  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
  }, []);

  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleCartClick = useCallback(() => {
    alert(`Cart: ${getTotalItems()} items - $${getTotalPrice().toFixed(2)} 🛒`);
  }, [getTotalItems, getTotalPrice]);

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Connection Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <RealTimeBadge
          count={isConnected ? getTotalItems() : 0}
          label={isConnected ? "CART" : "OFFLINE"}
          variant={isConnected ? "green" : "pink"}
          animate={true}
          className="backdrop-blur-sm"
        />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black">
        <div className="relative container mx-auto px-4 py-32">
          <div className="text-center max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-6 mb-12">
              <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-16 h-16 text-black" />
              </div>
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 tracking-tight leading-none text-white">
              COMMAND<span className="block text-white">
              MERCHANDISE
              </span>
            </h1>

            <div className="flex items-center justify-center gap-4 mb-8">
              <Badge className="bg-white text-black px-6 py-3 text-lg font-bold">
                <Heart className="w-5 h-5 mr-2" />
                SUPPORT • EMPOWER • TRANSFORM
              </Badge>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                {isConnected ? (
                  <Wifi className="w-4 h-4 text-green-400" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-400" />
                )}
                <span>{isConnected ? 'LIVE STORE' : 'CONNECTING...'}</span>
              </div>
            </div>

            <p className="text-xl sm:text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
              Support the ministry while equipping yourself with <span className="text-white font-semibold">Kingdom authority resources</span>. Every purchase empowers global outreach and equips believers worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Store Content */}
      <div className="container mx-auto px-4 pb-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Command merchandise..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <EnhancedButton
                key={category.id}
                variant={activeCategory === category.id ? "primary" : "outline"}
                onClick={() => handleCategoryChange(category.id)}
                className="whitespace-nowrap border-black text-black hover:bg-black hover:text-white"
              >
                {category.icon}
                <span className="ml-2">{category.name}</span>
                <Badge className="ml-2 bg-black text-white">
                  {category.count}
                </Badge>
              </EnhancedButton>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((product, index) => (
            <EnhancedCard
              key={product.id}
              variant="gradient"
              className="group hover:scale-105 transition-all duration-300 border-black bg-white"
            >
              <EnhancedCardHeader>
                <div className="relative mb-4">
                  <div className="aspect-square bg-black rounded-lg flex items-center justify-center">
                    <Package className="w-24 h-24 text-white" />
                  </div>
                  {product.featured && (
                    <Badge className="absolute top-2 left-2 bg-black text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {product.originalPrice && (
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                      SAVE ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  )}
                </div>

                <div className="flex items-start justify-between mb-3">
                  <EnhancedCardTitle className="text-white text-lg mb-2">{product.title}</EnhancedCardTitle>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-gray-300">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>
                </div>

                <EnhancedCardDescription className="text-gray-400 line-clamp-2 mb-4">
                  {product.description}
                </EnhancedCardDescription>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-400">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {product.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} className="bg-black text-white text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </EnhancedCardHeader>

              <EnhancedCardContent>
                <div className="space-y-4">
                  {/* Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <EnhancedButton
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(product.id)}
                        disabled={!cart[product.id]}
                      >
                        <Minus className="w-4 h-4" />
                      </EnhancedButton>
                      <span className="w-8 text-center text-white font-bold">
                        {cart[product.id] || 0}
                      </span>
                      <EnhancedButton
                        variant="outline"
                        size="sm"
                        onClick={() => addToCart(product.id)}
                      >
                        <Plus className="w-4 h-4" />
                      </EnhancedButton>
                    </div>

                    <EnhancedButton
                      variant="primary"
                      onClick={() => addToCart(product.id)}
                      disabled={!product.inStock}
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      {product.inStock ? (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </>
                      ) : (
                        'Out of Stock'
                      )}
                    </EnhancedButton>
                  </div>
                </div>
              </EnhancedCardContent>
            </EnhancedCard>
          ))}
        </div>

        {/* Cart Summary */}
        {getTotalItems() > 0 && (
          <EnhancedCard variant="gradient" className="bg-white border-black">
            <EnhancedCardHeader>
              <EnhancedCardTitle className="flex items-center gap-3 text-black">
                <ShoppingCart className="w-6 h-6" />
                Shopping Cart ({getTotalItems()} items)
              </EnhancedCardTitle>
            </EnhancedCardHeader>
            <EnhancedCardContent>
              <div className="flex items-center justify-between">
                <div className="text-xl">
                  <span className="text-gray-400">Total: </span>
                  <span className="text-2xl font-bold text-black">${getTotalPrice().toFixed(2)}</span>
                </div>
                <EnhancedButton variant="primary" className="bg-black text-white hover:bg-gray-800">
                  <Truck className="w-4 h-4 mr-2" />
                  Checkout
                </EnhancedButton>
              </div>
            </EnhancedCardContent>
          </EnhancedCard>
        )}
      </div>

      <FloatingActionButton
        icon={<ShoppingCart className="w-6 h-6" />}
        label="View Cart"
        onClick={handleCartClick}
        variant="primary"
        position="bottom-right"
        animate={true}
      />
    </div>
  );
};

export default Merch;
