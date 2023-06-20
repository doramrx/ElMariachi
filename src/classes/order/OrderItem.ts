import { Food } from "../food/Food.js";
import { Sauce } from "../food/Sauce.js";

export class OrderItem {
    constructor(
        private food: Food,
        private sauce: Sauce,
        private amount: number,
        private unitPrice: number,
        private note?: string
    ) {}

    getSubTotal(): number {
        return this.amount * this.unitPrice;
    }

    toString(): string {
        return `OrderItem {
            \t  food: ${this.food.getName()},
            \t  sauce: ${this.sauce.getName()},
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
