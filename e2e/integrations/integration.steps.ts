/**
 * Created by jludvice on 8.3.17.
 */
import { binding, then, when } from 'cucumber-tsflow';
import { CallbackStepDefinition } from 'cucumber';
import { expect, World } from '../common/world';
import { IntegrationEditPage, ListActionsComponent } from '../integrations/edit/edit.po';
import { log } from '../../src/app/logging';
import { IntegrationsListPage } from '../integrations/list/list.po';

/**
 * Created by jludvice on 1.3.17.
 */
@binding([World])
class IntegrationSteps {

  constructor(protected world: World) {
  }

  @when(/defines integration name "([^"]*)"$/)
  public defineIntegrationName(integrationName: string, callback: CallbackStepDefinition): void {
    // Write code here that turns the phrase above into concrete actions
    const page = new IntegrationEditPage();

    page.basicsComponent().setName(integrationName).then(() => callback());
  }


  @then(/^she is presented with a visual integration editor$/)
  public editorOpened(callback: CallbackStepDefinition): void {
    // Write code here that turns the phrase above into concrete actions
    const page = new IntegrationEditPage();
    expect(page.rootElement().isPresent(), 'there must be edit page root element')
      .to.eventually.be.true.notify(callback);
  }

  @when(/^she selects "([^"]*)" integration action$/)
  public selectIntegrationAction(action: string, callback): void {
    const page = new ListActionsComponent();
    page.selectAction(action).then(() => callback());
  }


  @then(/^Integration "([^"]*)" is present in integrations list$/)
  public expectIntegrationPresent(name: string, callback: CallbackStepDefinition): void {
    log.info(`Verifying integration ${name} is present`);
    const page = new IntegrationsListPage();
    expect(page.listComponent().isIntegrationPresent(name), `Integration ${name} must be present`)
      .to.eventually.be.true.notify(callback);
  }

}


export = IntegrationSteps;

