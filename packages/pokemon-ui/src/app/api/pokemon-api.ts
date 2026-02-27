import axios, { AxiosInstance } from 'axios';

export interface Pokemon {
  id: number;
  name: string;
  spriteUrl: string;
}

export interface Profile {
  id: number;
  name: string;
  pokemon: Pokemon[];
}

export class PokemonApiClient {
  private readonly http: AxiosInstance;

  constructor(baseURL = 'http://localhost:3000/api') {
    this.http = axios.create({ baseURL });
  }

  async getPokemon(): Promise<Pokemon[]> {
    const { data } = await this.http.get<Pokemon[]>('/pokemon');
    return data;
  }

  async getProfiles(): Promise<Profile[]> {
    const { data } = await this.http.get<Profile[]>('/profiles');
    return data;
  }

  async createProfile(name: string): Promise<Profile> {
    const { data } = await this.http.post<Profile>('/profiles', { name });
    return data;
  }

  async updateProfilePokemon(
    profileId: number,
    pokemonIds: number[]
  ): Promise<Profile> {
    const { data } = await this.http.put<Profile>(
      `/profiles/${profileId}/pokemon`,
      { pokemonIds }
    );
    return data;
  }
}

export const apiClient = new PokemonApiClient();
