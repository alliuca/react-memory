import { renderComponent, expect } from './../test_helper';
import App from './../../src/components/App';

describe('App', () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  it('should render something', () => {
    expect(component).to.exist;
  });

  it('should show a heading', () => {
    expect(component.find('h2')).to.exist;
  })
})