export class UpdatePokemonService {
    constructor(httpClientService, customToastService, listPokemonService) {
        this.httpClientService = httpClientService;
        this.listPokemonService = listPokemonService;
        this.customToastService = customToastService;
     }
    
    createEditButton(td, row, pokemon) {
        let button = this.createButtonElement();
        let icon = this.createIconElement( 
            `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color= "rgb(255, 210, 48)" class="bi bi-pen" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
            </svg>`
        );
        
        button.addEventListener('click', async () => {
            this.changeEditMode(row,pokemon);
        });
        
        button.appendChild(icon);
        td.appendChild(button);
    }
    
    createButtonElement() {
        let button = document.createElement('button');
        button.className = 'btn btn-link';
        return button;
    }

    createIconElement(html) {
        let icon = document.createElement('i');
        icon.innerHTML = html;
        return icon;
    }

    async changeEditMode(row,pokemon) {
        row.innerHTML = '';

        this.createInput(row, pokemon.name, 'name');
        await this.createSelect(row, pokemon.type, 'type');
        this.createInput(row, pokemon.image, 'image');

        let td = row.insertCell();
        td.style.display = 'flex';
        this.createSaveButton(td, pokemon);
        this.createCloseButton(td);
    }

    createInput(row, value, key) {
        let td = row.insertCell();
        let input = document.createElement('input');
        input.value = value;
        input.id = `edit-${key}`
        input.className = 'form-control';
        input.type = 'text';
        td.appendChild(input);
    }

    async createSelect(row, value, key) {
        let td = row.insertCell();
        let select = document.createElement('select');
        select.id = `edit-${key}`
        await this.setOptions(select);
        select.value = value;
        select.className = 'form-select';
        td.appendChild(select);
    }

    async setOptions(select) { 
        const types = await this.httpClientService.get('/getTypes');
      
        types.forEach(type => {
            let opt = document.createElement("option");
            opt.value = type;
            opt.innerHTML = type;
            select.appendChild(opt);
        })
    }

    createSaveButton(td, pokemon) {
        let button = this.createButtonElement();
        let icon =  this.createIconElement(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" color= "#07EE1E"  class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
        </svg>
        `);
        
        button.addEventListener('click', async () => {
            await this.saveEdit(pokemon);
        });

        button.appendChild(icon);
        td.appendChild(button);
    }

    async saveEdit(pokemon) {
        console.log(pokemon);
        await this.updatePokemon(pokemon.name);
        await this.resetList();
    }
    
    async resetList() {
        this.listPokemonService.cleanList();
        this.listPokemonService.listPokemon();
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

    createCloseButton(td) {
        let button = this.createButtonElement();
        let icon = this.createIconElement(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="28" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
        `);
                
        button.addEventListener('click', async () => {
            await this.resetList();
        });

        button.appendChild(icon);
        td.appendChild(button);
    }
}