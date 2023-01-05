import { types } from '../repository/types';
export class PokedexService {
  pokemonsData = [];
  updatePokemonService = {};
  tbody = document.getElementById("t-body");

  constructor(httpClientService,customToastService) {
    this.httpClientService = httpClientService;
    this.customToastService = customToastService;
  }
  
  async init() {
    await this.listPokemon();
  }

  setService(service) { 
    this.updatePokemonService = service;
  }

  setCardsPokemons(pokemon) {
    let tr = this.tbody.insertRow();

    this.setNameTdValue(tr, pokemon.name);
    this.setTypeTdValue(tr, pokemon.type);
    this.setImageTdValue(tr, pokemon.image);
    this.setActionsButtons(tr, pokemon);
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

  setActionsButtons(row, pokemon) {
    let td = row.insertCell();
    this.updatePokemonService.createEditButton(td, row, pokemon);
    this.setButtonRemove(td, pokemon.name);
  }
  
  setButtonRemove(td, name) {
    let buttonRemove = document.createElement('button');
    let icon = document.createElement('i');

    buttonRemove.className = 'btn btn-link';
    icon.innerHTML = 
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" color="rgb(255, 0, 0)" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>`;

    buttonRemove.addEventListener('click', async () => {
      await this.removePokemon(name);
    });

    buttonRemove.appendChild(icon);
    td.appendChild(buttonRemove);
  }
  
  async removePokemon(name) {
    try {
      await this.httpClientService.post('/deletePokemon', {name});
      this.cleanList();
      await this.listPokemon();
      this.customToastService.success(`${name} successfully removed`);
    } catch (error) {
      this.customToastService.error(error);
    }
  }

  cleanList() {
    this.tbody.innerHTML = "";
  }

  async listPokemon() {   
    const pokemons = await this.httpClientService.get('/getPokemons');
    pokemons.forEach((pokemon) => {
      this.setCardsPokemons(pokemon);
    });
  }
}
