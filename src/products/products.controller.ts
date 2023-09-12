import { Controller, Get, Post, Body, Param, Patch, Delete} from "@nestjs/common";

import { Product } from "./product.model";
import { ProductsService } from "./products.service";

// import { Response } from "src/responses/response.model";

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

    @Delete(':id')
    deleteProduct(@Param('id') deleteId: number) : { message: string } {
        return {
            message: this.productsService.delete(deleteId)
        }
    }
}