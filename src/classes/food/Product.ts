export abstract class Product {
    constructor(
        protected name: string,
        protected price: number,
        protected ingredients: string[],
        protected imgUrl: string
    ) {}

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getIngredients(): string[] {
        return this.ingredients;
    }

    getImgUrl(): string {
        return this.imgUrl;
    }
}
