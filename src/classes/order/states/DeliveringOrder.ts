import { OrderContext } from "../OrderContext.js";
import { OrderState } from "../OrderState.js";
import { CancelOrder } from "./CancelOrder.js";
import { DeliveredOrder } from "./DeliveredOrder.js";

export class DeliveringOrder implements OrderState {
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
