const ccrypt = require('../support/crypt');
const crypt = new ccrypt.CryptoX(Cypress.env('SecretKey'));
const lp =require('../support/ui/loginPage');
const loginPage = new lp.LoginPage();

var datax={};

describe('Logging in user', () => {
  beforeEach(() => {
    cy.visit('/auth/sign-in');
    cy.fixture('login_data').then((data)=>{
      datax = data;
    }); 
  });
  describe('using valid credentials',()=>{
    it('should be able to successfull logged in and directed to dashboard page', () => {
      cy.get(loginPage.usernameField).type(datax.invalidCredentials.username);
      cy.get(loginPage.passwordField).type(crypt.decrypt(datax.invalidCredentials.password),{sensitive:true});
      cy.get(loginPage.signInButton).click();
      cy.log('This is just a sample and Assuming that the dashboard validation has been added');
    })
  });
  describe('using invalid credential',()=>{
    it('should return Invalid username and Password message', () => {
      cy.get(loginPage.usernameField).type(datax.invalidCredentials.username);
      cy.get(loginPage.passwordField).type(crypt.decrypt(datax.invalidCredentials.password),{sensitive:true});
      cy.get(loginPage.signInButton).click();
      cy.get(loginPage.signInMessage).should(($signInMessage)=>{
        expect($signInMessage).to.contain('Incorrect username or password.');
      })
    })
  });
})
