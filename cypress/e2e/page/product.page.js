class Product{

    //Product selectors
    get cartSubmit (){return('#add-to-cart-sauce-labs-bike-light')}
    get cartShopping(){return('#shopping_cart_container')}
    get cartRemove (){return('#remove-sauce-labs-bike-light')}
    get itemsName() { return ('.inventory_item_name') }
    get itemsPrice() { return ('.inventory_item_price') }
    get selectSortDropDown() { return ('.product_sort_container') }
  
    //Action Methods
        selectSort(sort){
            cy.get(this.selectSortDropDown).select(sort)
        }
    
        addToCart(itemName){
            let addToCartBtn = `#add-to-cart-${this.applySelectorFormat(itemName)}`

            cy.get(addToCartBtn).should('be.visible')
            cy.get(addToCartBtn).click()
    
        }

        navToCart(){
            cy.get(this.cartShopping).click()
        }

        removeFromCart(itemName){
            let removeFromCartBtn = `#remove-${this.applySelectorFormat(itemName)}`

            cy.get(removeFromCartBtn).should('be.visible')
            cy.get(removeFromCartBtn).click()
            
        }

        applySelectorFormat(itemName){
            return itemName.toLowerCase().replaceAll(' ', '-')
        }

    }
    export default new Product();