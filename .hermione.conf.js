module.exports = {
    gridUrl: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:3000/hw/store',
    sets: {
        common: {
            files: 'test/hermione/common'
        },
        // chromeL: {
        //     files: 'test/hermione/wide'
        // },
        // chromeS: {
        //     files: 'test/hermione/narrow'
        // }
    },
    browsers: {
        chromeL: {
            desiredCapabilities: {
                browserName: 'chrome'
            },
            windowSize: '1200x900'
        },
        chromeS: {
            desiredCapabilities: {
                browserName: 'chrome'
            },
            windowSize: '600x900'
        }
    },
    // plugins: {
    //     'html-reporter/hermione': {
    //         path: 'hermione/hermione-html-report'
    //     }
    //     // 'hermione-test-plugin': true
    // }
};