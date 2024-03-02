const { defineConfig } = require('cypress')

module.exports = defineConfig({
	e2e: {
		baseUrl: 'https://www.saucedemo.com/'
	},
	projectId: '5cspe3'
})
