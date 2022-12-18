import { types } from '../repository/types';

export class FormService {
  constructor(pokedexService, customToastService) {
    this.pokedexService = pokedexService;
    this.customToastService = customToastService;

    const formButton = document.getElementById("formButton");

    formButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.sendForm();
    });
    this.setSelecttypesValues();
  }

  getFormData() {
    return {
      name: document.getElementById("name-form").value,
      type: document.getElementById("type-form").value,
      image: document.getElementById("image-form").value,
    };
  }

  resetForm() {
    document.getElementById("name-form").value = "";
    document.getElementById("image-form").value = "";
    document.getElementById("type-form").value = "";
  }

  setSelecttypesValues() {
    let select = document.getElementById("type-form");
      
    Object.keys(types).forEach(type => {
      let opt = document.createElement("option");
      opt.value = type;
      opt.innerHTML = type;
      select.appendChild(opt);
    })
  }

  validateData(data) {
    Object.keys(data).forEach((key) => {
      if (!data[key]) throw Error(`Field ${key} is empty`);
    });
    if(this.pokedexService.pokemonsData.some(pokemon=> pokemon.name === data.name)) throw Error(`${data.name} already exists in pokedex`);
  }

  sendForm() {
    try {
      const formData = this.getFormData();
      this.validateData(formData);
        this.pokedexService.addPokemon(formData);
        this.resetForm();
        this.customToastService.success(`${formData.name} registered successfully`);
    } catch (error) {
      this.customToastService.error(error);
    }
  }
}
