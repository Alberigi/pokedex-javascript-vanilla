import { pokemonsData } from "../repository/data";

export class PokedexService {
  container = document.getElementById("container");
  cardTemplate = document.getElementById("cardTemplate");
  filterType = document.getElementById("filterType");

  constructor() {
    this.generateEvents();
    this.listPokemon("Todos");
  }

  generateEvents() {
    filterType.addEventListener("change", () => {
      this.listPokemon(filterType.value);
    });
  }

  cleanList() {
    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }
  }

  validatePokemonType(typeToCheck, pokemonType) {
    return typeToCheck === "Todos" || typeToCheck === pokemonType;
  }

  setCardsPokemons(type, pokemon) {
    let card = this.cardTemplate.content
      .cloneNode(true)
      .getElementById("card").outerHTML;

    if (this.validatePokemonType(type, pokemon.tipo)) {
      card = card.replace(/{{name}}/g, pokemon.nome);
      card = card.replace(/{{type}}/g, pokemon.tipo);
      card = card.replace(/{{image}}/g, pokemon.imagem);
      this.container.innerHTML += card;
    }
  }

  listPokemon(type) {
    this.cleanList();

    pokemonsData.forEach((pokemon) => {
      this.setCardsPokemons(type, pokemon);
    });
  }
}
