import { expect } from 'chai';
import { Router } from './Router';
import Block from './Block';


describe('Router', () => {
  let TestBlock: typeof Block<Record<string, unknown>>;
  let TestBlock1: typeof Block<Record<string, unknown>>;

  before(() => {

    const div = document.createElement('div');
    div.setAttribute('id', 'app');
    document.body.appendChild(div);

    class Test extends Block<Record<string, unknown>> {

      protected render(): string {
        return `<div id="test-block">
          <span>Тестовая страница</span>
        </div>`
      }
    }

    class Test1 extends Block<Record<string, unknown>> {

      protected render(): string {
        return `<div id="test-block1">
          <span>Тестовая страница 1</span>
        </div>`
      }
    }

    TestBlock = Test;
    TestBlock1 = Test1;
  })

  it('use должен добавить запись в routes', () => {

    const router = new Router('app');
    const path = '/test';

    router.use(path, TestBlock);
    expect(router.routes.length).to.be.eq(1);
  })

  it('start должен отрисовать блок TestBlock при переходе на /test с помощью go', () => {

    const router = new Router('app');
    const path = '/test';

    router.use(path, TestBlock);
    router.start();

    router.go(path);

    expect(document.getElementById('test-block')).not.to.be.null;
  })

  it('при отрисовке страницы TestBlock1, TestBlock должен остаться в DOM c display=none', () => {

    const router = new Router('app');
    const path = '/test';
    const path1 = '/test-1';

    router.use(path, TestBlock);
    router.use(path1, TestBlock1);
    router.start();

    router.go(path);
    router.go(path1);

    expect(document.getElementById('test-block1')).not.to.be.null;
    expect(document.getElementById('test-block')?.style.display).to.be.eq('none');

  })

  it('back должен перейти на предыдущий роут и отрисовать TestBlock', done => {

    const router = new Router('app');
    const path = '/test';
    const path1 = '/test-1';

    let backCalled = false;
    let doneCalled = false;

    router.use(path, TestBlock);
    router.use(path1, TestBlock1);
    router.start();

    router.go(path);
    router.go(path1);
    router.back();

    window.addEventListener('popstate', () => {
      if (backCalled && !doneCalled) {
        expect(document.getElementById('test-block')?.style.display).to.be.eq('flex');
        expect(document.getElementById('test-block1')?.style.display).to.be.eq('none');
        done();
        doneCalled = true;
      }
    })

    backCalled = true;

  })

  it('getRoute должен найти и вернуть роут по переданноиму pathname', () => {

    const router = new Router('app');
    const path = '/test';
    const path1 = '/test-1';

    router.use(path, TestBlock);
    router.use(path1, TestBlock1);

    expect(router.getRoute(path)).to.be.deep.eq(router.routes.find(route => route.match(path)));
  })

})
