export class Product {

    createdAt: string;
    updatedAt: string;

    constructor(
        public id: number,
        public title: string,
        public description: string,
        public price: number
    ) {
        let now = new Date().toString();
        this.createdAt = now;
        this.updatedAt = now;
    }
}
