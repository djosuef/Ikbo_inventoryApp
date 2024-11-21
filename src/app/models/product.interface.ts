import { movement } from "./movement.interface";

export interface product {
    id: number;
    name: string;
    stock: number;
    movements: movement[];
  }