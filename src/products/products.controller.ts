import { Controller, Get, Post, Body, Param, Patch} from "@nestjs/common";
import { ProductsService } from "./products.service";

import { Product } from "./product.model";
import { title } from "process";


@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get()
    getProducts() : Product[]{
        return this.productsService.index();
    }

    @Get(':id')
    getProductDetails(@Param('id') prodId: number): Product {
        return this.productsService.show(prodId);
    }

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('amount') prodAmount: number,
    ): Product {
        return this.productsService.store(
            prodTitle,
            prodDesc,
            prodAmount
        );
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: number,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('amount') prodAmount: number,
    ): Product {
        return this.productsService.update(
            prodId,
            prodTitle ?? '',
            prodDesc ?? '',
            prodAmount ?? 0
        );
    }
}