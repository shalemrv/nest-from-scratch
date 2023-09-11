import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

import * as fs from 'fs';


@Injectable()
export class ProductsService {
    private readonly productsJsonPath = './json/products.json';

    products: Product[] = [];

    constructor() {
        this.products = JSON.parse(fs.readFileSync(this.productsJsonPath, 'utf-8'));

    }

    private find (searchID: number): Product {
        let found =  this.products.find(prod => prod.id == searchID);

        if (!found)
            throw new NotFoundException('Invalid Product ID');

        return found;
    }

    index(): Product[] {
        return [...this.products];
    }

    show(searchID: number): Product | null {
        return this.find(searchID);
    }

    store(
        title: string,
        description: string,
        price: number
    ) : Product {
    
        const id = this.products.length + 1;

        const newProduct = new Product(
            id,
            title,
            description,
            price
        );

        this.products.push(newProduct);

        this.updateJsonFile();
        
        return newProduct;
    }

    updateJsonFile() {
        fs.writeFileSync(
            this.productsJsonPath,
            JSON.stringify(this.products)
        );
    }

    update(
        id: number,
        title: string,
        description: string,
        price: number
    ): Product {

        // TODO - Restructure find function to get index instead of the product itself

        // const cProduct = this.find(id);
     
        // if (title.length)
        //     cProduct.title = title;

        // if (description.length)
        //     cProduct.description = description;

        // if (price > 0)
        //     cProduct.price = price;

        // this.updateToJson(cProduct);

        // return cProduct;

        return this.products[0]; 
    }
}