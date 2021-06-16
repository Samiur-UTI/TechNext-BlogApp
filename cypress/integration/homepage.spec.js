describe("renders homepage", () => {
    it('renders correctly', () => {
        cy.visit('/')
        cy.get('.all-posts').should('exist')
    })
    it('renders each individual post correctly', () => {
        cy.visit('/post/:id')
        cy.get('.containers').should('exist')
    })
})
