import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Catalog, Product } from './components/Catalog';
import { Services } from './components/Services';
import { Locations } from './components/Locations';
import { Contact } from './components/Contact';
import { Cart } from './components/Cart';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Page = 'home' | 'catalog' | 'services' | 'locations' | 'contact';

interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('productos')
        .select(`
          id,
          nombre,
          precio,
          imagen_url,
          categoria_id
        `)
        .eq('activo', true);

      if (error) {
        console.error('Error trayendo productos:', error);
        return;
      }

      if (!data) return;

      const mappedProducts: Product[] = data.map((item: any) => ({
        id: item.id,
        name: item.nombre,
        brand: 'General',
        price: Number(item.precio),
        image: item.imagen_url,
        category:
          item.categoria_id === 1
            ? 'Armazones'
            : item.categoria_id === 2
            ? 'Lentes de contacto'
            : 'Otros'
      }));

      console.log("MAPPED:", mappedProducts);

      setProducts(mappedProducts);
    }

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);

      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });

    toast.success(`${product.name} agregado`);
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const renderPage = () => {
    switch (currentPage) {

      case 'home':
        return (
          <>
            <Hero onNavigate={(p) => setCurrentPage(p as Page)} />
            <Services />
            <Catalog
              products={products}
              onAddToCart={handleAddToCart}
            />
          </>
        );

      case 'catalog':
        return (
          <Catalog
            products={products}
            onAddToCart={handleAddToCart}
          />
        );

      case 'services':
        return <Services />;

      case 'locations':
        return <Locations />;

      case 'contact':
        return <Contact />;

      default:
        return <Hero onNavigate={(p) => setCurrentPage(p as Page)} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">

      <Toaster position="bottom-center" />

      <Header
        currentPage={currentPage}
        onNavigate={(p) => {
          setCurrentPage(p as Page);
          window.scrollTo(0, 0);
        }}
        cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main>
        {renderPage()}
      </main>

      <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
        <div className="container mx-auto px-4">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

            <div className="col-span-1 md:col-span-2">
              <span className="text-xl font-bold tracking-tight mb-4 block">
                LÚ<span className="text-cyan-500">MINA</span>
              </span>

              <p className="text-gray-500 max-w-sm mb-6">
                Tu óptica de confianza con tecnología de punta y el mejor estilo.
              </p>

              <div className="flex gap-4">
                <Instagram className="w-5 h-5 text-gray-400 cursor-pointer hover:text-cyan-500" />
                <Facebook className="w-5 h-5 text-gray-400 cursor-pointer hover:text-cyan-500" />
                <Twitter className="w-5 h-5 text-gray-400 cursor-pointer hover:text-cyan-500" />
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
            © 2026 Lúmina Óptica.
          </div>

        </div>
      </footer>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

    </div>
  );
}