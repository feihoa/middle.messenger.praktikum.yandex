import EventBus from './EventBus';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import { sanitize } from './sanitizeHtml';


export interface IPropsBase {
  events: Record<string, (e: KeyboardEvent) => void>;
}

//может быть любым
//eslint-disable-next-line
class Block<T extends Record<string, any>> {

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render'
  };

  public id = nanoid(6);
  protected props: T;
  protected refs: Record<string, Block<T>> = {};
  public children: Record<string, Block<T>>;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;

  public get name(): string | undefined {
    return this.props?.name;
  }

  constructor(propsWithChildren: T = {} as T) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    this._init();
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildrenAndProps(childrenAndProps: T = {} as T) {
    const props: T = {} as T;
    const children: Record<string, Block<T>> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key as keyof T] = value;
      }
    });

    return { props, children };
  }

  private _addEvents() {
    const { events } = this.props as { events?: T };

    if (!events) {
      return;
    }

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName as keyof T]);
    });
  }

  private _removeEvents() {
    const { events } = this.props as { events?: T };

    if (!events) {
      return;
    }
    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName as keyof T]);
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
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

  _componentWillUnmount() {
    this.componentWillUnmount();
  }

  componentWillUnmount() {}

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  private _componentDidUpdate() {
    if (this.componentDidUpdate()) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  protected componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: Record<string, unknown>,) => {
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
    this._removeEvents();
    this._addEvents();
    this._componentDidMount();
  }

  private compile(template: string, context: T) {
    const contextAndStubs = { ...context, __refs: this.refs };

    const html = Handlebars.compile(template)(contextAndStubs);

    const temp = document.createElement('template');
    temp.innerHTML = sanitize(html);

    contextAndStubs.__children?.forEach(({ embed }: { embed: (content: DocumentFragment) => void })  => {
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

  _makePropsProxy(props: T) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof T];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldTarget = { ...target }

        target[prop as keyof T] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      }
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this._componentDidMount();
    this.getContent()!.style.display = 'flex';
  }

  hide() {
    this._componentWillUnmount();
    this.getContent()!.style.display = 'none';
  }

}

export default Block;
