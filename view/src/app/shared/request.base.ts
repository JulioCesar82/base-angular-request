export class RequestBase<T> {
  constructor(public message: string, public body?: T | T[]) {}
}
