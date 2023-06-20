export abstract class Product {
    constructor(
        protected name: string,
        protected price: number,
        protected ingredients: string[]
    ) {}
}