describe('App', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
      fixture: 'movieData'
    })
    cy.visit('http://localhost:3000/')
  })
  it('Should have a header', () => {
    cy.contains('Rancid Tomatillos')
  })
  it('Should render movies', () => {
    cy.get('img').should('have.length', 7)
      .get('img').first().should('have.class', 'card').should('have.attr', 'src').should('include', "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg")
      .get('img').last().should('have.class', 'card').should('have.attr', 'src').should('include', "https://image.tmdb.org/t/p/original//irkse1FMm9dWemwlxKJ7RINT9Iy.jpg")
  })
  it('Should be able to click on single movie and view selected movie details', () => {
    cy.get('img').first().click()
      .get('.backdrop-img').should('have.attr', 'src').should('include', "https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg")
      .get('h2').contains('Money Plane')
      .get('.movie-rating').contains('6.875 stars ⭐️')
      .get('.release-runtime-genre-container').contains('Release Date: 2020-09-29')
      .get('.release-runtime-genre-container').contains('Run Time: 82 minutes')
      .get('.release-runtime-genre-container').contains('Genres: Action')
      .get('.description').contains("Description: A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.")
      .url().should('eq', 'http://localhost:3000/movies/694919')
  })
  it('Should be able to click on a different movie and view selected movie details', () => {
    cy.get('img').last().click()
      .get('.backdrop-img').should('have.attr', 'src').should('include', "https://image.tmdb.org/t/p/original//pGqBDYycGWsMYc57sYv5M9GAQoW.jpg")
      .get('h2').contains('Antebellum')
      .get('.movie-rating').contains('6.6 stars ⭐️')
      .get('.release-runtime-genre-container').contains('Release Date: 2020-09-02')
      .get('.release-runtime-genre-container').contains('Run Time: 105 minutes')
      .get('.release-runtime-genre-container').contains('Genres: Horror')
      .get('.description').contains("Description: Successful author Veronica finds herself trapped in a horrifying reality and must uncover the mind-bending mystery before it's too late.")
      .url().should('eq', 'http://localhost:3000/movies/627290')
  })
  it('Should be able to click home button and view all movies again', () => {
    cy.get('img').first().click()
      .get('.home-button').click()
      .get('img').first().should('have.class', 'card').should('have.attr', 'src').should('include', "https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg")
      .get('img').last().should('have.class', 'card').should('have.attr', 'src').should('include', "https://image.tmdb.org/t/p/original//irkse1FMm9dWemwlxKJ7RINT9Iy.jpg")
      .url().should('eq', 'http://localhost:3000/')
  })
  it('Should be able to use the browser arrow buttons to go between movie details page and main page', () => {
    cy.get('img').first().click()
      .url().should('eq', 'http://localhost:3000/movies/694919')
      .go('back')
      .url().should('eq', 'http://localhost:3000/')
      .go('forward')
      .url().should('eq', 'http://localhost:3000/movies/694919')
  })
})