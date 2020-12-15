const TOKEN = "f390442bb40f4ac8918b6564088a53a775a00612";

export class API {
  static updateMovie(movie_id, body) {
    return fetch(`http://localhost:8000/api/movies/${movie_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${TOKEN}`
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
  }

  static createMovie(body) {
    return fetch("http://localhost:8000/api/movies/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${TOKEN}`
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json())
  }
}
