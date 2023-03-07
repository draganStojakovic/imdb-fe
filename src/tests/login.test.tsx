import { LogInPage } from 'app/pages/LogInPage';
import * as ReactDOM from 'react-dom';

describe('LogInPage component test', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

  let container: HTMLElement;

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
    const inputs = container.querySelectorAll('input');
    expect(inputs).toHaveLength(2);
  });
});
