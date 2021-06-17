const BASE_URL = 'https://api.covid19api.com';

export const get = url => fetch(`${BASE_URL}/${url}`)
.then(response => response.json())
.then(result => result.Countries);