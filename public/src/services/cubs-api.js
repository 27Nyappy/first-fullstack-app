const URL = '/api';

export function getCubs() {
    const url = `${URL}/cubs`;
    return fetch(url)
        .then(response => response.json())
        .then(res => {
            console.log('in fetch', res);
            return res;
        });
}

export function getSizes() {
    const url = `${URL}/sizes`;
    return fetch(url)
        .then(response => response.json());
}

export function addCub(cub) {
    const url = `${URL}/cubs`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cub)
    })
        .then(response => response.json()); 
}