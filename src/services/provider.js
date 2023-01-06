import { customToastService,httpClientService } from './config/provider';
import { pokemonState, typesState } from '../states/provider';
import { PokedexService } from "./pokedex.service";
import { FormService } from "./form.service";
import { UpdatePokemonService } from '../services/updatePokemon.service';
import { DeletePokemonService } from '../services/deletePokemon.service';
import { CreatePokemonService } from '../services/createPokemon.service';

export const pokedexService = new PokedexService(pokemonState);
export const updatePokemonService = new UpdatePokemonService(httpClientService,customToastService, pokedexService);
export const deletePokemonService = new DeletePokemonService(httpClientService,customToastService, pokedexService);
export const createPokemonService = new CreatePokemonService(pokedexService, pokemonState);
export const formService = new FormService(createPokemonService, customToastService, httpClientService, typesState);

pokedexService.setService([updatePokemonService,deletePokemonService]);
pokedexService.init();
