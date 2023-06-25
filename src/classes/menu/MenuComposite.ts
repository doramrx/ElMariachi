import { Burrito } from "../food/Burrito.js";
import { Nacho } from "../food/Nacho.js";
import { Product } from "../food/Product.js";
import { Sauce } from "../food/Sauce.js";
import { Taco } from "../food/Taco.js";
import { FoodComponent } from "./FoodComponent.js";

export class MenuComposite implements FoodComponent {
    private children: FoodComponent[] = [];

    getItem(): Product[] {
        return this.children.flatMap((child) => child.getItem());
    }

    getBurritos(): Burrito[] {
        return this.getItem().filter(
            (food) => food instanceof Burrito
        ) as Burrito[];
    }

    getTacos(): Taco[] {
        return this.getItem().filter((food) => food instanceof Taco) as Taco[];
    }

    getNachos(): Nacho[] {
        return this.getItem().filter(
            (food) => food instanceof Nacho
        ) as Nacho[];
    }

    getSauces(): Sauce[] {
        return this.getItem().filter(
            (food) => food instanceof Sauce
        ) as Sauce[];
    }

    add(...components: FoodComponent[]): void {
        this.children.push(...components);
    }

    remove(component: FoodComponent): void {
        const index = this.children.indexOf(component);

        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }
}
