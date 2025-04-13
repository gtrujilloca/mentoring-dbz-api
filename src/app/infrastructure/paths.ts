
import { environment } from 'src/environments/environment'
const { baseApiUrl } = environment

export enum DbzResources {
  PLANETS = 'planets',
  CHARACTERS = 'characters'
}
export const CHARACTERS_PATH = `${baseApiUrl}/${DbzResources.CHARACTERS}`
export const PLANETS_PATH = `${baseApiUrl}/${DbzResources.PLANETS}`
