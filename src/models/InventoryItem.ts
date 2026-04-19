import mongoose from 'mongoose';

export interface IInventoryItem extends mongoose.Document {
  name: string;
  category: string;
  lotNumber: string;
  expiryDate: string;
  storageTemperature: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const InventoryItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  lotNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  storageTemperature: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
}, {
  timestamps: true 
});

export default mongoose.models.InventoryItem || mongoose.model<IInventoryItem>('InventoryItem', InventoryItemSchema);
