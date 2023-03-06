import { LogInPage } from 'app/pages/LogInPage';
import { render } from '@testing-library/react';
import * as ReactDOM from 'react-dom';

describe('LogInPage component test', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(<LogInPage />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });

  it('renders the initial document correctly', () => {
    render(<LogInPage />);
    const element = document.getElementsByClassName('MuiBox-root css-i9gxme');
    expect(element).toBeInTheDocument();
  });
});
