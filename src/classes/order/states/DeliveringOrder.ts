import { OrderContext } from "../OrderContext.js";
import { OrderState } from "../OrderState.js";
import { CancelOrder } from "./CancelOrder.js";
import { OrderDelivered } from "./OrderDelivered.js";

export class DeliveringOrder implements OrderState {
    constructor(private context: OrderContext) {}

    getStateName(): string {
        return "[O pedido está a caminho]";
    }

    transitionState(): void {
        this.context.setState(new OrderDelivered(this.context));
        this.context.setFinishDate(new Date());
    }

    cancelOrder(): void {
        console.log("Não é possível cancelar o pedido!");
    }
}
