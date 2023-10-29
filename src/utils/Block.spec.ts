import { expect } from 'chai';
import Block from "./Block";
import sinon from 'sinon';


interface Props {
  text?: string,
  buttonText?: string;
  events?: Record<string, () => void>
}

describe('Block', () => {
  let PageBlock: typeof Block<Props>;

  before(() => {
    class Page extends Block<Props> {
      constructor(props: Props) {
        super(props);
      }

      protected render(): string {
        return `<div>
          <span id="test-text">{{text}}</span>
          <button id="test-text-button">{{buttonText}}</button>
        </div>`
      }
    }

    PageBlock = Page;
  })

  it('Должен создать компонент с пропсами, переданными в конструктор', () => {
    const text = 'Тестовый текст';
    const buttonText = 'Тестовый текст кнопки';
    const pageComponent = new PageBlock({ text, buttonText });

    const spanText = pageComponent.element?.querySelector('#test-text')?.textContent;
    const btnText = pageComponent.element?.querySelector('#test-text-button')?.textContent;

    expect(spanText).to.be.eq(text);
    expect(btnText).to.be.eq(buttonText);
  })

  it('Должен менять значение пропсов', () => {
    const text = 'Тестовый текст';
    const newText = 'Новый тестовый текст';

    const pageComponent = new PageBlock({ text });
    pageComponent.setProps({ text: newText });

    const spanText = pageComponent.element?.querySelector('#test-text')?.textContent;

    expect(spanText).to.be.eq(newText);
  })

  it('Должен устанавливать событие на элемент', () => {
    const handlerStub = sinon.stub();

    const pageComponent = new PageBlock({
      events: {
        click: handlerStub,
      }
    });

    const event = new MouseEvent('click');
    pageComponent.element?.dispatchEvent(event);

    expect(handlerStub.calledOnce).to.be.true;
  })

  it('Должен вызываться componentDidMount', () => {
    const pageComponent = new PageBlock();
    const spyCDM = sinon.spy(pageComponent, 'componentDidMount');

    pageComponent.show();

    expect(spyCDM.calledOnce).to.be.true;
  })

  it('Должен вызываться componentWillUnmount', () => {
    const pageComponent = new PageBlock();
    const spyCDM = sinon.spy(pageComponent, 'componentWillUnmount');

    pageComponent.hide();

    expect(spyCDM.calledOnce).to.be.true;
  })

})
