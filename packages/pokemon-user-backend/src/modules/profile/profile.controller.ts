import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProfileService } from './services/profile.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfilePokemonDto } from './dto/update-profile-pokemon.dto';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  findAll(): Promise<Profile[]> {
    return this.profileService.findAll();
  }

  @Post()
  create(@Body() dto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(dto);
  }

  @Put(':id/pokemon')
  updatePokemon(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProfilePokemonDto
  ): Promise<Profile> {
    return this.profileService.updatePokemon(id, dto);
  }
}
