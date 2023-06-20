import { Food } from "../food/Food.js";
import { Nacho, NachoTypes } from "../food/Nacho.js";
import { FoodFactory } from "./FoodFactory.js";

export class NachoFactory implements FoodFactory {
    makeFood(
        name: string,
        protein: string,
        ingredients: string[],
        price: number,
        additionals?: Record<string, string>
    ): Food {
        const nachoType =
            (additionals?.nachoType as NachoTypes) || NachoTypes.Simples;

        return new Nacho(name, protein, ingredients, price, nachoType);
    }
}
