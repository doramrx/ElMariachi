import { OrderContext } from "../OrderContext.js";
import { OrderState } from "../OrderState.js";
import { CancelOrder } from "./CancelOrder.js";
import { ReadyOrder } from "./ReadyOrder.js";

export class OrderBeingPrepared implements OrderState {
    constructor(private context: OrderContext) {}

    getStateName(): string {
        return "[Pedido sendo preparado]";
    }

    transitionState(): void {
        this.context.setState(new ReadyOrder(this.context));
    }

    cancelOrder(): void {
        console.log("Não é possível cancelar o pedido!");
    }
}
