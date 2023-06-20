import { MenuComposite } from "./MenuComposite.js";
import { MenuItem } from "./MenuItem.js";
import { foods } from "../food/index.js";

const burritoMenuItems = foods.burritos.map((burrito) => new MenuItem(burrito));
const burritoMenu = new MenuComposite();
burritoMenu.add(...burritoMenuItems);

const tacoMenuItems = foods.tacos.map((taco) => new MenuItem(taco));
const tacoMenu = new MenuComposite();
tacoMenu.add(...tacoMenuItems);

const nachoMenuItems = foods.nachos.map((nacho) => new MenuItem(nacho));
const nachoMenu = new MenuComposite();
nachoMenu.add(...nachoMenuItems);

const sauceMenuItems = foods.sauces.map((sauce) => new MenuItem(sauce));
const sauceMenu = new MenuComposite();
sauceMenu.add(...sauceMenuItems);

export const wholeMenu = new MenuComposite();
wholeMenu.add(burritoMenu);
wholeMenu.add(tacoMenu);
wholeMenu.add(nachoMenu);
wholeMenu.add(sauceMenu);
