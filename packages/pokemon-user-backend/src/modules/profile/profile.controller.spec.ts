import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './services/profile.service';
import { Profile } from './entities/profile.entity';
import { vi } from 'vitest';

describe('ProfileController', () => {
  let controller: ProfileController;
  let service: ProfileService;

  const mockProfile: Profile = {
    id: 1,
    name: 'Ash',
    pokemon: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: {
            findAll: vi.fn().mockResolvedValue([mockProfile]),
            create: vi.fn().mockResolvedValue(mockProfile),
            updatePokemon: vi.fn().mockResolvedValue(mockProfile),
          },
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all profiles', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockProfile]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a profile', async () => {
      const dto = { name: 'Ash' };
      const result = await controller.create(dto);

      expect(result).toEqual(mockProfile);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('updatePokemon', () => {
    it('should update profile pokemon', async () => {
      const dto = { pokemonIds: [25] };
      const result = await controller.updatePokemon(1, dto);

      expect(result).toEqual(mockProfile);
      expect(service.updatePokemon).toHaveBeenCalledWith(1, dto);
    });
  });
});
