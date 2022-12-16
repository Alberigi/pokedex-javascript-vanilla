export class FormService {
  constructor(pokedexService) {
    this.pokedexService = pokedexService;

    const formButton = document.getElementById("formButton");

    formButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.sendForm();
    });
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
    } catch (error) {
      console.error(error);
    }
  }
}
