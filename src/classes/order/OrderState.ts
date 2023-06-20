export interface OrderState {
    getStateName(): string;
    transitionState(): void;
    cancelOrder(): void;
}