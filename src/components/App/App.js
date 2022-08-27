import React from "react"
// import movieData from "./mockData"
import MoviesContainer from "../MoviesContainer/MoviesContainer"
import Header from "../Header/Header"
import { Route, Switch, Router } from 'react-router-dom'
import MovieCardDetails from "../MovieCardDetails/MovieCardDetails";
import MovieCard from "../MovieCard/MovieCard";

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      error: ''
    }
    // this.showMovieDetails = this.showMovieDetails.bind(this)
    // this.goBack = this.goBack.bind(this)
  }
  fetchAllMovies() {
    console.log('hiiiiiiii')
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
    .then(response => {
      if(!response.ok) {
        throw new Error('sorry try again')
      } else {
        return response.json()
      }
    })
    .then(data => this.setState({ movies: data.movies}))
    .catch(err => this.setState({error: 'Something went wrong with our server please try again'}))
  }
  componentDidMount() {
    return this.fetchAllMovies()
  }
  // showMovieDetails = (id) => {
  //   const selectedMovie = this.state.movies.filter(movie => movie.id === id)
  //   this.setState({movies: selectedMovie})
  // }
  goBack = () => {
    this.fetchAllMovies()
  }
  render() {
    return (
      <main>
        <Header />
        {this.state.error && <h2>{this.state.error}</h2>}
        <Route
            exact path="/:movies"
            render={({ match }) => {
              return <MoviesContainer name={match.params.movies} data={this.state.movies} />
            }}
          />
        <Route
            exact path="/movies/:id"     
            render={({match}) => {
              const movieToRender = this.state.movies.find(movie => movie.id === parseInt(match.params.id));  
              console.log('PLEASE', movieToRender)
            return <MovieCard {...movieToRender} goBack={this.goBack}/>
          }}
        />
      </main>
    )
  }
}

export default App