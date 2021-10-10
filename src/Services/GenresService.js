import HttpService from "./HttpService";
import Constants from "../Constants";

export async function getGenres() {
  const { data } = await HttpService.get(Constants.ApiEndPoint + "/genres");
  return data;
}

export async function getGenreById(id) {
  const { data } = await HttpService.get(
    Constants.ApiEndPoint + "/genres/" + id
  );
  return data;
}
