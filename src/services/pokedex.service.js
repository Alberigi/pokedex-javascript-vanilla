import { types } from '../repository/types';
export class PokedexService {
  pokemonsData = [];
  tbody = document.getElementById("t-body");

  setCardsPokemons(pokemon) {
    let tr = this.tbody.insertRow();

    this.setNameTdValue(tr, pokemon.name);
    this.setTypeTdValue(tr, pokemon.type);
    this.setImageTdValue(tr, pokemon.image);
    this.setButtonRemoveTdValue(tr, pokemon.name);
  }
  
  addPokemon(pokemon) {
    this.setCardsPokemons(pokemon);
    this.pokemonsData.push(pokemon);
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
  
  setButtonRemoveTdValue(row, name) {
    let td_remove = row.insertCell();
    let buttonRemove = document.createElement('button');
    buttonRemove.className = 'btn btn-danger';
    buttonRemove.id = `remove-${name}`;
    buttonRemove.textContent = 'Remove';
    buttonRemove.addEventListener('click', (e) => {
      const name = e.target.id.split('remove-')[1];
      this.removePokemon(name);
    });
    td_remove.appendChild(buttonRemove);
  }

  removePokemon(name) {
    const pokemon = this.pokemonsData.find(p => p.name === name);
    const index = this.pokemonsData.indexOf(pokemon);
    this.pokemonsData.splice(index,1)
    this.cleanList();
    this.listPokemon();
  }

  cleanList() {
    while (this.tbody.hasChildNodes()) {
      this.tbody.removeChild(this.tbody.lastChild);
    }
  }

  listPokemon() {    
    this.pokemonsData.forEach((pokemon) => {
      this.setCardsPokemons(pokemon);
    });
  }
}
