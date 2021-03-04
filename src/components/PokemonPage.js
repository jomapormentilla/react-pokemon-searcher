import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    search: ""
  }

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }, ()=>{ this.filterPokemon() })
  }

  filterPokemon = () => {
    return this.state.pokemon.filter(p => p.name.toLowerCase().includes(this.state.search.toLowerCase()))
  }

  componentDidMount(){
    fetch(`http://localhost:3000/pokemon`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          pokemon: data
        })
      })
  }

  addPokemon = (pokemon) => {
    this.setState(prevState => ({
      pokemon: [...prevState.pokemon, pokemon]
    }))
  }

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={ this.addPokemon } />
        <br />
        <Search onInputChange={ this.onInputChange } />
        <br />
        <PokemonCollection pokemon={ this.filterPokemon() } />
      </Container>
    )
  }
}

export default PokemonPage
