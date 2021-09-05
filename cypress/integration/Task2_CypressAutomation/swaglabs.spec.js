/// <reference types="cypress" />
import AllObjects from '../../support/PageObjects/obj_repo.js'
//Test suite
describe("Test_home_task_suite", ()=>{
    beforeEach(function(){
        //Get data from testdata.json and send to each test case
        cy.fixture('testdata').then(function(data){
            this.data = data;
            cy.log(this.data.stdUsername)
          })
        //Get url from cypress.json and Open the url for each test case
        cy.visit(Cypress.env('url'))
    })  
    
    /*This test case is to verify the no of products displayed in the prodcut page 
    and print all the prodcuts
    */
    it('Verify the product count and print', function(){
        cy.login(this.data.stdUsername,this.data.password)
        AllObjects.commonObj.pageTitletext().should('have.text','Products')
        AllObjects.prodcutPage.allProductName()
        .should('have.length',this.data.noOfProducts)
        .then(($prods)=>{
            cy.log('Total products '+$prods.length)
        })
        .each(($prod, index, $prods)=>{
            cy.log($prod.text())
        })
        cy.logout()
    })
    /*
    This test case is to buy a given product from the testdata.json
    */
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
        AllObjects.commonObj.pageTitletext().should('have.text','Products')
        cy.logout()
    })
    /*
    This test case is to verify the locked message for locked user
    */
    it('Login with locked_out_user', function(){
        cy.login(this.data.logoutuser,this.data.password)
        cy.contains('Sorry, this user has been locked out')
    })
})