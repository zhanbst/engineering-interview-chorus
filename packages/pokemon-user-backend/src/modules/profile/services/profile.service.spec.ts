import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ProfileService } from './profile.service';
import { Profile } from '../entities/profile.entity';
import { Pokemon } from '../../pokemon/entities/pokemon.entity';
import { vi } from 'vitest';

describe('ProfileService', () => {
  let service: ProfileService;
  let profileRepository: Repository<Profile>;
  let pokemonRepository: Repository<Pokemon>;

  const mockPokemon: Pokemon[] = [
    {
      id: 25,
      name: 'pikachu',
      spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockProfile: Profile = {
    id: 1,
    name: 'Ash',
    pokemon: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: getRepositoryToken(Profile),
          useValue: {
            find: vi.fn().mockResolvedValue([mockProfile]),
            create: vi.fn().mockReturnValue(mockProfile),
            save: vi.fn().mockResolvedValue(mockProfile),
            findOneByOrFail: vi.fn().mockResolvedValue({ ...mockProfile }),
          },
        },
        {
          provide: getRepositoryToken(Pokemon),
          useValue: {
            findByIds: vi.fn().mockResolvedValue(mockPokemon),
          },
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    profileRepository = module.get(getRepositoryToken(Profile));
    pokemonRepository = module.get(getRepositoryToken(Pokemon));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all profiles', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockProfile]);
      expect(profileRepository.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new profile', async () => {
      const dto = { name: 'Ash' };
      const result = await service.create(dto);

      expect(profileRepository.create).toHaveBeenCalledWith({ name: 'Ash' });
      expect(profileRepository.save).toHaveBeenCalled();
      expect(result).toEqual(mockProfile);
    });
  });

  describe('updatePokemon', () => {
    it('should update profile pokemon team', async () => {
      const dto = { pokemonIds: [25] };
      const savedProfile = { ...mockProfile, pokemon: mockPokemon };
      vi.spyOn(profileRepository, 'save').mockResolvedValue(savedProfile);

      const result = await service.updatePokemon(1, dto);

      expect(profileRepository.findOneByOrFail).toHaveBeenCalledWith({ id: 1 });
      expect(pokemonRepository.findByIds).toHaveBeenCalledWith([25]);
      expect(result.pokemon).toEqual(mockPokemon);
    });

    it('should throw BadRequestException for invalid pokemon IDs', async () => {
      const dto = { pokemonIds: [999] };
      vi.spyOn(pokemonRepository, 'findByIds').mockResolvedValue([]);

      await expect(service.updatePokemon(1, dto)).rejects.toThrow(
        BadRequestException
      );
    });
  });
});
