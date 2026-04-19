"use server";

import connectToDatabase from '../lib/mongodb';
import InventoryItem from '../models/InventoryItem';
import { revalidatePath } from 'next/cache';

export async function getInventoryItems() {
  await connectToDatabase();
  const items = await InventoryItem.find({}).sort({ createdAt: -1 });
  return JSON.parse(JSON.stringify(items));
}

export async function addInventoryItem(data: any) {
  try {
    await connectToDatabase();
    const newItem = await InventoryItem.create(data);
    revalidatePath('/');
    return { success: true, item: JSON.parse(JSON.stringify(newItem)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deductInventoryItem(id: string) {
  try {
    await connectToDatabase();
    // Use an atomic update to avoid race conditions
    const item = await InventoryItem.findOneAndUpdate(
      { _id: id, quantity: { $gt: 0 } },
      { $inc: { quantity: -1 } },
      { new: true }
    );
    
    if (!item) {
      return { success: false, error: "Item not found or out of stock" };
    }
    
    revalidatePath('/');
    return { success: true, item: JSON.parse(JSON.stringify(item)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
