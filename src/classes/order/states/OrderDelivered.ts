import { OrderContext } from "../OrderContext.js";
import { OrderState } from "../OrderState.js";

export class OrderDelivered implements OrderState {
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