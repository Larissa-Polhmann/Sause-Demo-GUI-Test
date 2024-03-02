/* eslint-disable no-undef */
import { loc } from '../support/locators'


describe('Home page ecommerce', () => {
	beforeEach(() => {
		cy.login()
	})

	it('Sorting by Name A-Z', () => {
		cy.getAtoZ()
	})

	it('Sorting by Name Z-A', () => {
		cy.get('select').select(loc.HOME_PAGE.NAME_A_TO_Z)
		cy.get('select').select(loc.HOME_PAGE.NAME_Z_TO_A)
		cy.getZtoA()
	})

	it('Sorting by Lowest Price', () => {
		cy.get('select').select(loc.HOME_PAGE.NAME_A_TO_Z)
		cy.get('select').select(loc.HOME_PAGE.PRICE_LOW_TO_HIGH)
		cy.getMinPrice()

	})

	it('Sorting by Highest Price', () => {
		cy.get('select').select(loc.HOME_PAGE.NAME_A_TO_Z)
		cy.get('select').select(loc.HOME_PAGE.PRICE_HIGH_TO_LOW)
		cy.getMaxPrice()
	})

	it('Add to cart', () => {
		cy.get(loc.HOME_PAGE.ADD_CART_BTN).click()
		cy.get(loc.HOME_PAGE.CART_WITH_ITEMS).invoke('text').then((cartItemCount) => {
			const expectedItemCount = 1
			expect(parseInt(cartItemCount)).to.equal(expectedItemCount)
		})
	})

	it('Remove to card', () => {
		cy.get(loc.HOME_PAGE.ADD_CART_BTN).click()
		cy.get(loc.HOME_PAGE.REMOVE_ITEM_CART).click()
		cy.get(loc.HOME_PAGE.ITEM_CART_NOT_EXIST).should('not.exist')
	})
})