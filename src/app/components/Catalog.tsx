import React, { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, ShoppingCart } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
}

interface CatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ products, onAddToCart }) => {
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);

  console.log(products.map(p => p.category));

  // cargar favoritos
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // toggle favoritos
  const toggleFavorite = (id: number) => {
    let updated;

    if (favorites.includes(id)) {
      updated = favorites.filter(fav => fav !== id);
    } else {
      updated = [...favorites, id];
    }

    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  // búsqueda + filtro favoritos
  const searchedProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (showFavorites ? favorites.includes(p.id) : true)
  );

  // agrupar por categoría
  const groupedProducts = searchedProducts.reduce((acc, product) => {
    const category = product.category || 'Otros';

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Catálogo de Productos
          </h2>
          <p className="text-gray-500 text-sm">
            Explora armazones y lentes de contacto.
          </p>
        </div>

        {/* Buscador + botón favoritos */}
        <div className="flex gap-4 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-cyan-500 text-sm w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`px-4 py-2 rounded-lg text-sm border ${
              showFavorites
                ? 'bg-red-500 text-white border-red-500'
                : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            Favoritos
          </button>
        </div>
      </div>

      {/* Contenido */}
      {Object.keys(groupedProducts).length === 0 ? (
        <p className="text-gray-400 text-center py-10">
          No hay productos disponibles.
        </p>
      ) : (
        Object.entries(groupedProducts).map(([category, items]) => (
          <section key={category} className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-50 relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />

                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`absolute top-3 right-3 p-1.5 rounded-full shadow-sm ${
                        favorites.includes(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4">
                    <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-wider mb-1">
                      {product.brand}
                    </p>

                    <h3 className="font-bold text-gray-900 mb-2 truncate">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">
                        ${product.price.toLocaleString()}
                      </span>

                      <button
                        onClick={() => onAddToCart(product)}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded-lg transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
};