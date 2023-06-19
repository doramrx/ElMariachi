import { Food, Sauce } from "./food";

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
        if (this.state instanceof DeliveredOrder) {
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

    public addItem(item: OrderItem): void {
        if (this.state instanceof OrderBeingMade) {
            this.items.push(item);
        } else {
            console.log(
                "Não é possível adicionar mais itens pois o pedido já foi finalizado!"
            );
        }
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

interface OrderState {
    getStateName(): string;
    transitionState(): void;
    cancelOrder(): void;
}

class CancelOrder implements OrderState {
    constructor(private context: OrderContext) {}

    getStateName(): string {
        return "[Pedido cancelado]";
    }

    transitionState(): void {
        console.log("Não há transições possíveis para um pedido cancelado!");
    }

    cancelOrder(): void {
        console.log("O pedido já foi cancelado!");
    }
}

class OrderBeingMade implements OrderState {
    constructor(private context: OrderContext) {}

    getStateName(): string {
        return "[Pedido sendo feito]";
    }

    transitionState(): void {
        this.context.finishOrder();
        this.context.setState(new WaitingPayment(this.context));
    }

    cancelOrder(): void {
        console.log(
            "O pedido ainda não foi feito, portanto não é possível cancelar!"
        );
    }
}

class WaitingPayment implements OrderState {
    constructor(private context: OrderContext) {}

    getStateName(): string {
        return "[Aguardando pagamento]";
    }

    transitionState(): void {
        this.context.setState(new OrderBeingPrepared(this.context));
    }

    cancelOrder(): void {
        this.context.setState(new CancelOrder(this.context));
    }
}

class OrderBeingPrepared implements OrderState {
    constructor(private context: OrderContext) {}

    getStateName(): string {
        return "[Pedido sendo preparado]";
    }

    transitionState(): void {
        this.context.setState(new ReadyOrder(this.context));
    }

    cancelOrder(): void {
        this.context.setState(new CancelOrder(this.context));
    }
}

class ReadyOrder implements OrderState {
    constructor(private context: OrderContext) {}

    getStateName(): string {
        return "[Preparo do pedido finalizado]";
    }

    transitionState(): void {
        this.context.setState(new DeliveringOrder(this.context));
    }

    cancelOrder(): void {
        this.context.setState(new CancelOrder(this.context));
    }
}

class DeliveringOrder implements OrderState {
    constructor(private context: OrderContext) {}

    getStateName(): string {
        return "[O pedido está a caminho]";
    }

    transitionState(): void {
        this.context.setState(new DeliveredOrder(this.context));
        this.context.setFinishDate(new Date());
    }

    cancelOrder(): void {
        this.context.setState(new CancelOrder(this.context));
    }
}

class DeliveredOrder implements OrderState {
    constructor(private context: OrderContext) {}

    getStateName(): string {
        return "[O pedido foi entregue]";
    }

    transitionState(): void {
        console.log("O pedido já foi entregue!");
    }

    cancelOrder(): void {
        console.log(
            "Não é possível cancelar o pedido pois o mesmo já foi entregue!"
        );
    }
}
