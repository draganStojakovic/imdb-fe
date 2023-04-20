/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGenre } from 'app/types/IGenre';
import {
  IOMDb,
  IOMDbError,
  IRating,
  IMovieOMdb,
  IMovie,
} from 'app/types/IMovies';
import { IError, IErrors } from 'app/types/IError';

export function isObjOfType<T>(obj: unknown): obj is T {
  return !!obj;
}

function isGenre(arg: unknown): arg is IGenre {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'id' in arg &&
    typeof arg.id === 'string' &&
    'name' in arg &&
    typeof arg.name === 'string'
  );
}

function isRating(arg: unknown): arg is IRating {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'Source' in arg &&
    typeof arg.Source === 'string' &&
    'Value' in arg &&
    typeof arg.Value === 'string'
  );
}

export function isGenres(arg: any): arg is IGenre[] {
  return arg.every(isGenre);
}

function isOmdbRating(arg: any): arg is IRating[] {
  return arg.every(isRating);
}

export function isIMovie(arg: unknown): arg is IMovie {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'title' in arg &&
    typeof arg.title === 'string' &&
    'description' in arg &&
    arg.description === 'string' &&
    'coverImage' in arg &&
    arg.coverImage === 'string' &&
    'likes' in arg &&
    arg.likes === 'string' &&
    'id' in arg &&
    typeof arg.id === 'string' &&
    'dislikes' in arg &&
    typeof arg.dislikes === 'string' &&
    'views' in arg &&
    typeof arg.views === 'string' &&
    'genres' in arg &&
    typeof arg.genres === 'object' &&
    isGenres(arg.genres)
  );
}

export function isMovieOMdb(arg: unknown): arg is IMovieOMdb {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'title' in arg &&
    typeof arg.title === 'string' &&
    'description' in arg &&
    arg.description === 'string' &&
    'coverImage' in arg &&
    arg.coverImage === 'string' &&
    'genres' in arg &&
    typeof arg.genres === 'object' &&
    isGenres(arg.genres)
  );
}

export function isOMDbResponse(arg: unknown): arg is IOMDb {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'Title' in arg &&
    typeof arg.Title === 'string' &&
    'Year' in arg &&
    typeof arg.Year === 'string' &&
    'Rated' in arg &&
    typeof arg.Rated === 'string' &&
    'Released' in arg &&
    typeof arg.Released === 'string' &&
    'Runtime' in arg &&
    typeof arg.Runtime === 'string' &&
    'Genre' in arg &&
    typeof arg.Genre === 'string' &&
    'Director' in arg &&
    typeof arg.Director === 'string' &&
    'Writer' in arg &&
    typeof arg.Writer === 'string' &&
    'Actors' in arg &&
    typeof arg.Actors === 'string' &&
    'Plot' in arg &&
    typeof arg.Plot === 'string' &&
    'Language' in arg &&
    typeof arg.Language === 'string' &&
    'Country' in arg &&
    typeof arg.Country === 'string' &&
    'Awards' in arg &&
    typeof arg.Awards === 'string' &&
    'Poster' in arg &&
    typeof arg.Poster === 'string' &&
    'Metascore' in arg &&
    typeof arg.Metascore === 'string' &&
    'imdbRating' in arg &&
    typeof arg.imdbRating === 'string' &&
    'imdbVotes' in arg &&
    typeof arg.imdbVotes === 'string' &&
    'imdbID' in arg &&
    typeof arg.imdbID === 'string' &&
    'Type' in arg &&
    typeof arg.Type === 'string' &&
    'DVD' in arg &&
    typeof arg.DVD === 'string' &&
    'BoxOffice' in arg &&
    typeof arg.BoxOffice === 'string' &&
    'Production' in arg &&
    typeof arg.Production === 'string' &&
    'Website' in arg &&
    typeof arg.Website === 'string' &&
    'Response' in arg &&
    typeof arg.Response === 'string' &&
    'Ratings' in arg &&
    typeof arg.Ratings === 'object' &&
    isOmdbRating(arg.Ratings)
  );
}

export function isOMDbError(arg: unknown): arg is IOMDbError {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'Response' in arg &&
    typeof arg.Response === 'string' &&
    'Error' in arg &&
    typeof arg.Error === 'string'
  );
}

export function isErrors(arg: unknown): arg is IErrors {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'value' in arg &&
    typeof arg.value === 'string' &&
    'msg' in arg &&
    typeof arg.msg === 'string' &&
    'param' in arg &&
    typeof arg.param === 'string' &&
    'location' in arg &&
    typeof arg.location === 'string'
  );
}

function isError(arg: any): arg is IErrors[] {
  return arg.every(isError);
}

export function isErrorResponse(arg: unknown): arg is IError {
  return (
    !!arg &&
    typeof arg === 'object' &&
    'success' in arg &&
    typeof arg.success === 'boolean' &&
    'errors' in arg &&
    isError(arg.errors)
  );
}
