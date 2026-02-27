import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './services/pokemon.service';
import { PokemonSeedService } from './services/pokemon-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonSeedService],
  exports: [TypeOrmModule],
})
export class PokemonModule {}
