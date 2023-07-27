/// <reference types="Cypress" />

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
        cy.get('button[type="submit"]').click()
        
        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Vinicius')
        cy.get('#lastName').type('Miranda')
        cy.get('#email').type('vrobertomiranda.gmail.com.br')
        cy.get('#open-text-area').type('Texto')
        cy.get('button[type="submit"]').click()
        
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
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Texto')
        cy.get('button[type="submit"]').click()
        
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


})