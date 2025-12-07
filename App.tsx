
import React, { useState } from 'react';
import { MenuItem } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import AdminView from './views/AdminView';
import MenuView from './views/MenuView';
import { Header } from './components/Header';

const initialMenuItems: MenuItem[] = [
  { id: '1', name: 'Cerveja Gelada (600ml)', description: 'Sua cerveja favorita, trincando!', price: 12.00, category: 'Bebidas' },
  { id: '2', name: 'Porção de Batata Frita', description: 'Crocante por fora, macia por dentro. Acompanha maionese da casa.', price: 25.00, category: 'Porções' },
  { id: '3', name: 'Espetinho de Carne', description: 'Delicioso espetinho de alcatra na brasa.', price: 10.00, category: 'Espetinhos' },
  { id: '4', name: 'Refrigerante (Lata)', description: 'Coca-Cola, Guaraná, Fanta.', price: 6.00, category: 'Bebidas' },
  { id: '5', name: 'Calabresa Acebolada', description: 'Porção generosa de calabresa fatiada com cebola.', price: 30.00, category: 'Porções' },
];

const App: React.FC = () => {
  const [menuItems, setMenuItems] = useLocalStorage<MenuItem[]>('menuItems', initialMenuItems);
  const [isAdminView, setIsAdminView] = useState(false);
  const WHATSAPP_NUMBER = '5581998371952';

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = { ...item, id: new Date().toISOString() };
    setMenuItems(prevItems => [...prevItems, newItem]);
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(prevItems => prevItems.map(item => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background font-sans text-textPrimary">
      <Header isAdminView={isAdminView} setIsAdminView={setIsAdminView} />
      <main className="p-4 md:p-8 max-w-4xl mx-auto">
        {isAdminView ? (
          <AdminView
            menuItems={menuItems}
            addMenuItem={addMenuItem}
            updateMenuItem={updateMenuItem}
            deleteMenuItem={deleteMenuItem}
          />
        ) : (
          <MenuView menuItems={menuItems} whatsappNumber={WHATSAPP_NUMBER} />
        )}
      </main>
      <footer className="text-center p-4 text-textSecondary text-sm">
        <p>&copy; {new Date().getFullYear()} Várzea Alegre Futebol Clube. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
