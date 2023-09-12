export class Response {
    
    constructor(
        private pTime: string,
        private message: string,
        private data: any
    ) {}

    get() {
        return {
            pTime: this.pTime,
            message: this.message,
            data: this.data
        };
    }
}