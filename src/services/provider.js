import axios from 'axios';
import { PokedexService } from "./pokedex.service";
import { FormService } from "./form.service";
import { CustomToastService } from "./customToast.service";
import { HttpClientService } from '../services/httpClient.service';
import { UpdatePokemonService } from '../services/updatePokemon.service';
import { DeletePokemonService } from '../services/deletePokemon.service';
import { CreatePokemonService } from '../services/createPokemon.service';


const axiosClient = axios.create({
    baseURL: 'http://localhost:4000'
});

export const httpClientService = new HttpClientService(axiosClient);
export const customToastService = new CustomToastService();

export const pokedexService = new PokedexService(httpClientService,customToastService);
export const updatePokemonService = new UpdatePokemonService(httpClientService,customToastService, pokedexService);
export const deletePokemonService = new DeletePokemonService(httpClientService,customToastService, pokedexService);
export const createPokemonService = new CreatePokemonService(pokedexService);
export const formService = new FormService(createPokemonService, customToastService, httpClientService);
await formService.setSelectTypesValues();

pokedexService.setService([updatePokemonService,deletePokemonService]);
pokedexService.init();
