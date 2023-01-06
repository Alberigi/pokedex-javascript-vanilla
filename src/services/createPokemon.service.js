export class CreatePokemonService {
    constructor(listPokemonService, pokemonState) {
        this.listPokemonService = listPokemonService;
        this.pokemonState = pokemonState;
     }
    
    create(pokemon) {
        this.pokemonState.add(pokemon);
        this.listPokemonService.setCardsPokemons(pokemon);
    }
}