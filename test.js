import { Selector, ClientFunction } from 'testcafe';

fixture `New Fixture`
    .page `localhost:3000`;

test(`New Test`, async t => {
    await ClientFunction(() => console.log('TestCafe test started:', Date.now()))();

    await t.debug();
});