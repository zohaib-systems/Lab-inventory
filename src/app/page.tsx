"use client";

import { useEffect, useState } from 'react';
import InventoryCard from '../components/InventoryCard';
import AddItemModal from '../components/AddItemModal';
import { getInventoryItems, deductInventoryItem } from '../actions/inventory';
import { Beaker, Plus } from 'lucide-react';
import { InventoryItem } from '../types/inventory';

export default function Home() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = async () => {
    setIsLoading(true);
    const items = await getInventoryItems();
    // Maps the `_id` to `id` for frontend rendering to match InventoryItem interface
    const mappedItems = items.map((item: any) => ({
      ...item,
      id: item._id
    }));
    setInventory(mappedItems);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDeduct = async (id: string) => {
    const result = await deductInventoryItem(id);
    if (result.success) {
      // Optimistically update or re-fetch (we can just re-render from local state for speed)
      setInventory(current => 
        current.map(item => {
          if (item.id === id && item.quantity > 0) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
      );
    } else {
      alert("Failed to deduct: " + result.error);
    }
  };

  return (
    <main className="min-h-screen p-8 md:p-16 lg:p-24 selection:bg-amber-base/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-midnight-light/50 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-amber-base/10 text-amber-base text-sm font-semibold tracking-wide border border-amber-base/20">
              <Beaker size={16} />
              <span>Bio-Containment Level 2</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-light via-amber-base to-amber-dark drop-shadow-sm">
              Microbiology Lab Inventory
            </h1>
            <p className="text-gray-400 max-w-xl text-lg">
              Manage essential reagents, cultures, and media efficiently. Quick scan items to instantly log usage and maintain real-time stock integrity.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-right items-end">
            <div>
              <div className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Total Unique Items</div>
              <div className="text-3xl font-bold text-foreground">
                {isLoading ? '...' : inventory.length}
              </div>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-midnight-light/50 hover:bg-amber-base text-white hover:text-midnight-dark transition-all px-4 py-2 rounded-xl font-bold border border-midnight-light hover:border-amber-base shadow-lg"
            >
              <Plus size={18} />
              Add Stock
            </button>
          </div>
        </header>

        {/* Inventory Grid */}
        {isLoading ? (
          <div className="flex justify-center p-24">
            <div className="w-10 h-10 border-4 border-midnight-light border-t-amber-base rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {inventory.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-400 glass-panel">No items found. Add some stock to get started!</div>
            )}
            {inventory.map(item => (
              <InventoryCard 
                key={item.id} 
                item={item} 
                onDeduct={handleDeduct} 
              />
            ))}
          </div>
        )}

      </div>

      <AddItemModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          fetchItems(); // refresh after modal close
        }} 
      />

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Microbiology Lab Inventory. All rights reserved.</p>
      </footer>
    </main>
  );
}
