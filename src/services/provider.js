import axios from 'axios';
import { PokedexService } from "./pokedex.service";
import { FormService } from "./form.service";
import { CustomToastService } from "./customToast.service";
import { HttpClientService } from '../services/httpClient.service';
import { UpdatePokemonService } from '../services/updatePokemon.service';


const axiosClient = axios.create({
    baseURL: 'http://localhost:4000'
});

export const httpClientService = new HttpClientService(axiosClient);
export const customToastService = new CustomToastService();

export const pokedexService = new PokedexService(httpClientService,customToastService);
export const updatePokemonService = new UpdatePokemonService(httpClientService,customToastService, pokedexService);
export const formService = new FormService(pokedexService, customToastService, httpClientService);

pokedexService.setService(updatePokemonService);
pokedexService.init();
