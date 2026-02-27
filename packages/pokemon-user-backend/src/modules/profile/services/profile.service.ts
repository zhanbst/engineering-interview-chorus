import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { Pokemon } from '../../pokemon/entities/pokemon.entity';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfilePokemonDto } from '../dto/update-profile-pokemon.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>
  ) {}

  findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  async create(dto: CreateProfileDto): Promise<Profile> {
    const profile = this.profileRepository.create({ name: dto.name });
    return this.profileRepository.save(profile);
  }

  async updatePokemon(
    profileId: number,
    dto: UpdateProfilePokemonDto
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOneByOrFail({
      id: profileId,
    });
    const pokemon = await this.pokemonRepository.findByIds(dto.pokemonIds);

    if (pokemon.length !== dto.pokemonIds.length) {
      throw new BadRequestException('One or more Pokemon IDs are invalid');
    }

    profile.pokemon = pokemon;
    return this.profileRepository.save(profile);
  }
}
