import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  state = {
    name: '',
    hp: '',
    front: '',
    back: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    let newPokemon = {
      name: this.state.name,
      hp: this.state.hp,
      sprites: {
        front: this.state.front,
        back: this.state.back
      }
    }

    let configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify(newPokemon)
    }

    fetch(`http://localhost:3000/pokemon`, configObj)
      .then(res => res.json())
      .then(data => {
        this.props.addPokemon(data)
      })
      
    this.setState({
      name: '',
      hp: '',
      front: '',
      back: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={(e) => { this.handleSubmit(e) }}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" value={this.state.name} onChange={ this.handleChange } />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" value={this.state.hp} onChange={ this.handleChange } />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="front" value={this.state.front} onChange={ this.handleChange } />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="back" value={this.state.back} onChange={ this.handleChange } />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
