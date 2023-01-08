import { FormService } from "./form.service";
import { createPokemonService } from "./pokemon/provider";
import { customToastService,httpClientService } from "./config/provider";
import { typesState } from "../states/provider";

export const formService = new FormService(createPokemonService, customToastService, httpClientService, typesState);
