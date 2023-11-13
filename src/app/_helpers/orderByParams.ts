export class OrderByParams {
    orderBy: string;
    asc: boolean;
    constructor(orderBy: string, asc: boolean) {
        this.orderBy = orderBy;
        this.asc = asc;
    }
}