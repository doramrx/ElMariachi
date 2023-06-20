import { Sauce } from "../food/Sauce.js";

export class SauceFactory {
    makeSauce(
        name: string,
        ingredients: string[],
        price: number,
        quantityInMililiters: number,
        isSpicy: boolean = false
    ) {
        return new Sauce(
            name,
            ingredients,
            price,
            quantityInMililiters,
            isSpicy
        );
    }
}