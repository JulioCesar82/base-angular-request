
export class ResponseBase<T> {
    constructor(public message: string, public body?: T | T[]) {
    }
}