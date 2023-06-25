import { Sauce } from "../food/Sauce.js";

export class SauceFactory {
    makeSauce(
        name: string,
        ingredients: string[],
        price: number,
        quantityInMililiters: number,
        imgUrl: string,
        isSpicy = false
    ) {
        return new Sauce(
            name,
            ingredients,
            price,
            quantityInMililiters,
            isSpicy,
            imgUrl
        );
    }
}
