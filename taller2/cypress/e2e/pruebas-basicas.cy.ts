describe('Pruebas básicas de funcionamiento de mi app.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8100/')
      .wait(500);
  });

  function ingresar(usuario, contraseña) {
    cy.get("ion-input").eq(0) // nombre de usuario
      .type('{selectAll}')
      .type(usuario)
      .get("ion-input").eq(1) // password
      .type('{selectAll}')
      .type(contraseña)
      .get("ion-button").click()
      .wait(500);
  }


  it('Página de login se carga correctamente', () => {
    cy.get("ion-title")     
      .should('contain.text', 'Login')
      .get("ion-input")
      .should('have.length', '2')
      .get("ion-button")
      .should('contain.text', 'Ingresar');
  });

  it('Login incorrecto', () => {
    ingresar("loginMalo", "1234");

    cy.on('window:alert', (t) => {
      expect(t).to.be('Usuario no existe');
    })
  });

  it('Login correcto', () => {
    ingresar("user", "1234");

    cy.get("ion-content")
      .should('contain.text', 'Hola');
  });

  it('Genera tabs correctamente', () => {
    ingresar("user", "1234");

    cy.get("ion-tab-button")
      .should('have.length', 3);
  });

  it('Genera tabs API correctamente', () => {
    ingresar("user", "1234");

    cy.get("ion-tab-button").eq(1).click()
      .wait(1000)
      .get("ion-row").should('have.length', 3) // Sean tres filas de datos
      .get("ion-row").eq(1).children("ion-col")
        .should('have.length', 2)
        .eq(1).should('contain.text', "90413");
  });
})