Cypress.Commands.add('preenchendoCamposObrigatoriosEnviandoDados', function() {

    cy.get('#firstName').type('Vinicius')
    cy.get('#lastName').type('Miranda')
    cy.get('#email').type('vrobertomiranda@gmail.com')
    cy.get('#open-text-area').type('Texto')
    cy.get('button[type="submit"]').click() // o arquivo commands.js serve para criar comandos que serão utilizados em vários momentos dentro de um teste automatizado
                                            // neste exemplo aqui, trata-se de preencher automaticamente os campos obrigatórios dentro da aplicação CAC-TAT

})