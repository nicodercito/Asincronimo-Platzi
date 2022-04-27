const fetchData = require ('../utils/fetch')
const API = 'https://rickandmortyapi.com/api/characters/'

fetchData(API)
.then(data =>{
    console.log(data.info.count);
    return fetchData (`{API}${data.results[0].id}`)
})
.then(data => {
    console.log(data.name);
    return fetchData(data.origin.url)
})
.then(data => {
    console.log(data.dimension);
})
.catch(err => console.log(err));