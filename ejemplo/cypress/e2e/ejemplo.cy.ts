describe('Pruebas de ejemplo', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8100/');
  });

  function ingresar(user, pass) {
    cy.get("input").eq(0) // username
      .type('{selectAll}')
      .type(user)
      .get("input").eq(1) // password
      .type(pass)
      .get("ion-button").eq(1).click();  
  }

  it('Fallar el login', () => {
    cy.wait(500);    
    ingresar("Usuario inválido", "1234");

    cy.wait(500)
      .get('ion-toast')
      .should('exist')
      .shadow()
      .find('.toast-message')
      .should('contain.text', 'Usuario no existe');
  });

  it('Ingresar correctamente', () => {
    cy.wait(500);    
    ingresar("test", "1234");

    cy.wait(2000)
      .get('ion-content') // <- importante al cambiar page!
      .find("#container")
      .should('contain.text', 'test!!')
      .find("ion-list")
      .get("ion-item")
      .should('have.length', 3);
  });
})