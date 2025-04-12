
import { environment } from 'src/environments/environment';
const { base_api_url } = environment;

export enum DbzResources {
    PLANETS = 'planets',
    CHARACTERS = 'characters'
}
export const CHARACTERS_PATH = `${base_api_url}/${DbzResources.CHARACTERS}`;
export const PLANETS_PATH = `${base_api_url}/${DbzResources.PLANETS}`;
