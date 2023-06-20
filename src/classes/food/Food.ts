import { Product } from "./Product.js";

export abstract class Food extends Product {
    constructor(
        name: string,
        private protein: string,
        ingredients: string[],
        price: number
    ) {
        super(name, price, ingredients);
    }

    getName(): string {
        return super.name;
    }

    getPrice(): number {
        return super.price;
    }

    addIngredient(ingredient: string) {
        super.ingredients.push(ingredient);
    }

    removeIngredient(index: number) {
        super.ingredients.splice(index, 1);
    }
}
