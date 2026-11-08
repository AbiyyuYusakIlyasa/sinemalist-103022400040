import { UpdateFilmDto } from './dto/update-film.dto';
import { Controller, Get, Param, Post, Body, Patch, Delete, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

    @Get()
    getFilms(@Query('ditonton') ditonton?: string) {
  return this.filmsService.getFilms(ditonton);
    }

  @Get(':id')
  getFilmById(@Param('id') id: string) {
    return this.filmsService.getFilmById(id);
  }

  @Post()
  createFilm(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.createFilm(createFilmDto);
  }

  @Patch(':id')
    updateFilm(
        @Param('id') id: string,
        @Body() updateFilmDto: UpdateFilmDto,
) {
    return this.filmsService.updateFilm(id, updateFilmDto);
}

    @Delete(':id')
deleteFilm(@Param('id') id: string) {
  return this.filmsService.deleteFilm(id);
}

}
