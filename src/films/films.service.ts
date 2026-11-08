import { UpdateFilmDto } from './dto/update-film.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import filmsData from '../films.json';
import { CreateFilmDto } from './dto/create-film.dto';

@Injectable()
export class FilmsService {
  private films = [...filmsData];

  getFilms(ditonton?: string) {
  if (ditonton === 'true') {
    return this.films.filter((film) => film.sudahDitonton === true);
  }

  if (ditonton === 'false') {
    return this.films.filter((film) => film.sudahDitonton === false);
  }

  return this.films;
}

  getFilmById(id: string) {
    const film = this.films.find((item) => item.id === id);

    if (!film) {
      throw new NotFoundException(`Film dengan ID ${id} tidak ditemukan`);
    }

    return film;
  }

  createFilm(createFilmDto: CreateFilmDto) {
    const newFilm = {
      id: String(Date.now()),
      ...createFilmDto,
      sudahDitonton: createFilmDto.sudahDitonton ?? false,
    };

    this.films.push(newFilm);

    return newFilm;
  }

  updateFilm(id: string, updateFilmDto: UpdateFilmDto) {
  const film = this.films.find((item) => item.id === id);

  if (!film) {
    throw new NotFoundException(`Film dengan ID ${id} tidak ditemukan`);
  }

  film.sudahDitonton = updateFilmDto.sudahDitonton;

  return film;
}

deleteFilm(id: string) {
  const filmIndex = this.films.findIndex((item) => item.id === id);

  if (filmIndex === -1) {
    throw new NotFoundException(`Film dengan ID ${id} tidak ditemukan`);
  }

  const deletedFilm = this.films.splice(filmIndex, 1);

  return {
    message: 'Film berhasil dihapus',
    data: deletedFilm[0],
  };
}
}
