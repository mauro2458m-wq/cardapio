
import React, { useState } from 'react';
import { MenuItem } from '../types';
import { MenuForm } from '../components/MenuForm';
import { AddIcon, EditIcon, DeleteIcon, ImageIcon } from '../components/icons';

interface AdminViewProps {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
}

const AdminView: React.FC<AdminViewProps> = ({ menuItems, addMenuItem, updateMenuItem, deleteMenuItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const handleOpenModal = (item: MenuItem | null = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSave = (item: Omit<MenuItem, 'id'> | MenuItem) => {
    if ('id' in item) {
      updateMenuItem(item);
    } else {
      addMenuItem(item);
    }
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-primary">Gerenciar Cardápio</h2>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2 bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          <AddIcon />
          <span>Adicionar Item</span>
        </button>
      </div>
      <div className="bg-surface p-4 sm:p-6 rounded-lg shadow-md">
        {menuItems.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {menuItems.map((item) => (
              <li key={item.id} className="py-4 flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4 min-w-0">
                  {item.imageUrl ? (
                     <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0">
                        <ImageIcon />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-lg font-semibold text-textPrimary truncate">{item.name}</p>
                    <p className="text-sm text-textSecondary truncate">{item.description}</p>
                    <p className="text-md font-bold text-primary">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
                <div className="flex space-x-2 flex-shrink-0">
                  <button onClick={() => handleOpenModal(item)} className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition">
                    <EditIcon />
                  </button>
                  <button onClick={() => deleteMenuItem(item.id)} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition">
                    <DeleteIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-textSecondary py-8">Nenhum item no cardápio. Adicione o primeiro!</p>
        )}
      </div>
      {isModalOpen && <MenuForm item={editingItem} onSave={handleSave} onClose={handleCloseModal} />}
    </div>
  );
};

export default AdminView;
