import { OrderContext } from "../OrderContext.js";
import { OrderState } from "../OrderState.js";
import { CancelOrder } from "./CancelOrder.js";
import { DeliveringOrder } from "./DeliveringOrder.js";

export class ReadyOrder implements OrderState {
    constructor(private context: OrderContext) {}

    getStateName(): string {
        return "[Preparo do pedido finalizado]";
    }

    transitionState(): void {
        this.context.setState(new DeliveringOrder(this.context));
    }

    cancelOrder(): void {
        console.log("Não é possível cancelar o pedido!");
    }
}
