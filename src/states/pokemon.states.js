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

    remove(name) {
        return this._pokemons = this._pokemons.filter(p => p.name !== name);
    }

    update(indetification, pokemon) {
        return this._pokemons.map(p => {
            if (this.checkEquals(p.name, indetification)) return pokemon;
            else return p;
        });
    }

    checkEquals(expected, actual) {
        return actual.toLowerCase() === expected.toLowerCase();
    }
}