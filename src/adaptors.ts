import { Counter, PeristencePort } from "./domain";

export class PersistenceAdaptor implements PeristencePort {
  private counter: Counter | undefined;

  async save(counter: Counter): Promise<void> {
    this.counter = counter;
  }
  async load(): Promise<Counter | undefined> {
    return this.counter;
  }
}
