import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { ProductStorage } from "./product.storage";
// import { Response } from "src/responses/response.model";

import * as fs from 'fs';


@Injectable()
export class ProductsService {
    private readonly productsJsonPath = './json/products.json';
    private readonly timelogJsonPath = './json/timelog.json';

    products: Product[];

    private nextID: number;

    constructor() {
        let timeLog = <string[]>JSON.parse(fs.readFileSync(this.timelogJsonPath, 'utf-8'));
        timeLog.push(new Date().toString());
        this.writeJson(this.timelogJsonPath, timeLog);
    }

    // Data Storage 
    private read() {
        let productsData = <ProductStorage>this.readJson(this.productsJsonPath);
        
        this.nextID     = productsData.nextID;
        this.products   = productsData.list;
    }

    private save() {
        let productsData: ProductStorage = {
            nextID: this.nextID,
            list: this.products
        };

        this.writeJson(this.productsJsonPath, productsData);

        this.read();
    }

    // File operations on the JSON File
    private readJson(filepath: string) {
        return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    }

    private writeJson(filepath: string, fileContent: any) {
        fs.writeFileSync(
            filepath,
            JSON.stringify(fileContent)
        );
    }

    // Helper Functions

    private find (searchID: number): [number, Product] {
        let index =  this.products.findIndex(prod => prod.id == searchID);

        if (index === -1)
            throw new NotFoundException(`${searchID} - Invalid Product ID`);

        return [index, this.products[index]];
    }

    // Core functions

    index(): Product[] {
        this.read();
        return [...this.products];
    }
    

    show(searchID: number): Product | null {
        this.read();
        return this.find(searchID)[1];
    }
    

    store(
        title: string,
        description: string,
        price: number
    ) : Product {

        this.read();
        
        const id = this.nextID++;

        const newProduct = new Product(
            id,
            title,
            description,
            price
        );

        this.products.push(newProduct);

        this.save();
        
        return newProduct;
    }


    update(
        id: number,
        title: string,
        description: string,
        price: number
    ): Product {

        this.read();

        const [index, cProduct] = this.find(id);
     
        if (title.length)
            cProduct.title = title;

        if (description.length)
            cProduct.description = description;

        if (price > 0)
            cProduct.price = price;

        cProduct.updatedAt = new Date().toString();

        this.products[index] = cProduct;
        
        this.save();

        return this.products[index]; 
    }

    delete(id: number): string {
        this.read();

        const [index, dProduct] = this.find(id);

        this.products.splice(index, 1);

        this.save();
        
        return `Successfully deleted - ${dProduct.title} - ${dProduct.description} - ${dProduct.price}`;
    }

    // index(): Response {
    //     this.read();
    //     return new Response(this.pTime, `${this.products.length} product(s) fetched`, [...this.products]);
    // }
    
    // show(searchID: number): Response {
    //     this.read();
    //     return new Response(this.pTime, 'Success', this.find(searchID)[1]);
    // }
    
    // store(
    //     title: string,
    //     description: string,
    //     price: number
    // ) : Response {
    //     this.read();

    //     const id = this.nextID++;

    //     const newProduct = new Product(
    //         id,
    //         title,
    //         description,
    //         price
    //     );

    //     this.products.push(newProduct);

    //     this.save();
        
    //     return new Response(this.pTime, 'Success', newProduct);
    // }

    // update(
    //     id: number,
    //     title: string,
    //     description: string,
    //     price: number
    // ): Response {

    //     this.read();

    //     const [index, cProduct] = this.find(id);
     
    //     if (title.length)
    //         cProduct.title = title;

    //     if (description.length)
    //         cProduct.description = description;

    //     if (price > 0)
    //         cProduct.price = price;

    //     this.products[index] = cProduct;
        
    //     this.save();

    //     return new Response(this.pTime, `Updated - ${cProduct.title}`, this.products[index]); 
    // }


    // delete(id: number): Response {
    //     this.read();
        
    //     const [index, dProduct] = this.find(id);

    //     this.products.splice(index, 1);

    //     this.save();
        
    //     return new Response(this.pTime, `Successfully deleted - ${dProduct.title} - ${dProduct.description} - ${dProduct.price}`, null);
    // }
}