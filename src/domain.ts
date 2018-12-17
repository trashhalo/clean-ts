export interface Counter {
  readonly value: number;
  increment(): Counter;
}

class CounterEntity implements Counter{
  constructor(public readonly value: number) {}

  static default(): Counter {
    return new CounterEntity(0);
  }

  increment(): Counter {
    return new CounterEntity(this.value + 1);
  }
}

export interface PeristencePort {
  save(counter: Counter): Promise<void>;
  load(): Promise<Counter | undefined>;
}

export class MaxValueError extends Error {
  constructor() {
    super("counter cannot be incremented");
  }
}

export class IncrementUseCase {
  constructor(private readonly persistence: PeristencePort) {}

  async execute(counter: Counter): Promise<Counter> {
    if (counter.value >= 20) {
      throw new MaxValueError();
    }
    const c = counter.increment();
    await this.persistence.save(c);
    return c;
  }
}

export class LoadUseCase {
  constructor(private readonly persistence: PeristencePort) {}
  async execute(): Promise<Counter> {
    const c = await this.persistence.load();
    if (c === undefined) {
      return CounterEntity.default();
    }
    return c;
  }
}
