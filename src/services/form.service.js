export class FormService {
  constructor(createPokemonService, customToastService, httpClientService) {
    this.createPokemonService = createPokemonService;
    this.customToastService = customToastService;
    this.httpClientService = httpClientService;

    const formButton = document.getElementById("formButton");

    formButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.sendForm();
    });

    this.setSelectTypesValues();
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

  async setSelectTypesValues() {
    let select = document.getElementById("type-form");

    const types = await this.httpClientService.get('/getTypes');
      
    types.forEach(type => {
      let opt = document.createElement("option");
      opt.value = type;
      opt.innerHTML = type;
      select.appendChild(opt);
    })
  }

  async sendForm() {
    try {
      const formData = this.getFormData();
      await this.httpClientService.post('/savePokemon', formData)
      this.resetForm();
      this.createPokemonService.create(formData);
      this.customToastService.success(`${formData.name} registered successfully`);
    } catch (error) {
      this.customToastService.error(error);
    }
  }
}
