import { types } from '../repository/types';
export class PokedexService {
  pokemonsData = [];
  tbody = document.getElementById("t-body");

  constructor(httpClientService,customToastService) {
    this.httpClientService = httpClientService;
    this.customToastService = customToastService;

    this.listPokemon();
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
    this.setButtonRemove(row, pokemon.name);
    this.setButtonUpdate(row, pokemon);
  }
  
  setButtonRemove(row, name) {
    let td_remove = row.insertCell();
    let buttonRemove = document.createElement('button');
    buttonRemove.className = 'btn btn-danger';
    buttonRemove.textContent = 'Remove';
    buttonRemove.addEventListener('click', async () => {
      await this.removePokemon(name);
    });
    td_remove.appendChild(buttonRemove);
  }

   setButtonUpdate(row, pokemon) {
    let td_update = row.insertCell();
    let buttonUpdate = document.createElement('button');
    buttonUpdate.className = 'btn btn-primary';
    buttonUpdate.textContent = 'Update';
    buttonUpdate.addEventListener('click', async () => {
      this.changeEditMode(row,pokemon);
    });
    td_update.appendChild(buttonUpdate);
   }
  
  async changeEditMode(row,pokemon) {
    row.innerHTML = '';

    this.setEditInput(row, pokemon.name, 'name');
    await this.setEditSelect(row, pokemon.type, 'type');
    this.setEditInput(row, pokemon.image, 'image');
    this.setSaveEditButton(row, pokemon);
  }

  setEditInput(row, value, key) {
    let td = row.insertCell();
    let input = document.createElement('input');
    input.value = value;
    input.id = `edit-${key}`
    input.className = 'form-control';
    input.type = 'text';
    td.appendChild(input);
  }

   async setEditSelect(row, value, key) {
    let td = row.insertCell();
     let select = document.createElement('select');
     select.value = value;
    select.id = `edit-${key}`
     select.className = 'form-select';
     await this.setOption(select);
    td.appendChild(select);
   }
  
  async setOption(select) { 
    const types = await this.httpClientService.get('/getTypes');
      
    types.forEach(type => {
      let opt = document.createElement("option");
      opt.value = type;
      opt.innerHTML = type;
      select.appendChild(opt);
    })
  }

  setSaveEditButton(row, pokemon) {
    let td = row.insertCell();
    let buttonSaveEdit = document.createElement('button');
    buttonSaveEdit.className = 'btn btn-primary';
    buttonSaveEdit.textContent = 'Save';
    buttonSaveEdit.addEventListener('click', async () => {
      await this.saveEdit(pokemon);
    });
    td.appendChild(buttonSaveEdit);
  }

  async saveEdit(pokemon) {
    await this.updatePokemon(pokemon.name);
    this.cleanList();
    this.listPokemon();
  }
  
  async updatePokemon(indetification) {
    const data = {
      name: document.getElementById("edit-name").value,
      type: document.getElementById("edit-type").value,
      image: document.getElementById("edit-image").value,
    };
    try {
      await this.httpClientService.post('/updatePokemon', {indetification,data});
    } catch (error) {
      this.customToastService.error(error);
    }
  }

  async removePokemon(name) {
    await this.httpClientService.post('/deletePokemon', {name});
    this.cleanList();
    this.listPokemon();
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
