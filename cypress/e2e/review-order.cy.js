import { loc } from '../support/locators'

describe('Review orders', () => {
	beforeEach(() => {
		cy.visit('/')
		cy.login()
		cy.reviewPage()
	})

	it('Review the total price and proceed with the purchase.', () => {
		cy.getTotal()
		cy.get(loc.CHECKOUT.FINISH_BTN).click()
		cy.contains('Thank you for your order!').should('be.visible')
	})

	it('Cancel order', () => {
		cy.contains('Checkout: Overview').should('be.visible')
		cy.get(loc.CHECKOUT.CANCEL_BTN).click()
		cy.contains('Swag Labs').should('be.visible')
	})
})