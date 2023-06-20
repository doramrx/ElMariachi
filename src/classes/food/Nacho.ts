import { Food } from "./Food.js";

export enum NachoTypes {
    Simples = "Simples",
    Grande = "Grande",
}

export class Nacho extends Food {
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