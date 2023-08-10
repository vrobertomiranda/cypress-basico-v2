// o arquivo commands.js serve para criar comandos que serão utilizados em vários momentos dentro de um teste automatizado
// neste exemplo aqui, trata-se de preencher automaticamente os campos obrigatórios dentro da aplicação CAC-TAT

Cypress.Commands.add('preenchendoCamposObrigatoriosEnviandoDados', function() {

    cy.get('#firstName').type('Vinicius')
    cy.get('#lastName').type('Miranda')
    cy.get('#email').type('vrobertomiranda@gmail.com')
    cy.get('#open-text-area').type('Texto')
    cy.contains('button', 'Enviar').click() //há duas forma de localizar um referido botão pra a ação de clicar: cy.contains('button', 'Enviar').click() ou cy.get('button[type="submit"]').click().
                                            //A primeira localiza um seletor através do nome dele ('button' e com nome 'Enviar') 
                                            //Já a segunda é localizado pelo a ação de "submit". Qualquer uma das duas está correto
       
})