export type ProductType = "Milk" | "Curd" | "Yogurt" | "Cheese" | "Paneer" | "Butter";

export const PRODUCT_TYPES: ProductType[] = [
  "Milk",
  "Curd",
  "Yogurt",
  "Cheese",
  "Paneer",
  "Butter"
];

export interface Dairy {
id: string;
name: string;
type: ProductType;
price: number;
image: string;
lactoseFree?: boolean;
fatPercentage:number;
quantity?: number;
}