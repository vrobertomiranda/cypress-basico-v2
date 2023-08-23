/// <reference types="Cypress" />
/// <reference types="cypress-iframe" />
import "cypress-iframe";

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html') //o comando beforeEach serve para toda para executar a chamada da página da web para o teste
    })
    it('Verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
                                //o comando it são os casos de testes
                                //caso queira executar um único caso de teste, basta usar o it.only
    }) 

    it('Preenche os campos obrigatórios e envia o formulário', function() {
        
        const textoLongo = 'Teste teste teste teste 0123456789!@#$%¨&*()_ asdfg çlkjh qwert poiuy zxcvb ;.,mn'
        
        cy.get('#firstName').type('Vinicius')
        cy.get('#lastName').type('Miranda')
        cy.get('#email').type('vrobertomiranda@gmail.com')
        cy.get('#open-text-area').type(textoLongo, {delay: 0}) // a propriedade .type usando o objeto {delay} indica quão rapido ou devagar vai ser a inserção do dado
                                                               // nesse exemplo a constante textoLongo será digitada em 50 milesegundos, ou seja, quanto maior o valor '0'
                                                               // mais demorado será para finalizar o teste
        cy.contains('button', 'Enviar').click() //há duas forma de localizar um referido botão pra a ação de clicar: cy.contains('button', 'Enviar').click() ou cy.get('button[type="submit"]').click().
                                                //A primeira localiza um seletor através do nome dele ('button' e com nome 'Enviar') 
                                                //Já a segunda é localizado pelo a ação de "submit". Qualquer uma das duas está correto
        
        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Vinicius')
        cy.get('#lastName').type('Miranda')
        cy.get('#email').type('vrobertomiranda.gmail.com.br')
        cy.get('#open-text-area').type('Texto')
        cy.contains('button', 'Enviar').click() //há duas forma de localizar um referido botão pra a ação de clicar: cy.contains('button', 'Enviar').click() ou cy.get('button[type="submit"]').click().
                                                //A primeira localiza um seletor através do nome dele ('button' e com nome 'Enviar') 
                                                //Já a segunda é localizado pelo a ação de "submit". Qualquer uma das duas está correto
        
        cy.get('.error').should('be.visible') //Usando a classe .error estamos montando um caso aonde um valor, caso seja informado de forma inválida em determinado campo
                                              //que ilustre ao QA que barrou com sucesso o envio do dado pois determinado campo está com o valor não esperado
    })

    it('Valor não-numérico em um campo numérico', function() {
        cy.get('#phone')
            .type('asdfg')
            .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Vinicius')
        cy.get('#lastName').type('Miranda')
        cy.get('#email').type('vrobertomiranda@gmail.com')
        cy.get('#phone-checkbox').check()        
        cy.get('#open-text-area').type('Texto')
        cy.contains('button', 'Enviar').click() //há duas forma de localizar um referido botão pra a ação de clicar: cy.contains('button', 'Enviar').click() ou cy.get('button[type="submit"]').click().
                                                //A primeira localiza um seletor através do nome dele ('button' e com nome 'Enviar') 
                                                //Já a segunda é localizado pelo a ação de "submit". Qualquer uma das duas está correto
        
        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Vinicius')
            .should('have.value', 'Vinicius')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Miranda')
            .should('have.value', 'Miranda')
            .clear()
            .should('have.value', '')
        
        cy.get('#email')
            .type('vrobertomiranda@gmail.com')
            .should('have.value', 'vrobertomiranda@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('62982502801')
            .should('have.value', '62982502801')
            .clear()
            .should('have.value', '')

    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.contains('button', 'Enviar').click() //há duas forma de localizar um referido botão pra a ação de clicar: cy.contains('button', 'Enviar').click() ou cy.get('button[type="submit"]').click().
                                                //A primeira localiza um seletor através do nome dele ('button' e com nome 'Enviar') 
                                                //Já a segunda é localizado pelo a ação de "submit". Qualquer uma das duas está correto
        
        cy.get('.error').should('be.visible')

    })

    it('Envia o formulário com sucesso usando um comando customizado', function() {
        cy.preenchendoCamposObrigatoriosEnviandoDados() // esse comando preenchendoCamposObrigatoriosEnviandoDados é um comando customizado, parametrizado no arquivo
        cy.get('.success').should('be.visible')         // commands.js dentro do projeto de Curso Cypress Básico  
    })

    it('Seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube') 
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria') 
    })

    it('Seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog') 
    })

    it('Marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')  
          .should('have.length', 3)
          .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })

    it('Marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
    })

    it('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json')
          .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
          })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
          .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
          })
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('exampleFile')
        cy.get('input[type="file"]#file-upload')
          .should('not.have.value')
          .selectFile('@exampleFile')
          .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
          })
    })

})