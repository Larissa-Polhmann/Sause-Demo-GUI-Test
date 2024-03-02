import { loc } from '../support/locators'

describe('Your cart items', () => {
	beforeEach(() => {
		cy.login()
	})

	it.only('Add one item to cart', () => {
		cy.get(loc.HOME_PAGE.ADD_CART_BTN).click()
		cy.get(loc.HOME_PAGE.CART_WITH_ITEMS).click()
		cy.get(loc.CART.CART_QUANTITY).should('have.text', '1')
		cy.contains('Sauce Labs Backpack')
		cy.get(loc.CART.CART_LIST).find(loc.CART.CART_ITEM).should('have.length', 1)
	})

	it('Add two items to cart', () => {
		cy.get(loc.HOME_PAGE.ADD_CART_BTN).click()
		cy.get(loc.HOME_PAGE.CART_WITH_ITEMS).click()
		cy.get(loc.CART.CART_QUANTITY).should('have.text', '1')
		cy.get(loc.CART.CONTINUE_SHOPPING).click()
		cy.get(loc.HOME_PAGE.SECOND_ITEM).click()
		cy.get(loc.HOME_PAGE.CART_WITH_ITEMS).click()
		cy.get(loc.CART.CART_LIST).find(loc.CART.CART_ITEM).should('have.length', 2)
	})

	it('Remove items from cart', () => {
		cy.get(loc.HOME_PAGE.ADD_CART_BTN).click()
		cy.get(loc.HOME_PAGE.CART_WITH_ITEMS).click()
		cy.get(loc.CART.CART_QUANTITY).should('have.text', '1')
		cy.get(loc.CART.REMOVE_BTN).click()
		cy.get(loc.CART.CART_LIST).find(loc.CART.CART_ITEM).should('have.length', 0)
	})
})