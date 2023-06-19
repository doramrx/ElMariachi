import {
    TacoFactory,
    BurritoFactory,
    NachoFactory,
    SauceFactory,
    Product,
} from "./classes/food";
import { MenuComposite, MenuItem } from "./classes/menu";
import { OrderContext, OrderItem } from "./classes/order";

const sauceFactory = new SauceFactory();
const tacoFactory = new TacoFactory();
const burritoFactory = new BurritoFactory();
const nachoFactory = new NachoFactory();

const sauces = [
    sauceFactory.makeSauce(
        "Guacamole",
        ["Abacate", "Tomate", "cebola", "alho", "Pimenta"],
        10,
        180
    ),
    sauceFactory.makeSauce(
        "Guacamole",
        ["Abacate", "Tomate", "Cebola", "Alho", "Pimenta"],
        5,
        50
    ),
    sauceFactory.makeSauce(
        "Pico de gallo",
        ["Tomate", "Cebola", "Alho", "Pimenta"],
        5,
        50
    ),
    sauceFactory.makeSauce(
        "Salsa Roja",
        ["Tomate", "Cebola", "Alho", "Pimenta serrana", "Coentro"],
        5,
        50
    ),
    sauceFactory.makeSauce(
        "Ranchero Sauce",
        [
            "Tomate",
            "Cebola",
            "Alho",
            "Pimenta",
            "Jalapeno",
            "Coentro",
            "Suco de limão",
            "Pimenta Chipotle",
        ],
        5,
        50
    ),
];

const taco1 = tacoFactory.makeFood(
    "Taco al Pastor",
    "Carne de porco",
    ["Abacaxi", "Cebola", "Coentro"],
    36
);

const taco2 = tacoFactory.makeFood(
    "Taco de Barbacoa",
    "Carne de cordeiro",
    ["Cebola", "Coentro"],
    40
);

const taco3 = tacoFactory.makeFood(
    "Taco de Birria",
    "Carne de cabra",
    ["Cebola", "Coentro", "Queijo Chedder"],
    40
);

const burrito1 = burritoFactory.makeFood(
    "Burrito California",
    "Carne assada",
    ["Batata frita", "Queijo mussarela", "Creme de abacate"],
    38
);

const burrito2 = burritoFactory.makeFood(
    "Hot Chicken Burrito",
    "Frango empanado",
    ["Tortilha de trigo", "Repolho Sweet Chilli", "Creme de abacate"],
    38
);

const nacho1 = nachoFactory.makeFood(
    "Nacho Chilli Beans",
    "Carne moída",
    ["Tortilla Chips de milho", "Feijão", "Queijo Cheddar"],
    69,
    { nachoType: "Grande" }
);

const nacho2 = nachoFactory.makeFood(
    "Nacho Spicy Vegetariano",
    "Proteína da soja",
    ["Tortilla Chips de milho", "Queijo Cheddar"],
    69,
    { nachoType: "Grande" }
);

const nacho3 = nachoFactory.makeFood(
    "Nacho de Costelinha",
    "Costela",
    ["Tortilla Chips de milho", "Queijo Cheddar"],
    79,
    { nachoType: "Grande" }
);

// const order = new OrderContext();
// const orderItem01 = new OrderItem(burrito1, sauces[0], 1, burrito1.getPrice());
// const orderItem02 = new OrderItem(burrito2, sauces[2], 3, burrito1.getPrice());

// order.addItem(orderItem01);
// order.addItem(orderItem02);

// console.log(order.toString());
// order.transitionState();
// console.log(order.toString());
// order.transitionState();
// console.log(order.toString());
// order.transitionState();
// console.log(order.toString());
// order.transitionState();
// console.log(order.toString());
// order.transitionState();
// console.log(order.toString());
// order.transitionState();

const burritoMenuItems = [new MenuItem(burrito1), new MenuItem(burrito2)];
const burritoMenu = new MenuComposite();
burritoMenu.add(...burritoMenuItems);

const tacoMenuItems = [
    new MenuItem(taco1),
    new MenuItem(taco2),
    new MenuItem(taco3),
];
const tacoMenu = new MenuComposite();
tacoMenu.add(...tacoMenuItems);

const nachoMenuItems = [
    new MenuItem(nacho1),
    new MenuItem(nacho2),
    new MenuItem(nacho3),
];
const nachoMenu = new MenuComposite();
nachoMenu.add(...nachoMenuItems);

const sauceMenuItems = sauces.map((sauce) => {
    return new MenuItem(sauce);
});
const sauceMenu = new MenuComposite();
sauceMenu.add(...sauceMenuItems);

const wholeMenu = new MenuComposite();
wholeMenu.add(burritoMenu);
wholeMenu.add(tacoMenu);
wholeMenu.add(nachoMenu);
wholeMenu.add(sauceMenu);

console.log(wholeMenu.getItem());
