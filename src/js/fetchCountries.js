export function fetchCountries(name) {
    return fetch(
      `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
  
        console.log(response);
        return response.json();
      })
      .catch(err => console.log(err));
  };