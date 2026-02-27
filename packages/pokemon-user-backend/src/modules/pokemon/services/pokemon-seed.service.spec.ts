import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { vi } from 'vitest';
import { PokemonSeedService } from './pokemon-seed.service';
import { Pokemon } from '../entities/pokemon.entity';

describe('PokemonSeedService', () => {
  let service: PokemonSeedService;
  let repository: Repository<Pokemon>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonSeedService,
        {
          provide: getRepositoryToken(Pokemon),
          useValue: {
            count: vi.fn(),
            save: vi.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonSeedService>(PokemonSeedService);
    repository = module.get<Repository<Pokemon>>(getRepositoryToken(Pokemon));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should seed pokemon when table is empty', async () => {
      vi.spyOn(repository, 'count').mockResolvedValue(0);

      await service.onModuleInit();

      expect(repository.count).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();

      const savedData = vi.mocked(repository.save).mock.calls[0][0] as Partial<Pokemon>[];
      expect(savedData).toHaveLength(150);
      expect(savedData[0]).toMatchObject({ id: 1, name: 'bulbasaur' });
      expect(savedData[149]).toMatchObject({ id: 150, name: 'mewtwo' });
    });

    it('should skip seeding when pokemon already exist', async () => {
      vi.spyOn(repository, 'count').mockResolvedValue(150);

      await service.onModuleInit();

      expect(repository.count).toHaveBeenCalled();
      expect(repository.save).not.toHaveBeenCalled();
    });
  });
});
