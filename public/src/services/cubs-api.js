const URL = 'https://evan-antonalla-wild-cubs.herokuapp.com/api';

export function getCubs() {
    const url = `${URL}/cubs`;
    return fetch(url)
        .then(response => response.json());
}