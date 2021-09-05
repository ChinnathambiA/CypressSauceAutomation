/// <reference types="cypress" />

import AllObjects from '../support/PageObjects/obj_repo'
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/*
This common command used to login to the application
*/
Cypress.Commands.add('login', (username, password)=>{
    AllObjects.loginPage.userNameField().type(username)
    AllObjects.loginPage.passwordField().type(password)
    AllObjects.loginPage.loginButton().click() 
})
/*
This common command used to logout from the application
*/
Cypress.Commands.add('logout', ()=>{
    AllObjects.commonObj.menuIcon().click()
    AllObjects.commonObj.logoutMenu().click()
    AllObjects.loginPage.userNameField().should('be.visible')
})
