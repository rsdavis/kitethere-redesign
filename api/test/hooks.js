
const axios = require('axios')
const retry = require('async-retry')

before(async function () {

    this.timeout(0)

    const options = {
        retries: 4,
        onRetry: () => console.log('Failed to connect to API, trying again ...')
    }

    console.log('Attempting to reach API: ' + process.env.TEST_API)

    return await retry(async () => {

        let response = await axios.get(process.env.TEST_API)
        console.log('Success: ' + response.data)
        return

    }, options)

})