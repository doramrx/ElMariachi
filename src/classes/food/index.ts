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

export const foods = {
    burritos: [burrito1, burrito2],
    tacos: [taco1, taco2, taco3],
    nachos: [nacho1, nacho2, nacho3],
    sauces,
};
