import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '../database/db.module';
import { PokemonModule } from '../pokemon/pokemon.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    PokemonModule,
    ProfileModule,
  ],
})
export class AppModule {}
