import { PokemonState } from './pokemon.states'
import { TypesState } from './types.states'
import { httpClientService } from '../services/config/provider';

export const pokemonState = new PokemonState(httpClientService);
export const typesState = new TypesState(httpClientService);

await pokemonState.init();
await typesState.init();