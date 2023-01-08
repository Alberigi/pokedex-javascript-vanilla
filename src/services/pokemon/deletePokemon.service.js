export class DeletePokemonService {
    constructor(httpClientService, customToastService, listPokemonService, pokemonState) {
        this.httpClientService = httpClientService;
        this.listPokemonService = listPokemonService;
        this.customToastService = customToastService;
        this.pokemonState = pokemonState;
    }
  
    createDeleteButton(td, name) {
        let button = this.createButtonElement();
        let icon = this.createIconElement();

        button.addEventListener('click', async () => {
            await this.delete(name);
        });

        button.appendChild(icon);
        td.appendChild(button);
    }
    
    createButtonElement() {
        let button = document.createElement('button');
        button.className = 'btn btn-link';
        return button;
    }

    createIconElement() {
        let icon = document.createElement('i');
        icon.innerHTML = 
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" color="rgb(255, 0, 0)" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>`;
        return icon;
    }
  
  async delete(name) {
    try {
      await this.httpClientService.post('/deletePokemon', { name });
      this.pokemonState.remove(name);
      await this.listPokemonService.resetList();
      this.customToastService.success(`${name} successfully removed`);
    } catch (error) {
      this.customToastService.error(error);
    }
  }
}