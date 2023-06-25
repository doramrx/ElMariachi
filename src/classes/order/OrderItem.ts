import { Product } from "../food/Product.js";

export class OrderItem {
    constructor(
        private food: Product,
        private amount: number,
        private unitPrice: number,
        private note?: string
    ) {}

    getSubTotal(): number {
        return this.amount * this.unitPrice;
    }

    getFoodName(): string {
        return this.food.getName();
    }

    toString(): string {
        return `OrderItem {
            \t  food: ${this.food.getName()},
            \t  amount: ${this.amount},
            \t  unitPrice: ${this.unitPrice},
            \t  subTotal: ${this.getSubTotal()},
            ${
                this.note
                    ? `\t  note: ${this.note}`
                    : '\t  note: "Sem observações"'
            }
        \t}`;
    }
}
