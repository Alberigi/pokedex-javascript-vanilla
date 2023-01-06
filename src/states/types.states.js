export class TypesState {
    _types = [];
    constructor(httpClientService) {
        this.httpClientService = httpClientService;
     }
    
    async init() {
        const types = await this.httpClientService.get('/getTypes');
        this._types.push(...types);
    }
    
    add(pokemon) {
        this._types.push(pokemon);
    }

    get() {
        return this._types;
    }
}