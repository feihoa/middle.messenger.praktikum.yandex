import EventBus from "./EventBus";
import { nanoid } from 'nanoid';
import Handlebars from "handlebars";


class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  public id = nanoid(6);
  //может быть любым
  //eslint-disable-next-line
  protected props: any;
  protected refs: Record<string, Block> = {};
  public children: Record<string, Block>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;

  //может быть любым
  //eslint-disable-next-line
  constructor(propsWithChildren: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  //eslint-disable-next-line
  _getChildrenAndProps(childrenAndProps: Record<string, any>) {
    //eslint-disable-next-line
    const props: Record<string, any> = {};
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  _addEvents() {
    const { events = {} } = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  protected init() {
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  //eslint-disable-next-line
  private _componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  //eslint-disable-next-line
  protected componentDidUpdate(oldProps: Record<string, any>, newProps: Record<string, any>) {
    console.log(oldProps, newProps);
    return true;
  }

  //eslint-disable-next-line
  setProps = (nextProps: Record<string, any>,) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const fragment = this.compile(this.render(), this.props);

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
    this._componentDidMount();
  }
  // множество доступных типов
  //eslint-disable-next-line
  private compile(template: string, context: any) {
    const contextAndStubs = { ...context, __refs: this.refs };

    const html = Handlebars.compile(template)(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    //eslint-disable-next-line
    contextAndStubs.__children?.forEach(({ embed }: any) => {
      embed(temp.content);
    });

    return temp.content;
  }

  protected render(): string {
    return '';
  }

  getContent() {
    return this.element;
  }

  //eslint-disable-next-line
  _makePropsProxy(props: any) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldTarget = { ...target }

        target[prop] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }

  hasWrongValues(formData: { [key: string]: string }) {
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key) && formData[key] === '') {
        return true;
      }
    }
    return false;
  }
}

export default Block;
