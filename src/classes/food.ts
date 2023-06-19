class Extra {
    constructor(private description: string, private price: number) {}
}

export abstract class Product {
    constructor(
        protected name: string,
        protected price: number,
        protected ingredients: string[]
    ) {}
}

export class Sauce extends Product {
    constructor(
        name: string,
        ingredients: string[],
        price: number,
        private quantityInMililiters: number,
        private isSpicy: boolean
    ) {
        super(name, price, ingredients);
    }

    getName(): string {
        return super.name;
    }
}

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

class Burrito extends Food {}

class Taco extends Food {}

enum NachoTypes {
    Simples = "Simples",
    Grande = "Grande",
}

class Nacho extends Food {
    constructor(
        name: string,
        protein: string,
        ingredients: string[],
        price: number,
        private type: NachoTypes
    ) {
        super(name, protein, ingredients, price);
    }
}

interface FoodFactory {
    makeFood(
        name: string,
        protein: string,
        ingredients: string[],
        price: number,
        options?: Record<string, string>
    ): Food;
}

export class BurritoFactory implements FoodFactory {
    makeFood(
        name: string,
        protein: string,
        ingredients: string[],
        price: number
    ): Food {
        return new Burrito(name, protein, ingredients, price);
    }
}

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
