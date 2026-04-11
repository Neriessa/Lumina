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

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  currentPage,
  cartCount,
  onOpenCart
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks: { id: Page; label: string }[] = [
    { id: 'home', label: 'Inicio' },
    { id: 'catalog', label: 'Armazones' },
    { id: 'services', label: 'Servicios' },
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border-b border-white/20 dark:border-zinc-800">
      
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="/LogoDos.png"
            alt="Lúmina"
            className="h-9 w-auto object-contain group-hover:scale-105 transition"
          />
          
        </div>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-6 relative">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="relative px-2 py-1 text-sm font-medium transition-colors text-gray-600 dark:text-gray-300 hover:text-cyan-500"
            >
              {link.label}

              {currentPage === link.id && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-cyan-500 rounded-full"
                />
              )}
            </button>
          ))}
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">

          {/* Search */}
          <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition hidden md:block">
            <Search className="w-5 h-5" />
          </button>

          {/* Cart */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
          >
            <ShoppingCart className="w-5 h-5" />

            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-[4px] bg-cyan-500 text-white text-[10px] flex items-center justify-center rounded-full shadow"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {/* Mobile menu btn */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            />

            <motion.div
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] bg-white dark:bg-zinc-900 z-[70] p-6 shadow-2xl border-l border-gray-100 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  Menú
                </span>

                <button onClick={() => setIsMenuOpen(false)} className="p-2">
                  <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
              </div>

              <div className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      onNavigate(link.id);
                      setIsMenuOpen(false);
                    }}
                    className={`text-lg text-left transition ${
                      currentPage === link.id
                        ? 'text-cyan-500 font-semibold'
                        : 'text-gray-800 dark:text-gray-200'
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