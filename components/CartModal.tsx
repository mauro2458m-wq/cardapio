import React, { useState } from 'react';
import { CartItem } from '../types';
import { CloseIcon, MinusIcon, AddIcon, DeleteIcon, WhatsAppIcon } from './icons';

interface CartModalProps {
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onClearCart: () => void;
  whatsappNumber: string;
}

const CartModal: React.FC<CartModalProps> = ({ cartItems, onClose, onUpdateQuantity, onClearCart, whatsappNumber }) => {
  const [customerName, setCustomerName] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSendOrder = () => {
    if (!customerName || !customerLocation) {
        alert('Por favor, preencha seu nome e local.');
        return;
    }

    let message = `Olá! Gostaria de fazer um pedido.\n\n`;
    message += `*Cliente:* ${customerName}\n`;
    message += `*Local:* ${customerLocation}\n\n`;
    message += `*--- MEU PEDIDO ---*\n`;

    cartItems.forEach(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2).replace('.', ',');
        message += `• ${item.quantity}x ${item.name} - R$ ${itemTotal}\n`;
    });

    message += `\n*Total do Pedido: R$ ${total.toFixed(2).replace('.', ',')}*`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-primary">Seu Pedido</h2>
          <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100">
            <CloseIcon />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-grow">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 py-12">Seu carrinho está vazio.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <li key={item.id} className="py-4 flex items-center justify-between">
                  <div className="flex-grow pr-4">
                    <p className="font-semibold text-textPrimary">{item.name}</p>
                    <p className="text-sm text-primary font-bold">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1.5 border rounded-full hover:bg-gray-100 transition-colors text-gray-600">
                      {item.quantity === 1 ? <DeleteIcon /> : <MinusIcon />}
                    </button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                     <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1.5 border rounded-full hover:bg-gray-100 transition-colors text-gray-600">
                      <AddIcon />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
            <div className="p-6 border-t bg-gray-50 rounded-b-lg">
                <div className="space-y-4 mb-4">
                    <div>
                        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Seu Nome</label>
                        <input type="text" name="customerName" id="customerName" placeholder="Digite seu nome completo" value={customerName} onChange={e => setCustomerName(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                     <div>
                        <label htmlFor="customerLocation" className="block text-sm font-medium text-gray-700">Local (Ex: Mesa 5)</label>
                        <input type="text" name="customerLocation" id="customerLocation" placeholder="Onde você está?" value={customerLocation} onChange={e => setCustomerLocation(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-textPrimary">Total:</span>
                    <span className="text-xl font-extrabold text-primary">R$ {total.toFixed(2).replace('.', ',')}</span>
                </div>
                <button
                    onClick={handleSendOrder}
                    disabled={!customerName || !customerLocation}
                    className="w-full flex justify-center items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                    <WhatsAppIcon />
                    <span>Finalizar Pedido</span>
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
