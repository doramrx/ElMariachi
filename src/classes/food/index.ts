import { BurritoFactory } from "../factory/BurritoFactory.js";
import { NachoFactory } from "../factory/NachoFactory.js";
import { SauceFactory } from "../factory/SauceFactory.js";
import { TacoFactory } from "../factory/TacoFactory.js";

const sauceFactory = new SauceFactory();
const tacoFactory = new TacoFactory();
const burritoFactory = new BurritoFactory();
const nachoFactory = new NachoFactory();

const sauces = [
    sauceFactory.makeSauce(
        "Chipotle",
        ["Abacate", "Tomate", "cebola", "alho", "Pimenta"],
        10,
        180,
        "molho1.png"
    ),
    sauceFactory.makeSauce(
        "Guacamole",
        ["Abacate", "Tomate", "Cebola", "Alho", "Pimenta"],
        5,
        50,
        "molho2.png"
    ),
    sauceFactory.makeSauce(
        "Jalapeño",
        ["Tomate", "Cebola", "Alho", "Pimenta"],
        5,
        50,
        "molho3.png"
    ),
];

const taco1 = tacoFactory.makeFood(
    "Taco al Pastor",
    "Carne de porco",
    ["Abacaxi", "Cebola", "Coentro"],
    36,
    "taco1.png"
);

const taco2 = tacoFactory.makeFood(
    "Taco de Barbacoa",
    "Carne de cordeiro",
    ["Cebola", "Coentro"],
    40,
    "taco2.png"
);

const taco3 = tacoFactory.makeFood(
    "Taco de Birria",
    "Carne de cabra",
    ["Cebola", "Coentro", "Queijo Chedder"],
    40,
    "taco3.png"
);

const burrito1 = burritoFactory.makeFood(
    "Burrito California",
    "Carne assada",
    ["Batata frita", "Queijo mussarela", "Creme de abacate"],
    26,
    "burrito1.png"
);

const burrito2 = burritoFactory.makeFood(
    "Hot Chicken Burrito",
    "Frango empanado",
    ["Tortilha de trigo", "Repolho Sweet Chilli", "Creme de abacate"],
    38,
    "burrito2.png"
);

const burrito3 = burritoFactory.makeFood(
    "Burrito Tradicional",
    "Filé mignon",
    ["Tortilha de trigo", "Repolho Sweet Chilli", "Creme de abacate"],
    40,
    "burrito3.png"
);

const burrito4 = burritoFactory.makeFood(
    "Burrito Tradicional 2",
    "Filé mignon",
    ["Tortilha de trigo", "Repolho Sweet Chilli", "Creme de abacate"],
    50,
    "burrito1.png"
);

const nacho1 = nachoFactory.makeFood(
    "Nacho Chilli Beans",
    "Carne moída",
    ["Tortilla Chips de milho", "Feijão", "Queijo Cheddar"],
    69,
    "nacho1.png",
    { nachoType: "Grande" }
);

const nacho2 = nachoFactory.makeFood(
    "Nacho Spicy Vegetariano",
    "Proteína da soja",
    ["Tortilla Chips de milho", "Queijo Cheddar"],
    69,
    "nacho2.png",
    { nachoType: "Grande" }
);

const nacho3 = nachoFactory.makeFood(
    "Nacho Tradicional",
    "Costela",
    ["Tortilla Chips de milho", "Queijo Cheddar"],
    79,
    "nacho3.png",
    { nachoType: "Grande" }
);

export const foods = {
    burritos: [
        burrito1,
        burrito2,
        burrito3,
        burrito4,
        burrito1,
        burrito2,
        burrito3,
        burrito4,
    ],
    tacos: [taco1, taco2, taco3],
    nachos: [nacho1, nacho2, nacho3],
    sauces,
};
