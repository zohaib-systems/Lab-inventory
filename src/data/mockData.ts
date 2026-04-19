import { InventoryItem } from "../types/inventory";

export const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: "INV-001",
    name: "MacConkey Agar Plates",
    category: "Media",
    lotNumber: "LOT-8472A",
    expiryDate: "2026-10-15",
    storageTemperature: "2°C to 8°C",
    quantity: 45,
  },
  {
    id: "INV-002",
    name: "Gram Stain Kit",
    category: "Reagents",
    lotNumber: "GS-4921",
    expiryDate: "2027-02-28",
    storageTemperature: "Room Temp (20-25°C)",
    quantity: 12,
  },
  {
    id: "INV-003",
    name: "E. Coli ATCC 25922",
    category: "Cultures",
    lotNumber: "CULT-112",
    expiryDate: "2028-05-10",
    storageTemperature: "-80°C",
    quantity: 5,
  },
  {
    id: "INV-004",
    name: "Tryptic Soy Broth (TSB)",
    category: "Media",
    lotNumber: "LOT-9932B",
    expiryDate: "2026-12-01",
    storageTemperature: "15°C to 25°C",
    quantity: 30,
  },
  {
    id: "INV-005",
    name: "Fetal Bovine Serum",
    category: "Reagents",
    lotNumber: "FBS-22001",
    expiryDate: "2027-11-15",
    storageTemperature: "-20°C",
    quantity: 18,
  },
];
