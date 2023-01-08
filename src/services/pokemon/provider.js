import { customToastService,httpClientService } from '../config/provider';
import { pokemonState, typesState } from '../../states/provider';
import { ListPokemonService } from "./listPokemon.service";
import { UpdatePokemonService } from './updatePokemon.service';
import { DeletePokemonService } from './deletePokemon.service';
import { CreatePokemonService } from './createPokemon.service';

export const listPokemonService = new ListPokemonService(pokemonState);
export const updatePokemonService = new UpdatePokemonService(httpClientService,customToastService, listPokemonService, pokemonState, typesState);
export const deletePokemonService = new DeletePokemonService(httpClientService,customToastService, listPokemonService, pokemonState);
export const createPokemonService = new CreatePokemonService(listPokemonService, pokemonState);

listPokemonService.setService([updatePokemonService,deletePokemonService]);
listPokemonService.init();
