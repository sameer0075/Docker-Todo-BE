export class TaskResponse {
    readonly id: number;
    readonly title: string;

    constructor(
        id: number,
        title: string,
    ) {
        this.id = id;
        this.title = title;
    }
}