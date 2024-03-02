/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable cypress/unsafe-to-chain-command */
import { loc } from '../support/locators'
import { userData } from '../support/faker-checkout'

Cypress.Commands.add('login', (user=Cypress.env('USER_EMAIL'), password=Cypress.env('USER_PASSWORD')) => {
	cy.visit('/')
	cy.get('[data-test="username"]').type(user)
	cy.get('[data-test="password"]').type(password, {log: false})
	cy.get('[data-test="login-button"]').click()
	cy.contains('Products').should('be.visible')
})

Cypress.Commands.add('sessionLogin', (user=Cypress.env('USER_EMAIL'), password=Cypress.env('USER_PASSWORD')) =>{
	const login = () => cy.login(user, password)
	cy.session(user, login)
})

Cypress.Commands.add('getAtoZ',() => {
	cy.get('.inventory_item_name', { timeout: 10000 }).then(($titles) => {
		const allTitles = $titles.map((element) => Cypress.$(element).text().trim().toLowerCase()).get()

		const isSorted = allTitles.every((title, index, array) => index === 0 || title.localeCompare(array[index - 1]) >= 0)
		expect(isSorted).to.be.true
	  })
})

Cypress.Commands.add('getZtoA',() => {
	cy.get('.inventory_item_name', { timeout: 10000 }).then(($titles) => {
		const allTitles = $titles.map((element) => Cypress.$(element).text().trim().toLowerCase()).get()

		const isSorted = allTitles.every((title, index, array) => index === 0 || title.localeCompare(array[index - 1]) >= 0)
		expect(isSorted).to.be.false
	  })
})

Cypress.Commands.add('getMinPrice', () => {
	cy.get('.inventory_item').should('have.length.at.least', 6)

	cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price')
		.invoke('text')
		.then((firstItemPriceText) => {
			const firstItemPrice = parseFloat(firstItemPriceText.replace(/[^\d.]/g, '')) || 0

			const allPrices = []
			cy.get('.inventory_item_price').each(($el) => {
				const priceText = $el.text().replace(/[^\d.]/g, '')
				const priceValue = parseFloat(priceText) || 0
				allPrices.push(priceValue)
			}).then(() => {
				const minPrice = Math.min(...allPrices)
				expect(firstItemPrice).to.equal(minPrice)
			})
		})
})

Cypress.Commands.add('getMaxPrice', () => {
	cy.get(':nth-child(1) > .inventory_item_description > .pricebar > .inventory_item_price')
		.invoke('text')
		.then((firstItemPriceText) => {
	  const firstItemPrice = parseFloat(firstItemPriceText.replace(/[^\d.]/g, '')) || 0

	  const allPrices = []
	  cy.get('.inventory_item_price').each(($el) => {
				const priceText = $el.text().replace(/[^\d.]/g, '')
				const priceValue = parseFloat(priceText) || 0
				allPrices.push(priceValue)
	  }).then(() => {
				const maxPrice = Math.max(...allPrices)
				expect(firstItemPrice).to.equal(maxPrice)
	  })
		})
})

Cypress.Commands.add('reviewPage', () => {
	cy.get(loc.HOME_PAGE.ADD_CART_BTN).click()
	cy.get(loc.HOME_PAGE.CART_WITH_ITEMS).click()
	cy.get(loc.CHECKOUT.CHECKOUT_BTN).click()
	cy.get(loc.CHECKOUT.FIRST_NAME).type(userData.firstName)
	cy.get(loc.CHECKOUT.LAST_NAME).type(userData.lastName)
	cy.get(loc.CHECKOUT.POSTAL_CODE).type(userData.postalCode)
	cy.get(loc.CHECKOUT.CONTINUE_BTN).click()
	cy.contains('Checkout: Overview').should('be.visible')
})

Cypress.Commands.add('getTotal', () => {
	let itemTotal, tax, parsedTotal, expectedTotal

		const extractNumber = (text) => {
			const matches = text.match(/[\d.,]+/)
			return matches ? parseFloat(matches[0].replace(',', '')) : 0
		}

		cy.get('.summary_subtotal_label')
			.should('exist')
			.invoke('text')
			.then((text) => {
				itemTotal = extractNumber(text)
				cy.log('Item Total:', itemTotal)

				cy.get('.summary_tax_label')
					.should('exist')
					.invoke('text')
					.then((taxText) => {
						tax = extractNumber(taxText)
						cy.log('Tax:', tax)

						cy.get('.summary_total_label')
							.should('exist')
							.invoke('text')
							.then((total) => {
								cy.log('Total:', total)

								parsedTotal = extractNumber(total)
								expectedTotal = itemTotal + tax

								cy.log('Parsed Total:', parsedTotal)
								cy.log('Expected Total:', expectedTotal)

								expect(parsedTotal).to.equal(expectedTotal)
							})
					})
			})
})