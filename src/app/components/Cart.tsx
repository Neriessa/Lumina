import React, { useState } from 'react';
import { Drawer } from 'vaul';
import { X, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Product } from './Catalog';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: (Product & { quantity: number })[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const [checkoutState, setCheckoutState] = useState<'idle' | 'loading' | 'success'>('idle');

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    setCheckoutState('loading');

    setTimeout(() => {
      setCheckoutState('success');
    }, 2000);
  };

  return (
    <>
      <Drawer.Root open={isOpen} onOpenChange={onClose} direction="right">
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40 z-[100]" />
          <Drawer.Content className="bg-white flex flex-col rounded-l-2xl h-full w-full sm:w-[400px] fixed bottom-0 right-0 z-[101] outline-none">
            
            <div className="p-6 flex items-center justify-between border-b border-gray-100">
              <h2 className="text-xl font-bold">Carrito</h2>
              <button onClick={onClose} className="p-2">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-gray-500">Tu carrito está vacío.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden">
                        <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                          <button onClick={() => onRemove(item.id)} className="text-gray-400">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-bold">${item.price.toLocaleString()}</span>
                          <div className="flex items-center gap-2">
                            <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-2 border rounded">-</button>
                            <span className="text-sm">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-2 border rounded">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-4 rounded-xl font-bold transition-all"
                >
                  Pagar Ahora
                </button>
              </div>
            )}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      {/* MODAL */}
      {checkoutState !== 'idle' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-80">

            {checkoutState === 'loading' && (
              <>
                <h2 className="text-xl font-semibold mb-2">Procesando pago...</h2>
                <p className="text-gray-500">Por favor espera</p>
              </>
            )}

            {checkoutState === 'success' && (
              <>
                <h2 className="text-xl font-semibold mb-2 text-green-600">
                  Compra exitosa
                </h2>
                <p className="text-gray-500 mb-4">
                  Tu pedido ha sido procesado correctamente
                </p>

                <p className="text-xs text-gray-400">
                  * Esta es una simulación, no se realizó ningún cobro real
                </p>

                <button
                  className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
                  onClick={() => setCheckoutState('idle')}
                >
                  Cerrar
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
};