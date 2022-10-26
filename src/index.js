import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

searchBox.addEventListener("input",
    debounce(searchCountry, DEBOUNCE_DELAY)
);
function searchCountry() {
    let name = searchBox.value;
    if (name === "") {
        Notiflix.Notify.info('Please type a country name');
        resetList();
    } else {
        fetchCountries(name.trim())
            .then(countries => renderCountryList(countries))
            .catch(() => {
                Notiflix.Notify.failure('Oops, there is no country with that name');
                resetList();
        })
    }
}

function renderCountryList(countries) {
    if (countries.length > 10) {
        Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
        );
        resetList();
    } else if (countries.length <= 10 && countries.length >= 2) {
        resetList();

        const markup = countries.map(({ name, flags }) => {
            return `<li class= "country-list"><img class= "flag_img" src= "${flags.svg}">
            <h1>${name}</h1>
            </li>`
        })
            .join('');
        countryList.innerHTML = markup;
    } else if (countries.length === 1) {
        resetList();
        const markup = countries
            .map(({ name, flags, capital, population, languages }) => {
                return `<div class= "main">
            <img class= "flag_img" src= "${flags.svg}">
            <h2>${name}</h2>
            </div>
            <li class= "country_item"></li>
            <p><b>Capital</b>:${capital}</p>
            <li class= "country_item"></li>
            <p><b>Population</b>:${population}</p>
            <li class= "country_item"></li>
            <p><b>Languages</b>:${languages.map(({name})=> ' ' + name)}</p>`;
            })
            .join('');
        countryInfo.innerHTML = markup;
    }
   
}
const resetList = () => {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
};