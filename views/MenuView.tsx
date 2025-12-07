import React from 'react';
import { MenuItem } from '../types';
import { ImageIcon, AddIcon, CartIcon } from '../components/icons';

interface MenuViewProps {
  menuItems: MenuItem[];
  addToCart: (item: MenuItem) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const MenuView: React.FC<MenuViewProps> = ({ menuItems, addToCart, cartCount, onOpenCart }) => {
  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="space-y-8 pb-20">
      {Object.entries(groupedMenu).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-3xl font-bold text-primary mb-4 pb-2 border-b-2 border-secondary">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-surface rounded-lg shadow-lg overflow-hidden flex transform transition-transform hover:scale-105 hover:shadow-2xl">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-24 h-full object-cover md:w-32"/>
                ) : (
                  <div className="w-24 md:w-32 h-full bg-gray-100 flex items-center justify-center text-gray-300 flex-shrink-0">
                    <ImageIcon />
                  </div>
                )}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl font-bold text-textPrimary">{item.name}</h3>
                    <p className="text-textSecondary mt-1 text-sm">{item.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-lg font-extrabold text-primary">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                     <button
                      onClick={() => addToCart(item)}
                      className="bg-primary text-white rounded-full p-2 hover:bg-green-700 transition-colors"
                      aria-label={`Adicionar ${item.name} ao carrinho`}
                    >
                      <AddIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
       {cartCount > 0 && (
         <button
            onClick={onOpenCart}
            className="fixed bottom-6 right-6 bg-primary hover:bg-green-700 text-white font-bold py-4 px-5 rounded-full shadow-lg flex items-center space-x-3 z-10 transition-transform transform hover:scale-110"
            aria-label="Abrir carrinho de compras"
        >
            <CartIcon />
            <span className="hidden sm:inline">Ver Carrinho</span>
            <span className="absolute -top-2 -right-2 bg-secondary text-primary rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">{cartCount}</span>
        </button>
      )}
    </div>
  );
};

export default MenuView;
