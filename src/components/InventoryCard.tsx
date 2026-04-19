import { InventoryItem } from '../types/inventory';
import QuickDeduct from './QuickDeduct';
import { FlaskConical, ThermometerSnowflake, Calendar, Hash, Package } from 'lucide-react';

interface InventoryCardProps {
  item: InventoryItem;
  onDeduct: (id: string) => void;
}

export default function InventoryCard({ item, onDeduct }: InventoryCardProps) {
  const isLowStock = item.quantity <= 10;
  const isOutOfStock = item.quantity === 0;

  return (
    <div className="glass-panel p-6 flex flex-col gap-5 hover:border-amber-base/40 transition-colors duration-300 group">
      
      {/* Header section */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-lg bg-midnight-light/50 text-amber-base">
            <FlaskConical size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-amber-light transition-colors">{item.name}</h3>
            <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-midnight-light text-gray-300 mt-1 inline-block">
              {item.category}
            </span>
          </div>
        </div>
        
        {/* Quantity Badge */}
        <div className={`flex flex-col items-center px-3 py-2 rounded-xl border ${isOutOfStock ? 'bg-red-500/10 border-red-500/30 text-red-400' : isLowStock ? 'bg-amber-base/10 border-amber-base/30 text-amber-base' : 'bg-midnight-light/30 border-midnight-light text-foreground'}`}>
          <span className="text-2xl font-bold leading-none">{item.quantity}</span>
          <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">Stock</span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-400 mt-2 flex-grow">
        <div className="flex items-center gap-2">
          <Hash size={16} className="text-amber-base/70" />
          <span className="truncate" title={item.lotNumber}>{item.lotNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-amber-base/70" />
          <span>{item.expiryDate}</span>
        </div>
        <div className="flex items-center gap-2 col-span-2">
          <ThermometerSnowflake size={16} className="text-amber-base/70" />
          <span>{item.storageTemperature}</span>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-midnight-light to-transparent my-1" />

      {/* Action Footer */}
      <div className="flex justify-between items-center mt-auto">
        <QuickDeduct onDeduct={() => onDeduct(item.id)} disabled={isOutOfStock} />
      </div>

    </div>
  );
}
