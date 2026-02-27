import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../entities/pokemon.entity';

describe('PokemonService', () => {
  let service: PokemonService;
  let repository: Repository<Pokemon>;

  const mockPokemon: Pokemon[] = [
    {
      id: 1,
      name: 'bulbasaur',
      spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 25,
      name: 'pikachu',
      spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: getRepositoryToken(Pokemon),
          useValue: {
            find: vi.fn().mockResolvedValue(mockPokemon),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    repository = module.get<Repository<Pokemon>>(getRepositoryToken(Pokemon));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all pokemon ordered by id', async () => {
      const result = await service.findAll();

      expect(result).toEqual(mockPokemon);
      expect(repository.find).toHaveBeenCalledWith({ order: { id: 'ASC' } });
    });
  });
});
