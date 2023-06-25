import { useEffect, useRef, useState } from "react";

import "./App.css";
import LogoImg from "./assets/logotipo.svg";

import { wholeMenu } from "./classes/menu/index";
import { Product } from "./classes/food/Product";
import { OrderContext } from "./classes/order/OrderContext";
import { OrderState } from "./classes/order/OrderState";
import { OrderItem } from "./classes/order/OrderItem";
import { WaitingPayment } from "./classes/order/states/WaitingPayment";
import { OrderBeingMade } from "./classes/order/states/OrderBeingMade";
import { OrderDelivered } from "./classes/order/states/OrderDelivered";
import { CancelOrder } from "./classes/order/states/CancelOrder";

type MenuOptions = "Burrito" | "Nacho" | "Taco" | "Molho";

function App() {
    const orderContext = useRef(new OrderContext());

    const [currentState, setCurrentState] = useState<OrderState>(
        new OrderBeingMade(orderContext.current)
    );
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [activeMenu, setActiveMenu] = useState<MenuOptions>("Burrito");
    const [menu, setMenu] = useState<Product[]>(wholeMenu.getBurritos());
    const [isCancelButtonVisible, setIsCancelButtonVisible] = useState(false);

    function changeMenu(menuOption: MenuOptions, menu: Product[]) {
        setActiveMenu(menuOption);
        setMenu(menu);
    }

    function addOrderItem(food: Product) {
        orderContext.current.addItem(food, 1, food.getPrice());
        setOrderItems([...orderContext.current.getItems()]);
    }

    function removeOrderItem(orderItem: OrderItem) {
        orderContext.current.removeItem(orderItem);
        setOrderItems([...orderContext.current.getItems()]);
    }

    function changeOrderState() {
        orderContext.current.transitionState();
        setCurrentState(() => orderContext.current.getState());
    }

    function handleFinishOrder() {
        changeOrderState();
        setIsCancelButtonVisible(true);
    }

    function handlePayOrder() {
        changeOrderState();
        setIsCancelButtonVisible(false);
    }

    function handleNewOrder() {
        orderContext.current = new OrderContext();
        setCurrentState(() => new OrderBeingMade(orderContext.current));
        setOrderItems([]);
    }

    function handleCancelOrder() {
        orderContext.current.cancelOrder();
        setCurrentState(() => {
            const nextState = orderContext.current.getState();
            return nextState;
        });
        setIsCancelButtonVisible(false);
    }

    useEffect(() => {
        // eslint-disable-next-line prefer-const
        let interval: number | undefined;

        if (
            currentState instanceof OrderBeingMade ||
            currentState instanceof WaitingPayment ||
            currentState instanceof CancelOrder
        ) {
            return;
        }

        if (currentState instanceof OrderDelivered) {
            return clearInterval(interval);
        }

        interval = setInterval(() => {
            orderContext.current.transitionState();

            setCurrentState(() => {
                const nextState = orderContext.current.getState();
                return nextState;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [currentState]);

    return (
        <div id="page">
            <header>
                <img
                    src={LogoImg}
                    alt="Logotipo"
                />
            </header>

            <main>
                <div id="col-a">
                    <h1>Produtos</h1>
                    <MenuOptions
                        activeMenu={activeMenu}
                        changeActiveMenuFn={changeMenu}
                    />
                    <Menu
                        items={menu}
                        addToOrderListFn={addOrderItem}
                    />
                </div>
                <div id="col-b">
                    <div id="order-status-container">
                        <strong>Status do pedido:</strong>
                        <span id="order-current-status">
                            {" "}
                            {orderContext.current.getState().getStateName()}
                        </span>
                    </div>
                    <div id="order-info-container">
                        {orderContext.current.getCreatedAt() && (
                            <div>
                                <b>Feito em:</b>
                                <span>
                                    {orderContext.current
                                        .getCreatedAt()
                                        ?.toLocaleString("pt-BR")}
                                </span>
                            </div>
                        )}
                        {orderContext.current.getFinishedAt() && (
                            <div>
                                <b>Finalizado em:</b>
                                <span>
                                    {orderContext.current
                                        .getFinishedAt()
                                        ?.toLocaleString("pt-BR")}
                                </span>
                            </div>
                        )}
                    </div>
                    <h2>Pedido</h2>
                    <OrderList
                        items={orderItems}
                        removeOrderItemFn={removeOrderItem}
                    />
                    {orderItems.length > 0 && (
                        <p>
                            <span>Total</span>
                            <span id="total">
                                R${" "}
                                {orderContext.current
                                    .getTotalPrice()
                                    .toFixed(2)
                                    .replace(".", ",")}
                            </span>
                        </p>
                    )}
                    <div id="order-actions-container">
                        {orderContext.current.getState() instanceof
                            OrderBeingMade &&
                            orderItems.length > 0 && (
                                <button
                                    onClick={handleFinishOrder}
                                    className="finish-order"
                                >
                                    Finalizar Pedido
                                </button>
                            )}
                        {orderContext.current.getState() instanceof
                            WaitingPayment && (
                            <button
                                onClick={handlePayOrder}
                                className="pay-order"
                            >
                                Realizar Pagamento
                            </button>
                        )}
                        {(orderContext.current.getState() instanceof
                            OrderDelivered ||
                            orderContext.current.getState() instanceof
                                CancelOrder) && (
                            <button
                                onClick={handleNewOrder}
                                className="new-order"
                            >
                                Novo pedido
                            </button>
                        )}
                        {isCancelButtonVisible && (
                            <button
                                onClick={handleCancelOrder}
                                className="cancel-order"
                            >
                                Cancelar pedido
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

function OrderList(props: {
    items: OrderItem[];
    removeOrderItemFn: (orderItem: OrderItem) => void;
}) {
    return (
        <ul>
            {props.items.map((item, index) => {
                return (
                    <OrderItemComponent
                        key={index}
                        item={item}
                        removeOrderItemFn={props.removeOrderItemFn}
                    />
                );
            })}
        </ul>
    );
}

function OrderItemComponent(props: {
    item: OrderItem;
    removeOrderItemFn: (orderItem: OrderItem) => void;
}) {
    return (
        <li>
            <img
                src="icon.png"
                alt="Icone"
            />
            <span>{props.item.getFoodName()}</span>
            <span id="order-item-price">
                R$ {props.item.getSubTotal().toFixed(2).replace(".", ",")}
            </span>
            <button onClick={() => props.removeOrderItemFn(props.item)}>
                Remover
            </button>
        </li>
    );
}

function MenuOptions(props: {
    activeMenu: MenuOptions;
    changeActiveMenuFn: (menuOption: MenuOptions, menu: Product[]) => void;
}) {
    return (
        <section id="menu-options">
            <button
                className={props.activeMenu === "Burrito" ? "active" : ""}
                onClick={() =>
                    props.changeActiveMenuFn("Burrito", wholeMenu.getBurritos())
                }
            >
                Burritos
            </button>
            <button
                className={props.activeMenu === "Taco" ? "active" : ""}
                onClick={() =>
                    props.changeActiveMenuFn("Taco", wholeMenu.getTacos())
                }
            >
                Tacos
            </button>
            <button
                className={props.activeMenu === "Nacho" ? "active" : ""}
                onClick={() =>
                    props.changeActiveMenuFn("Nacho", wholeMenu.getNachos())
                }
            >
                Nachos
            </button>
            <button
                className={props.activeMenu === "Molho" ? "active" : ""}
                onClick={() =>
                    props.changeActiveMenuFn("Molho", wholeMenu.getSauces())
                }
            >
                Molhos
            </button>
        </section>
    );
}

function Menu(props: {
    items: Product[];
    addToOrderListFn: (food: Product) => void;
}) {
    return (
        <ul>
            {props.items.map((item, index) => {
                return (
                    <MenuItem
                        key={index}
                        food={item}
                        addToOrderListFn={props.addToOrderListFn}
                    />
                );
            })}
        </ul>
    );
}

function MenuItem(props: {
    food: Product;
    addToOrderListFn: (food: Product) => void;
}) {
    return (
        <li id="menu-item">
            <img
                src={props.food.getImgUrl()}
                alt="Food"
            />
            <div>
                <strong>{props.food.getName()}</strong>
                <ul id="menu-item-ingredients">
                    {props.food.getIngredients().map((ingredient) => {
                        return <li>+ {ingredient}</li>;
                    })}
                </ul>
                <span id="menu-item-price">
                    R$ {props.food.getPrice().toFixed(2).replace(".", ",")}
                </span>
                <button onClick={() => props.addToOrderListFn(props.food)}>
                    Adicionar
                </button>
            </div>
        </li>
    );
}

export default App;
