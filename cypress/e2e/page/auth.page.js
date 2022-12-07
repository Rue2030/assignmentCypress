class Authentication{
    
    //login Selectors
    get userNameField() { return ('#user-name') }
    get passwordField() { return ('#password') }
    get loginBtn() { return ('#login-button') }

    get itemNames() { return ('.inventory_item_name') }

    //Login Methods
    login(username, password){
        cy.get(this.userNameField).type(username)
        cy.get(this.passwordField).type(password)
        cy.get(this.loginBtn).click()
    }
}
export default new Authentication()