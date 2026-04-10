import React from 'react';
import { ShoppingCart, Menu, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Page = 'home' | 'catalog' | 'services' | 'locations' | 'contact';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, cartCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: 'Inicio' },
    { id: 'catalog', label: 'Armazones' },
    { id: 'services', label: 'Servicios' },
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <Search className="w-5 h-5 text-white" strokeWidth={3} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            LÚ<span className="text-cyan-500">MINA</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-sm font-medium transition-colors hover:text-cyan-600 ${
                currentPage === link.id ? 'text-cyan-600' : 'text-gray-600'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors md:block hidden">
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenCart}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-cyan-500 text-white text-[10px] flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <div
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[60]"
            />

            <motion.div
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ duration: 0.25 }}
              className="fixed right-0 top-0 bottom-0 w-[280px] bg-white z-[70] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold">Menú</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      onNavigate(link.id);
                      setIsMenuOpen(false);
                    }}
                    className={`text-lg font-medium text-left ${
                      currentPage === link.id ? 'text-cyan-600' : 'text-gray-900'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
