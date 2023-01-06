import { types } from '../repository/types';
export class PokedexService {
  UpdatePokemonService = {};
  DeletePokemonService = {};
  tbody = document.getElementById("t-body");

  constructor(pokemonState) {
    this.pokemonState = pokemonState;
  }
  
  async init() {
    await this.listPokemon();
  }

  setService(services) { 
    services.forEach(service => {
      this[service.constructor.name] = service;
    });
  }

  setCardsPokemons(pokemon) {
    let tr = this.tbody.insertRow();

    this.setNameTdValue(tr, pokemon.name);
    this.setTypeTdValue(tr, pokemon.type);
    this.setImageTdValue(tr, pokemon.image);
    this.setActionsButtons(tr, pokemon);
  }

  setNameTdValue(row, name) {
    let td_name = row.insertCell();
    td_name.innerText = name;
  }

  setTypeTdValue(row, type) {
    let td_type = row.insertCell()
    let span = document.createElement('span');
    span.className = types[type];
    span.innerText = type;
    td_type.appendChild(span);  
  }

  setImageTdValue(row, image) {
    let td_image = row.insertCell()
    let img = document.createElement('img');
    img.src = `${image}`;
    img.style.height = '60px';
    td_image.appendChild(img);  
  }

  setActionsButtons(row, pokemon) {
    let td = row.insertCell();
    this.UpdatePokemonService.createEditButton(td, row, pokemon);
    this.DeletePokemonService.createDeleteButton(td, pokemon.name);
  }

  async resetList() {
    this.cleanList();
    this.listPokemon();
  }

  cleanList() {
    this.tbody.innerHTML = "";
  }

  async listPokemon() {   
    const pokemons = this.pokemonState.get();

    pokemons.forEach((pokemon) => {
      this.setCardsPokemons(pokemon);
    });
  }
}
