module.exports = {
    gridUrl: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:3000/hw/store',
    sets: {
        common: {
            files: 'test/hermione/common/*.hermione.js'
        },
        chromeL: {
            files: 'test/hermione/wide/*.hermione.js',
            ignoreFiles: ['test/hermione/narrow/**', ],
        },
        chromeS: {
            files: 'test/hermione/narrow/*.hermione.js',
            ignoreFiles: ['test/hermione/wide/**', ],
        }
    },
    browsers: {
        chromeL: {
            desiredCapabilities: {
                browserName: 'chrome'
            },
            windowSize: '1200x900',
            retry: 2
        },
       chromeS: {
           desiredCapabilities: {
               browserName: 'chrome'
           },
           windowSize: '500x1000',
           retry: 2
       }
    },
    plugins: {
        'html-reporter/hermione': {
            path: 'hermione/hermione-html-report'
        }
        // 'hermione-test-plugin': true
    }
};