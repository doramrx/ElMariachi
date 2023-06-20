import { Food } from "../food/Food.js";
import { Taco } from "../food/Taco.js";
import { FoodFactory } from "./FoodFactory.js";

export class TacoFactory implements FoodFactory {
    makeFood(
        name: string,
        protein: string,
        ingredients: string[],
        price: number
    ): Food {
        return new Taco(name, protein, ingredients, price);
    }
}