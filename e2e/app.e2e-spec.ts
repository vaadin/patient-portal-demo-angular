import { PatientPortalUiPage } from './app.po';

describe('patient-portal-ui App', function() {
  let page: PatientPortalUiPage;

  beforeEach(() => {
    page = new PatientPortalUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
