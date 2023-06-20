import { Product } from "../food/Product.js";
import { FoodComponent } from "./FoodComponent.js";

export class MenuComposite implements FoodComponent {
    private children: FoodComponent[] = [];

    getItem(): Product[] {
        return this.children.flatMap((child) => child.getItem());
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
