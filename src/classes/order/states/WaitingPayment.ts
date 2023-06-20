import { OrderContext } from "../OrderContext.js";
import { OrderState } from "../OrderState.js";
import { CancelOrder } from "./CancelOrder.js";
import { OrderBeingPrepared } from "./OrderBeingPrepared.js";

export class WaitingPayment implements OrderState {
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
