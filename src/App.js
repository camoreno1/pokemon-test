import React, { Component } from 'react';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './DataViewDemo.css';
import './App.css';

export class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      layout: 'grid',
      pokemons: [],
      pokemonSelected: {
        sprites: ''
      }
    };

    this.itemTemplate = this.itemTemplate.bind(this);
  }

  componentDidMount() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=200')
      .then(response => response.json())
      .then(json => {
        console.log(json.results);
        this.setState({ pokemons: json.results });
      });
  }

  seePokemonDetail(name) {
    fetch('https://pokeapi.co/api/v2/pokemon/' + name)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ pokemonSelected: json });
      });
  }

  renderGridItem(data) {
    return (
      <div className="p-col-12 p-md-4">
        <div className="product-grid-item card">
          <div className="product-grid-item-content">
            <div className="product-name">{data.name}</div>
          </div>
          <div className="product-grid-item-bottom">
            <Button icon="pi pi-search" label="See Detail" onClick={() => this.seePokemonDetail(data.name)}></Button>
          </div>
        </div>
      </div>
    );
  }

  itemTemplate(pokemon, layout) {
    if (!pokemon) {
      return;
    }
    return this.renderGridItem(pokemon);
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pokemon
        </a>
        </header>

        <div className="p-grid App-content">

          <div className="p-col">
            <div className="dataview-demo">
              <div className="card">
                <DataView value={this.state.pokemons} layout={this.state.layout}
                  itemTemplate={this.itemTemplate} paginator rows={9} />
              </div>
            </div>
          </div>

          <div className="p-col">
            <div className="p-fluid">
              <div className="App-pokemon-image">
                <img src={this.state.pokemonSelected.sprites.front_default} alt={this.state.pokemonSelected.name} />
              </div>
              <div className="p-field">
                <label htmlFor="pokemonId">Id</label>
                <InputText id="pokemonId" value={this.state.pokemonSelected.id} disabled />
              </div>
              <div className="p-field">
                <label htmlFor="pokemonName">Name</label>
                <InputText id="pokemonName" value={this.state.pokemonSelected.name} disabled />
              </div>
              <label>Types</label>
              <DataTable value={this.state.pokemonSelected.types}>
                <Column field="type.name" header="Name"></Column>
                <Column field="type.url" header="Url"></Column>
              </DataTable>
              <br/>
              <label>Abilities</label>
              <DataTable value={this.state.pokemonSelected.abilities}>
                <Column field="ability.name" header="Name"></Column>
                <Column field="ability.url" header="Url"></Column>
              </DataTable>
            </div>

          </div>

        </div>

      </div>
    );
  }

}

export default App;
