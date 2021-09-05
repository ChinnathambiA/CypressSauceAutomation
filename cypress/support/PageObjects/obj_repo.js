export default class AllObjects{
    
    static commonObj= class{
        static menuIcon(){
            return cy.xpath("//*[contains(text(),'Open Menu')]")
        }
        static logoutMenu(){
            return cy.get('[id*=logout]')
        }
        static pageTitletext(){
            return cy.get('.title')
        }
    }
    static loginPage= class{
        static userNameField(){
            return cy.get('[data-test*=username]')
        }
        static passwordField(){
            return cy.get('[data-test*=password]')
        }
        static loginButton(){
            return cy.get('[data-test*=login-button]')
        }
    }
    static prodcutPage= class{
        static addProductToCartButton(productName){
            return cy.xpath("(//*[contains(text(),'"+ productName +"')]/following::*[contains(@data-test,'add-to-cart')])[1]")
        }
        static cartButton(){
            return cy.get('[id*=shopping_cart]')
        }
        static allProductName(){
            return cy.xpath('//*[contains(@class,"inventory_item_name")]')
        }

    }
    static cartPage= class{
        static productName(){
            return cy.xpath('//*[contains(@class,"inventory_item_name")]')
        }
        static checkOutButton(){
            return cy.get('[data-test*=checkout]')
        }
    }
    static yourInformationPage= class{
        static firstNameField(){
            return cy.get('[data-test*=firstName]')
        }
        static lastNameField(){
            return cy.get('[data-test*=lastName]')
        }
        static postalCodeField(){
            return cy.get('[data-test*=postalCode]')
        }
        static continueButton(){
            return cy.get('[data-test*=continue]')
        }
    }
    static checkOutOverviewPage= class{
        static finishButton(){
            return cy.get('[data-test=finish]')
        }
    }
    static completePage= class{
        static thankYouMessage(){
            return cy.get('.complete-header')
        }
        static deliveryOption(){
            return cy.get('[src*=pony-express]')
        }
        static backToHomeButton(){
            return cy.get('[data-test=back-to-products]')
        }
    }
}