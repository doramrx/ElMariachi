import { OrderContext } from "../OrderContext.js";
import { OrderState } from "../OrderState.js";

export class CancelOrder implements OrderState {
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
