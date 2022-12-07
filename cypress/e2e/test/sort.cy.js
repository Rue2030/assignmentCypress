import Login from '../../e2e/page/auth.page'
import Product from '../../e2e/page/product.page'
import userData from '../../e2e/Data/user.data'
import productData from '../../e2e/Data/products.data'

describe('Sort Product List', () => {
    beforeEach(() => {
        cy.visit('/')
      })

    it('should be able to sort product list from A-Z', () => {
        Login.login(userData.valid['username'], userData.valid['password'])
        Product.selectSort(productData.sort['A to Z'])

        //Sort data list from A to Z based on name
        productData.products.sort()

        cy.get(Product.itemsName).each(($elem, index) => {
            expect($elem.text()).equal(productData.products[index].name)
        })
    })

    it('should be able to sort product list from Z-A', () => {
        Login.login(userData.valid['username'], userData.valid['password'])
        Product.selectSort(productData.sort['Z to A'])

        //Sort data list from Z to A based on name
        productData.products.sort().reverse()

        cy.get(Product.itemsName).each(($elem, index) => {
            expect($elem.text()).equal(productData.products[index].name)
        })
    })

    it('should be able to sort product list from low to high', () => {
        Login.login(userData.valid['username'], userData.valid['password'])
        Product.selectSort(productData.sort['Low to High'])

        // Sort data list from low to high based on price
        productData.products.sort((a, b) => a.price - b.price)

        cy.get(Product.itemsPrice).each(($elem, index) => {
            expect($elem.text()).equal(`$${productData.products[index].price}`)
        })
    })

    it('should be able to sort product list from high to low', () => {
        Login.login(userData.valid['username'], userData.valid['password'])
        Product.selectSort(productData.sort['High to Low'])

        // Sort data list from high to low based on price
        productData.products.sort((a, b) => b.price - a.price)

        cy.get(Product.itemsPrice).each(($elem, index) => {
            expect($elem.text()).equal(`$${productData.products[index].price}`)
        })
    })
})