import Login from '../page/auth.page'
import Product from '../page/product.page'
import userData from '../Data/user.data'

describe('User Login', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('Should Login user with valid credential', () => {
    //log in using valid credentials
     Login.login(userData.valid['username'], userData.valid['password']);

     //assertion that the user is logged in
     cy.get(".app_logo").should('be.visible');
     cy.get(".title").should('contain','Products');

    })

    it('Should verify user cant login with invalid password', () => {
        //log in using invalid credentials
        Login.login(userData.invalid['username'], userData.invalid['password']);
        cy.get(".error-message-container").should('contain','Epic sadface: Username and password do not match any user in this service');
   
       })

    it('Should verify user cant login with invalid username', () => {
        //log in using invalid credentials
        Login.login(userData.invalidUser['username'], userData.invalidUser['password']);
        cy.get(".error-message-container").should('contain','Epic sadface: Username and password do not match any user in this service');
   
    })
});

describe('Add to Cart', () => {
    beforeEach(() => {

        cy.visit('/');
        Login.login('standard_user', 'secret_sauce');
    })

    it('Should add a single item to cart', () => {

        //add product to cart
        Product.addToCart('Sauce Labs Backpack');
        cy.get(".inventory_item").should('contain','Remove');

        Product.navToCart();

        //assert icon is in cart
        cy.get('.cart_list').should('contain', 'Sauce Labs Backpack');
        cy.get(".shopping_cart_badge").should('have.text','1');

    })

    it('Should add multiple items to cart', () => {

        //add items to cart
        Product.addToCart('Sauce Labs Backpack');
        Product.addToCart('Sauce Labs Bike Light');
        Product.navToCart();

        //assert items are in cart
        cy.get('.cart_list').should('contain', 'Sauce Labs Backpack');
        cy.get('.cart_list').should('contain', 'Sauce Labs Bike Light');
        cy.get(".shopping_cart_badge").should('have.text','2');

    })

    it('Should remove single item from cart', () => {

        //add item to cart
        Product.addToCart('Sauce Labs Backpack');
        Product.navToCart();
        
        //assert item is in cart
        cy.get('.cart_list').should('contain', 'Sauce Labs Backpack');
        
        //remove item from cart
        Product.removeFromCart('Sauce Labs Backpack');

        //assert items are removed from cart
        cy.get('.inventory_item_name').should('not.exist');
        cy.get('.removed_cart_item').should('exist');
        
    })

    it('Should remove multiple items from cart', () => {
    
        //add product to cart
        Product.addToCart('Sauce Labs Backpack');
        Product.addToCart('Sauce Labs Bike Light');
        Product.navToCart();
       
        //asert item was added to cart
        cy.get('.cart_list').should('contain', 'Sauce Labs Backpack');
        cy.get('.cart_list').should('contain', 'Sauce Labs Bike Light');
       
        //remove items from cart
        Product.removeFromCart('Sauce Labs Backpack');
        Product.removeFromCart('Sauce Labs Bike Light');

        //assert items are not in cart
        cy.get('.inventory_item_name').should('not.exist');
        cy.get('.removed_cart_item').should('exist');
        
       })

       it('Should remove single item from product list page', () => {

        //add item to cart
        Product.addToCart('Sauce Labs Backpack');
        
        //remove item from cart
        Product.removeFromCart('Sauce Labs Backpack');

        //assert item is removed from cart
        cy.get('.removed_cart_item').should('not.exist');
        
    })

    it('Should verify user can continue shopping', () => {

        //add item to cart
        Product.addToCart('Sauce Labs Backpack');
        cy.get(".inventory_item").should('contain','Remove');

        Product.navToCart();

        //assert item is in cart
        cy.get('.cart_list').should('contain', 'Sauce Labs Backpack');
        cy.get(".shopping_cart_badge").should('have.text','1');

        //click the continue shopping button
        cy.get('#continue-shopping').click();
        cy.get('.header_secondary_container').should('contain', 'Products').should('be.visible');

    })

})
       
describe('Checkout Process', () => {
        beforeEach(() => {
    
            cy.visit('/');
            Login.login('standard_user', 'secret_sauce');
        })
    
        it('Should checkout an item', () => {
            //add items to cart
            Product.addToCart('Sauce Labs Backpack');
            cy.get(".inventory_item").should('contain','Remove');
    
            Product.navToCart();

            //assert item was added to cart
            cy.get('.cart_list').should('contain', 'Sauce Labs Backpack');
            cy.get(".shopping_cart_badge").should('have.text','1');

            cy.get('#checkout').click();

            //enter checkout info
            cy.get('#first-name').type(userData.checkOutInfo['firstname']);
            cy.get('#last-name').type(userData.checkOutInfo['lastname']);
            cy.get('#postal-code').type(userData.checkOutInfo['postalCode']);
            cy.get('#continue').click();

            //check info on checkout overview
            cy.get('.header_secondary_container').should('contain', 'Checkout: Overview').should('be.visible');
            cy.get('.cart_item_label').eq(0).should('contain', 'Sauce Labs Backpack');
            cy.get('.cart_item_label').eq(0).should('contain', '$29.99');

            //finish checking out and procide to Thank you page
            cy.get('#finish').click();
            cy.get('.header_secondary_container').should('contain', 'Checkout: Complete!').should('be.visible');
            cy.get('#checkout_complete_container').should('contain', 'THANK YOU FOR YOUR ORDER').should('be.visible');

            //returning to Products page
            cy.get('#back-to-products').click();
            cy.get('.header_secondary_container').should('contain', 'Products').should('be.visible');
            
        })

        it('Should verify canceling checking out an item', () => {
    
            //add product to cart
            Product.addToCart('Sauce Labs Backpack');
            cy.get(".inventory_item").should('contain','Remove');
    
            Product.navToCart();

            //assert item is in cart
            cy.get('.cart_list').should('contain', 'Sauce Labs Backpack');
            cy.get(".shopping_cart_badge").should('have.text','1');

            //checkout and enter checkout info
            cy.get('#checkout').click();
            cy.get('#first-name').type(userData.checkOutInfo['firstname']);
            cy.get('#last-name').type(userData.checkOutInfo['lastname']);
            cy.get('#postal-code').type(userData.checkOutInfo['postalCode']);
            cy.get('#continue').click();

            //check item info on the overview page
            cy.get('.header_secondary_container').should('contain', 'Checkout: Overview').should('be.visible');
            cy.get('.cart_item_label').eq(0).should('contain', 'Sauce Labs Backpack');
            cy.get('.cart_item_label').eq(0).should('contain', '$29.99');
        
            //cancel the checkout process
            cy.get('#cancel').click();
            cy.get('.header_secondary_container').should('contain', 'Products').should('be.visible');
    
        })
    
        it('Should verify checking out without checkout info', () => {
    
            //add item to cart
            Product.addToCart('Sauce Labs Backpack');
            cy.get(".inventory_item").should('contain','Remove');
    
            Product.navToCart();

            //assert item was added to cart
            cy.get('.cart_list').should('contain', 'Sauce Labs Backpack');
            cy.get(".shopping_cart_badge").should('have.text','1');

            //checkout and click the continue button
            cy.get('#checkout').click();
            cy.get('#continue').click();

            //assert porper error message is being shown if the fields are empty
            cy.get('.error-message-container').should('contain', 'Error: First Name is required').should('be.visible');
            cy.get('#first-name').type(userData.checkOutInfo['firstname']);
            cy.get('#continue').click();
            cy.get('.error-message-container').should('contain', 'Error: Last Name is required').should('be.visible');
            cy.get('#last-name').type(userData.checkOutInfo['lastname']);
            cy.get('#continue').click();
            cy.get('.error-message-container').should('contain', 'Error: Postal Code is required').should('be.visible');
 
        })
});

