import { MOCK_INVENTORY } from '../data/mockData';
import connectToDatabase from '../lib/mongodb';
import InventoryItem from '../models/InventoryItem';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function seed() {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB.');
    
    await InventoryItem.deleteMany({});
    console.log('Cleared existing inventory.');

    // Remove the `id` field from mock data to let MongoDB generate `_id` automatically
    const mappedItems = MOCK_INVENTORY.map(({ id, ...rest }) => rest);

    await InventoryItem.insertMany(mappedItems);
    console.log('Successfully seeded database with mock inventory.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
