import { TopAppBarModule } from './top-app-bar.module';

describe('TopAppBarModule', () => {
  let topAppBarModule: TopAppBarModule;

  beforeEach(() => {
    topAppBarModule = new TopAppBarModule();
  });

  it('should create an instance', () => {
    expect(topAppBarModule).toBeTruthy();
  });
});
