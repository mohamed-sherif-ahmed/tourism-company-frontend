import { NgTourismFrontendPage } from './app.po';

describe('ng-tourism-frontend App', () => {
  let page: NgTourismFrontendPage;

  beforeEach(() => {
    page = new NgTourismFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
