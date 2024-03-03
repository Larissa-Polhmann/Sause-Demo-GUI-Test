/// <reference types="cypress" />
import { loc } from '../support/locators'

describe('Login', () => {
	beforeEach(() => {
		cy.visit('/')
	})

	it('Successfully logs in', () => {
		cy.login()
	})

	it('Locked out user', () => {
		cy.get(loc.LOGIN.USER).type('locked_out_user')
		cy.get(loc.LOGIN.PASSWORD).type(Cypress.env('USER_PASSWORD'))
		cy.get(loc.LOGIN.LOGIN_BTN).click()
		cy.contains('Epic sadface: Sorry, this user has been locked out.').should('be.visible')
	})
})