const createTestcafe = require('testcafe');

async function runTests () {
    const testcafe = await createTestcafe();

    await testcafe.createRunner()
        .src('./test.js')
        .browsers('chrome')
        .run({ pageLoadTimeout: 8000 });

    await testcafe.close();
}

module.exports = { runTests };