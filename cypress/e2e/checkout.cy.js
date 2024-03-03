import { loc } from '../support/locators'
import { userData } from '../support/faker-checkout'

describe('Proceed to checkout', () => {
	beforeEach(() => {
		cy.visit('/')
		cy.login()
		cy.get(loc.HOME_PAGE.ADD_CART_BTN).click()
		cy.get(loc.HOME_PAGE.CART_WITH_ITEMS).click()
		cy.get(loc.CHECKOUT.CHECKOUT_BTN).click()
	})

	it('User information', () => {
		cy.get(loc.CHECKOUT.FIRST_NAME).type(userData.firstName)
		cy.get(loc.CHECKOUT.LAST_NAME).type(userData.lastName)
		cy.get(loc.CHECKOUT.POSTAL_CODE).type(userData.postalCode)
		cy.get(loc.CHECKOUT.CONTINUE_BTN).click()
		cy.contains('Checkout: Overview').should('be.visible')
	})

	it('Cancel order', () => {
		cy.get(loc.CHECKOUT.CANCEL_BTN).click()
		cy.contains('Your Cart').should('be.visible')
	})

	it('Proceed without entering the users first name', () => {
		cy.get(loc.CHECKOUT.LAST_NAME).type(userData.lastName)
		cy.get(loc.CHECKOUT.POSTAL_CODE).type(userData.postalCode)
		cy.get(loc.CHECKOUT.CONTINUE_BTN).click()
		cy.contains('Error: First Name is required').should('be.visible')
	})

	it('Proceed without entering the users last name', () => {
		cy.get(loc.CHECKOUT.FIRST_NAME).type(userData.firstName)
		cy.get(loc.CHECKOUT.CONTINUE_BTN).click()
		cy.contains('Error: Last Name is required').should('be.visible')
	})

	it('Proceed without entering the users postal code', () => {
		cy.get(loc.CHECKOUT.FIRST_NAME).type(userData.firstName)
		cy.get(loc.CHECKOUT.LAST_NAME).type(userData.lastName)
		cy.get(loc.CHECKOUT.CONTINUE_BTN).click()
		cy.contains('Error: Postal Code is required').should('be.visible')
	})
})