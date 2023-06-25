import { Burrito } from "../food/Burrito.js";
import { Food } from "../food/Food.js";
import { FoodFactory } from "./FoodFactory.js";

export class BurritoFactory implements FoodFactory {
    makeFood(
        name: string,
        protein: string,
        ingredients: string[],
        price: number,
        imgUrl: string
    ): Food {
        return new Burrito(name, protein, ingredients, price, imgUrl);
    }
}