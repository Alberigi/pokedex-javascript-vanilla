import { PokedexService } from "./pokedex.service";
import { FormService } from "./form.service";

export const pokedexService = new PokedexService();
export const formService = new FormService(pokedexService);
