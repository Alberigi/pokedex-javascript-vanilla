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
    let td = row.insertCell();
    this.setButtonUpdate(td, row, pokemon);
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

   setButtonUpdate(td, row, pokemon) {
    let buttonUpdate = document.createElement('button');
    let icon = document.createElement('i');
     
     buttonUpdate.className = 'btn btn-link';
     icon.innerHTML =
       `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color= "rgb(255, 210, 48)" class="bi bi-pen" viewBox="0 0 16 16">
          <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
        </svg>`
     
    buttonUpdate.addEventListener('click', async () => {
      this.changeEditMode(row,pokemon);
    });
     
    buttonUpdate.appendChild(icon);
    td.appendChild(buttonUpdate);
   }
  
  async changeEditMode(row,pokemon) {
    row.innerHTML = '';

    this.setEditInput(row, pokemon.name, 'name');
    await this.setEditSelect(row, pokemon.type, 'type');
    this.setEditInput(row, pokemon.image, 'image');

    let td = row.insertCell();
    td.style.display = 'flex';
    this.setSaveEditButton(td, pokemon);
    this.setCloseEditButton(td);
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

  setSaveEditButton(td, pokemon) {
    let buttonSaveEdit = document.createElement('button');
    let icon = document.createElement('i');
    
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" color= "#07EE1E"  class="bi bi-check" viewBox="0 0 16 16">
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
      </svg>
    `;
    buttonSaveEdit.className = 'btn btn-link';

    buttonSaveEdit.addEventListener('click', async () => {
      await this.saveEdit(pokemon);
    });

    buttonSaveEdit.appendChild(icon);
    td.appendChild(buttonSaveEdit);
  }

  setCloseEditButton(td) {
    let buttonSaveEdit = document.createElement('button');
    let icon = document.createElement('i');
    
    icon.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
    `;
    buttonSaveEdit.className = 'btn btn-link';

    buttonSaveEdit.addEventListener('click', async () => {
      this.cleanList();
      await this.listPokemon();
    });

    buttonSaveEdit.appendChild(icon);
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
      await this.httpClientService.post('/updatePokemon', { indetification, data });
      this.customToastService.success('successfully updated pokemon');
    } catch (error) {
      this.customToastService.error(error);
    }
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
