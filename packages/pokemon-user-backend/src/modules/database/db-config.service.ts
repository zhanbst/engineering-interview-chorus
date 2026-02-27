import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Profile } from '../profile/entities/profile.entity';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST', 'localhost'),
      port: this.configService.get<number>('DB_PORT', 5432),
      username: this.configService.get<string>('DB_USERNAME', 'admin'),
      password: this.configService.get<string>('DB_PASSWORD', 'admin'),
      database: this.configService.get<string>('DB_NAME', 'pokemon'),
      entities: [Pokemon, Profile],
      synchronize: true,
    };
  }
}
