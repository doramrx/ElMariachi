import { OrderContext } from "../OrderContext.js";
import { OrderState } from "../OrderState.js";
import { WaitingPayment } from "./WaitingPayment.js";

export class OrderBeingMade implements OrderState {
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
