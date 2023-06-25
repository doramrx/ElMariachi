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
import { DeliveredOrder } from "./classes/order/states/DeliveredOrder";

type MenuOptions = "Burrito" | "Nacho" | "Taco" | "Molho";

function App() {
    const orderContext = useRef(new OrderContext());

    const [currentState, setCurrentState] = useState<OrderState>(
        new OrderBeingMade(orderContext.current)
    );
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [activeMenu, setActiveMenu] = useState<MenuOptions>("Burrito");
    const [menu, setMenu] = useState<Product[]>(wholeMenu.getBurritos());

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

    function handlePayOrder() {
        changeOrderState();
    }

    function handleNewOrder() {
        orderContext.current = new OrderContext();
        setCurrentState(() => new OrderBeingMade(orderContext.current));
        setOrderItems([]);
    }

    useEffect(() => {
        // eslint-disable-next-line prefer-const
        let interval: number | undefined;

        if (
            currentState instanceof OrderBeingMade ||
            currentState instanceof WaitingPayment
        ) {
            return;
        }

        if (currentState instanceof DeliveredOrder) {
            return clearInterval(interval);
        }

        // eslint-disable-next-line prefer-const
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
                    <h2>Pedido</h2>
                    <OrderList
                        items={orderItems}
                        removeOrderItemFn={removeOrderItem}
                    />
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
                    <div id="order-actions-container">
                        {orderContext.current.getState() instanceof
                            OrderBeingMade && (
                            <button
                                onClick={changeOrderState}
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
                        {orderContext.current.getState() instanceof
                            DeliveredOrder && (
                            <button
                                onClick={handleNewOrder}
                                className="new-order"
                            >
                                Novo pedido
                            </button>
                        )}
                    </div>
                    <div id="order-status-container">
                        <strong>Status do pedido:</strong>
                        <span id="order-current-status">
                            {" "}
                            {orderContext.current.getState().getStateName()}
                        </span>
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
            <span>1x</span>
            <span>{props.item.getFoodName()}</span>
            <span>R$ {props.item.getSubTotal()}</span>
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
