import React from 'react';
import {
  render,
  fireEvent,
  wait,
  prettyDOM,
  cleanup,
  waitForElement,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import App from './App';

import { I18nProvider } from './components/I18n';
import en from './locales/en.json';
import fr from './locales/fr.json';

function useCounter() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setCount(c => c + 1), 500);
    return () => clearTimeout(timer);
  });

  return count;
}

function Count() {
  return useCounter();
}

// you can't just call the Hook! You must use it
// in a component and test that component!
describe('Hook', () => {
  it('should return a count', async () => {
    const { container } = render(<Count />);
    expect(container).toHaveTextContent(0);

    await wait(() => {
      expect(container).toHaveTextContent(1);
    });
  });
});

describe('App', () => {
  it('should display something', async () => {
    const options = render(
      <I18nProvider translations={{ en, fr }} defaultLocale="en">
        <App />
      </I18nProvider>,
    );

    const { getByText /*, container */ } = options;

    const title = getByText('Smooth Movies');
    expect(title).toHaveTextContent('Smooth Movies');

    // you should be able to target your items like this!
    // think of accessability!!!!!
    const button = getByText('🇬🇧 English');
    fireEvent.click(button);
    await wait(() => {
      expect(title).toHaveTextContent('Smooth Films');
    });

    // const movie = await waitForElement(() =>
    //   getByText("The Lord of the Rings: The Fellowship of the Ring")
    // );
    // expect(movie.parentNode.textContent).toMatch(/14332 votes/);

    // data-test-ids are not a good idea!
    // it is probably a lack of accessability in your application
  });
});
