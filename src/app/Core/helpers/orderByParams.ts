export class OrderByParams {
    orderBy: "Назва" | "Дата" | "Рейтинг";
    asc: boolean;
    constructor(orderBy: "Назва" | "Дата" | "Рейтинг", asc: boolean) {
        this.orderBy = orderBy;
        this.asc = asc;
    }
}