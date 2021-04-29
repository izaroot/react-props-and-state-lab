import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
      this.setState({
        filters: {
          type: event.target.value
        }
      })
  }

  onFindPetsClick = () => {
    let URL = ''
    this.state.filters.type == 'all' ? URL='/api/pets' : URL=`/api/pets?type=${this.state.filters.type}`
      fetch(URL)
      .then(resp => resp.json())
      .then(petsArr => {
        this.setState({
          pets: petsArr
      })
    })
    console.log(URL)
  }

  onAdoptPet = (petId) => {
    let clickedPet =  this.state.pets.find((pet) => {
     return pet.id === petId
    })
     console.log(clickedPet)
  }

  // componentDidMount(){
  //   fetch('/api/pets')
  //   .then(resp => resp.json())
  //   .then(petsArr => {
  //     this.setState({
  //       pets: petsArr
  //     })
  //   })
  // }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={(e) => this.onChangeType(e)} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
