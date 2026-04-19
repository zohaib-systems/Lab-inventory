import { useState } from 'react';
import { X, Plus, Package } from 'lucide-react';
import { addInventoryItem } from '../actions/inventory';

export default function AddItemModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      lotNumber: formData.get('lotNumber') as string,
      expiryDate: formData.get('expiryDate') as string,
      storageTemperature: formData.get('storageTemperature') as string,
      quantity: parseInt(formData.get('quantity') as string, 10)
    };

    const result = await addInventoryItem(data);
    
    setIsSubmitting(false);
    if (result.success) {
      onClose();
    } else {
      alert("Error adding item: " + result.error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-dark/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-midnight-base border border-midnight-light/50 rounded-2xl shadow-2xl p-6 w-full max-w-md relative animate-in slide-in-from-bottom-4 duration-300">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-base/10 text-amber-base rounded-lg">
            <Package size={24} />
          </div>
          <h2 className="text-xl font-bold text-white">Add New Stock</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-gray-400 mb-1 font-medium">Reagent / Item Name</label>
            <input name="name" required className="w-full bg-midnight-dark/50 border border-midnight-light rounded-lg px-3 py-2 text-white outline-none focus:border-amber-base focus:ring-1 focus:ring-amber-base transition-all" placeholder="e.g. MacConkey Agar Plates" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-1 font-medium">Category</label>
              <select name="category" required className="w-full bg-midnight-dark/50 border border-midnight-light rounded-lg px-3 py-2 text-white outline-none focus:border-amber-base">
                <option value="Media">Media</option>
                <option value="Reagents">Reagents</option>
                <option value="Cultures">Cultures</option>
                <option value="Consumables">Consumables</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 mb-1 font-medium">Initial Quantity</label>
              <input name="quantity" type="number" min="0" required className="w-full bg-midnight-dark/50 border border-midnight-light rounded-lg px-3 py-2 text-white outline-none focus:border-amber-base" defaultValue="10" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-1 font-medium">Lot Number</label>
              <input name="lotNumber" required className="w-full bg-midnight-dark/50 border border-midnight-light rounded-lg px-3 py-2 text-white outline-none focus:border-amber-base" placeholder="LOT-..." />
            </div>
            <div>
              <label className="block text-gray-400 mb-1 font-medium">Expiry Date</label>
              <input name="expiryDate" type="date" required className="w-full bg-midnight-dark/50 border border-midnight-light rounded-lg px-3 py-2 text-white outline-none focus:border-amber-base [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
            </div>
          </div>

          <div>
            <label className="block text-gray-400 mb-1 font-medium">Storage Temperature</label>
            <input name="storageTemperature" required className="w-full bg-midnight-dark/50 border border-midnight-light rounded-lg px-3 py-2 text-white outline-none focus:border-amber-base" placeholder="e.g. 2°C to 8°C" />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full mt-6 flex items-center justify-center gap-2 bg-amber-base text-midnight-dark font-bold py-3 rounded-xl hover:bg-amber-light active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : <><Plus size={18} /> Add to Inventory</>}
          </button>
        </form>

      </div>
    </div>
  );
}
