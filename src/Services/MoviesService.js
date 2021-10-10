import HttpService from "./HttpService";
import Constants from "../Constants";
import _loggerService from "./_loggerService";

export const getPageSize = 3;
export const currentPage = 1;
export const currentFilter = "";

export async function getMovies() {
  try {
    const { data } = await HttpService.get(Constants.ApiEndPoint + "/movies");
    return data;
  } catch (ex) {
    _loggerService.captureEx("saveMovie-", ex);
    return null;
  }
}

export async function getMovie(id) {
  try {
    const { data } = await HttpService.get(
      Constants.ApiEndPoint + "/movies/" + id
    );

    return data;
  } catch (ex) {
    _loggerService.captureEx("saveMovie-", ex);
    return null;
  }
}

export async function saveMovie(movie) {
  try {
    const { data } = await HttpService.put(
      Constants.ApiEndPoint + "/movies/" + movie._id.toString(),
      {
        title: movie.title,
        genreId: movie.genreId,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
      }
    );

    return data;
  } catch (ex) {
    _loggerService.captureEx("saveMovie-", ex);
    return null;
  }
}

export async function createMovie(movie) {
  try {
    movie = {
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      genreId: movie.genre._id,
      liked: false,
    };
    const { data } = await HttpService.post(
      Constants.ApiEndPoint + "/movies",
      movie
    );

    return data;
  } catch (ex) {
    _loggerService.captureEx("createMovie-", ex);
    return null;
  }
}

export async function deleteMovie(id) {
  try {
    await HttpService.delete(Constants.ApiEndPoint + "/movies/" + id);
  } catch (ex) {
    if (ex.response && ex.response.status === 404)
      _loggerService.captureEx("createMovie-", ex);
  }
}
