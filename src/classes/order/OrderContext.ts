import { Product } from "../food/Product.js";
import { OrderItem } from "./OrderItem.js";
import { OrderState } from "./OrderState.js";
import { OrderDelivered } from "./states/OrderDelivered.js";
import { OrderBeingMade } from "./states/OrderBeingMade.js";

export class OrderContext {
    private state: OrderState;
    private items: OrderItem[];
    private total: number;
    private createdAt?: Date;
    private finishAt?: Date;

    constructor() {
        this.items = [];
        this.total = 0;
        this.state = new OrderBeingMade(this);
    }

    public setState(state: OrderState): void {
        this.state = state;
    }

    public getState(): OrderState {
        return this.state;
    }

    public setFinishDate(finishAt: Date): void {
        if (this.state instanceof OrderDelivered) {
            this.finishAt = finishAt;
        }
    }

    public getStateName(): string {
        return this.state.getStateName();
    }

    public cancelOrder(): void {
        this.state.cancelOrder();
    }

    public transitionState(): void {
        this.state.transitionState();
    }

    public addItem(
        food: Product,
        amount: number,
        unitPrice: number,
        note = ""
    ): void {
        if (this.state instanceof OrderBeingMade) {
            this.items.push(new OrderItem(food, amount, unitPrice, note));
        } else {
            console.log(
                "Não é possível adicionar mais itens pois o pedido já foi finalizado!"
            );
        }
    }

    public removeItem(item: OrderItem): void {
        const index = this.items.indexOf(item);

        if (index !== -1) {
            this.items.splice(index, 1);
        }
    }

    public getItems(): OrderItem[] {
        return this.items;
    }

    public getTotalPrice(): number {
        return this.items.reduce((total, orderItem) => {
            return total + orderItem.getSubTotal();
        }, 0);
    }

    public finishOrder(): void {
        this.total = this.items.reduce((total, item) => {
            return total + item.getSubTotal();
        }, 0);

        this.createdAt = new Date();
    }

    private formatDate(date: Date): string {
        return date.toLocaleString("pt-BR", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        });
    }

    public getCreatedAt(): Date | undefined {
        if (this.createdAt) {
            return this.createdAt;
        }
    }

    public getFinishedAt(): Date | undefined {
        if (this.finishAt) {
            return this.finishAt;
        }
    }

    public toString(): string {
        return `Order {
            state: ${this.state.getStateName()},
            total: ${this.total},
            createdAt: ${this.createdAt && this.formatDate(this.createdAt)},
            finishAt: ${this.finishAt && this.formatDate(this.finishAt)},
            items: [
                ${this.items.map((item) => item.toString()).join("\n\t\t")}
            ]
        }`;
    }
}
