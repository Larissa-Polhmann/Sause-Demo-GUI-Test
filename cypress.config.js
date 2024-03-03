const { defineConfig } = require('cypress')

module.exports = defineConfig({
	e2e: {
		chromeWebSecurity: false,
		baseUrl: 'https://www.saucedemo.com'
	},
	projectId: '5cspe3'
})
