import { PokedexService } from "./pokedex.service";
import { FormService } from "./form.service";
import { CustomToastService } from "./customToast.service";

export const pokedexService = new PokedexService();
export const customToastService = new CustomToastService();
export const formService = new FormService(pokedexService,customToastService);
