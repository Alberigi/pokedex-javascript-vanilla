export class PokemonState {
    _pokemons = [];
    constructor(httpClientService) {
        this.httpClientService = httpClientService;
     }
    
    async init() {
        const pokemons = await this.httpClientService.get('/getPokemons');
        this._pokemons.push(...pokemons);
    }
    
    add(pokemon) {
        this._pokemons.push(pokemon);
    }

    get() {
        return this._pokemons;
    }
}