import { Food } from "../food/Food.js";

export interface FoodFactory {
    makeFood(
        name: string,
        protein: string,
        ingredients: string[],
        price: number,
        options?: Record<string, string>
    ): Food;
}