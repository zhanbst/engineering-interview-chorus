import { ArrayMaxSize, IsArray, IsInt, Max, Min } from 'class-validator';

export class UpdateProfilePokemonDto {
  @IsArray()
  @ArrayMaxSize(6)
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Max(150, { each: true })
  pokemonIds: number[];
}
