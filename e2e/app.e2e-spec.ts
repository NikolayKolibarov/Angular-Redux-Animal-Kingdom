import { AnimalKingdomPage } from './app.po';

describe('animal-kingdom App', () => {
  let page: AnimalKingdomPage;

  beforeEach(() => {
    page = new AnimalKingdomPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
