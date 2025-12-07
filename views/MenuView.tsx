
import React from 'react';
import { MenuItem } from '../types';
import { WhatsAppIcon, ImageIcon } from '../components/icons';

interface MenuViewProps {
  menuItems: MenuItem[];
  whatsappNumber: string;
}

const MenuView: React.FC<MenuViewProps> = ({ menuItems, whatsappNumber }) => {
  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const whatsappMessage = encodeURIComponent('Olá! Gostaria de fazer um pedido do cardápio do Várzea Alegre FC.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="space-y-8">
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
                  <p className="text-lg font-extrabold text-primary mt-2">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
       <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-5 rounded-full shadow-lg flex items-center space-x-3 z-10 transition-transform transform hover:scale-110"
      >
        <WhatsAppIcon />
        <span className="hidden sm:inline">Pedir no WhatsApp</span>
      </a>
    </div>
  );
};

export default MenuView;
