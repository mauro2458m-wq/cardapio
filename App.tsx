import React, { useState } from 'react';
import { MenuItem, CartItem } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import AdminView from './views/AdminView';
import MenuView from './views/MenuView';
import { Header } from './components/Header';
import CartModal from './components/CartModal';

// O cardápio inicial agora tem alguns itens de exemplo.
const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Batata Frita (Pequena)',
    description: 'Porção de batata frita crocante.',
    price: 15,
    category: 'PETISCOS',
  },
  {
    id: '2',
    name: 'Batata Frita (Grande)',
    description: 'Porção de batata frita crocante.',
    price: 20,
    category: 'PETISCOS',
  },
  {
    id: '3',
    name: 'Bisteca de Boi',
    description: 'Suculenta bisteca de boi na chapa.',
    price: 25,
    category: 'PETISCOS',
  },
  {
    id: '4',
    name: 'Bisteca com Fritas',
    description: 'Bisteca de boi acompanhada de batatas fritas.',
    price: 40,
    category: 'PETISCOS',
  },
  {
    id: '5',
    name: 'Galinha Guisada',
    description: 'Pedaços de galinha cozidos em molho saboroso.',
    price: 20,
    category: 'PETISCOS',
  },
  {
    id: '6',
    name: 'Chambaril',
    description: 'Prato regional com ossobuco e pirão.',
    price: 25,
    category: 'PETISCOS',
  },
  {
    id: '7',
    name: 'Pastel',
    description: 'Sabores: Pizza, Misto, Frango com Calabresa, Frango com Queijo.',
    price: 7,
    category: 'LANCHES',
  },
  {
    id: '8',
    name: 'Cachorro Quente',
    description: 'Pão, salsicha, molho especial, batata palha e milho.',
    price: 4,
    category: 'LANCHES',
  },
  {
    id: '9',
    name: 'Coxinha',
    description: 'Saborosa coxinha de frango com massa crocante.',
    price: 3,
    category: 'LANCHES',
  },
  {
    id: '10',
    name: 'Cerveja Brahma (Litrão)',
    description: 'Garrafa de 1 litro.',
    price: 12,
    category: 'BEBIDAS',
  },
  {
    id: '11',
    name: 'Cerveja Brahma (Litrinho)',
    description: 'Garrafa de 300ml.',
    price: 5,
    category: 'BEBIDAS',
  },
  {
    id: '12',
    name: 'Cerveja Brahma (600ml)',
    description: 'Garrafa de 600ml.',
    price: 10,
    category: 'BEBIDAS',
  },
  {
    id: '13',
    name: 'Cerveja Brahma Zero',
    description: 'Long neck sem álcool.',
    price: 6,
    category: 'BEBIDAS',
  },
  {
    id: '14',
    name: 'Coca-Cola (Lata)',
    description: 'Lata 350ml.',
    price: 6,
    category: 'REFRIGERANTES',
  },
  {
    id: '15',
    name: 'Fanta (Lata)',
    description: 'Lata 350ml.',
    price: 5,
    category: 'REFRIGERANTES',
  },
  {
    id: '16',
    name: 'Soda (Lata)',
    description: 'Lata 350ml.',
    price: 5,
    category: 'REFRIGERANTES',
  },
  {
    id: '17',
    name: 'Coca-Cola (1 Litro)',
    description: 'Garrafa de 1 litro.',
    price: 8,
    category: 'REFRIGERANTES',
  },
  {
    id: '18',
    name: 'Coca-Cola (2 Litros)',
    description: 'Garrafa de 2 litros.',
    price: 15,
    category: 'REFRIGERANTES',
  },
  {
    id: '19',
    name: 'Guaraná Santa Joana (2 Litros)',
    description: 'Garrafa de 2 litros.',
    price: 7,
    category: 'REFRIGERANTES',
  },
  {
    id: '20',
    name: 'Coca-Cola (1.5 Litro)',
    description: 'Garrafa de 1.5 litro.',
    price: 12,
    category: 'REFRIGERANTES',
  },
  {
    id: '21',
    name: 'Peixe Tilápia Completo',
    description: 'Tilápia frita, acompanha baião, fritas e salada.',
    price: 40,
    category: 'PETISCOS',
  },
  {
    id: '22',
    name: 'Peixe Tilápia Simples',
    description: 'Apenas a tilápia frita.',
    price: 30,
    category: 'PETISCOS',
  },
];


const App: React.FC = () => {
  const [menuItems, setMenuItems] = useLocalStorage<MenuItem[]>('menuItems', initialMenuItems);
  const [isAdminView, setIsAdminView] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
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

  const addToCart = (itemToAdd: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...itemToAdd, quantity: 1 }];
    });
  };

  const updateCartQuantity = (itemId: string, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== itemId);
      }
      return prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
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
          <MenuView 
            menuItems={menuItems} 
            addToCart={addToCart} 
            cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}
      </main>

       {isCartOpen && (
        <CartModal
          cartItems={cart}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateCartQuantity}
          onClearCart={clearCart}
          whatsappNumber={WHATSAPP_NUMBER}
        />
      )}

      <footer className="text-center p-4 text-textSecondary text-sm">
        <p>&copy; {new Date().getFullYear()} Várzea Alegre Futebol Clube. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
