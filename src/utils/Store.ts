import EventBus from './EventBus';


export enum StoreEvents {
  Updated = 'updated',
}

type Indexed<T = unknown> = {
  [key in string]: T;
};

class Store extends EventBus {
  private state: Indexed = {} as Indexed;

  public getState() {
    return this.state;
  }

  public set(nextState: Partial<Indexed>) {
    const prevState = { ...this.state };

    this.state = { ...this.state, ...nextState };

    this.emit(StoreEvents.Updated, prevState, nextState);
  }

  public clear() {
    this.state = {};
  }

}

export const store = new Store();

