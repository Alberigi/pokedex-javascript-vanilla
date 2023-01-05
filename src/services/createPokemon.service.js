export class CreatePokemonService {
    pokemonsData = [];
    constructor(listPokemonService) {
        this.listPokemonService = listPokemonService;
     }
    
    create(pokemon) {
        this.listPokemonService.setCardsPokemons(pokemon);
        this.pokemonsData.push(pokemon);
    }
}