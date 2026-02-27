import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './services/profile.service';
import { ProfileController } from './profile.controller';
import { PokemonModule } from '../pokemon/pokemon.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), PokemonModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
