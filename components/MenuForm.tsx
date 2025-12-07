
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { MenuItem } from '../types';

interface MenuFormProps {
  item: MenuItem | null;
  onSave: (item: Omit<MenuItem, 'id'> | MenuItem) => void;
  onClose: () => void;
}

export const MenuForm: React.FC<MenuFormProps> = ({ item, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    description: item?.description || '',
    price: item?.price || 0,
    category: item?.category || '',
    imageUrl: item?.imageUrl || undefined,
  });
  const [imagePreview, setImagePreview] = useState<string | undefined>(item?.imageUrl);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
  };
  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData(prev => ({ ...prev, imageUrl: result }));
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    if (item) {
      onSave({ ...item, ...formData });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-full overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{item ? 'Editar Item' : 'Adicionar Item'}</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"></textarea>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preço (R$)</label>
                  <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required step="0.01" min="0" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                </div>
                <div className="flex-1">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoria</label>
                  <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                </div>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700">Imagem (Opcional)</label>
                  <div className="mt-1 flex items-center space-x-4">
                    {imagePreview && <img src={imagePreview} alt="Preview" className="w-16 h-16 rounded-md object-cover"/>}
                    <input type="file" id="imageUrl" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-primary hover:file:bg-green-100"/>
                  </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancelar</button>
            <button type="submit" disabled={isProcessing} className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50">{isProcessing ? 'Salvando...' : 'Salvar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
