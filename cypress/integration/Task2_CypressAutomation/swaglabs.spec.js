/// <reference types="cypress" />
import AllObjects from '../../support/PageObjects/obj_repo.js'

describe("Adjust_home_task_suite", ()=>{
    beforeEach(function(){
        cy.fixture('testdata').then(function(data){
            this.data = data;
            cy.log(this.data.stdUsername)
          })
        cy.visit('https://www.saucedemo.com/')
    })    
    it('Verify the product count and print', function(){
        cy.login(this.data.stdUsername,this.data.password)
        AllObjects.commonObj.pageTitletext().should('have.text','Products')
        AllObjects.prodcutPage.allProductName()
        .should('have.length','6')
        .then(($prods)=>{
            cy.log('Total products '+$prods.length)
        })
        .each(($prod, index, $prods)=>{
            cy.log($prod.text())
        })
        cy.logout()
    })

    it('Buy a product', function(){
        const product = this.data.product
        cy.login(this.data.stdUsername,this.data.password)
        AllObjects.commonObj.pageTitletext().should('have.text','Products')
        AllObjects.prodcutPage.addProductToCartButton(product).click()
        AllObjects.prodcutPage.cartButton().click()
        AllObjects.commonObj.pageTitletext().should('have.text','Your Cart')
        //AllObjects.cartPage.productName().should('have.text','Sauce Labs Backpack')
        AllObjects.cartPage.productName().then(($el)=>{
            const txt = $el.text()
            expect(txt).to.eq(product)
        })
        AllObjects.cartPage.checkOutButton().click()
        AllObjects.commonObj.pageTitletext().should('have.text','Checkout: Your Information')        
        AllObjects.yourInformationPage.firstNameField().type(this.data.firstname)
        AllObjects.yourInformationPage.lastNameField().type(this.data.lastname)
        AllObjects.yourInformationPage.postalCodeField().type(this.data.postalcode)
        AllObjects.yourInformationPage.continueButton().click()
        AllObjects.commonObj.pageTitletext().should('have.text','Checkout: Overview')
        cy.contains('FREE PONY EXPRESS DELIVERY!')
        AllObjects.checkOutOverviewPage.finishButton().click()
        AllObjects.commonObj.pageTitletext().should('have.text','Checkout: Complete!')
        AllObjects.completePage.thankYouMessage().should('be.visible').contains('THANK YOU FOR YOUR ORDER')
        AllObjects.completePage.deliveryOption().should('be.visible')
        AllObjects.completePage.backToHomeButton().click()
        cy.logout()
    })
    it('Login with locked_out_user', function(){
        cy.login(this.data.logoutuser,this.data.password)
        cy.contains('Sorry, this user has been locked out')
    })
})