export class Topic<DataType> {
  private subscribers: Array<(data: DataType) => void> = [];

  constructor() {
    this.subscribers = [];
  }

  public subscribe(subscriber: (data: DataType) => void): void {
    this.subscribers.push(subscriber);
  }

  public unsubscribe(subscriberToRemove: (data: DataType) => void): void {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber !== subscriberToRemove
    );
  }

  public publish(data: DataType): void {
    this.subscribers.forEach((subscriber) => subscriber(data));
  }
}
