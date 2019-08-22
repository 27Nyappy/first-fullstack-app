const URL = '/api';

export function getCubs() {
    const url = `${URL}/cubs`;
    console.log(url);
    return fetch(url)
        .then(response => response.json());
}