let allCountries = {};
async function getData() {
    let response = await fetch("https://restcountries.com/v3.1/all#");
    let data = await response.json();
    allCountries = data;
    console.log(data);
    createCountryCard(data);
}

function createCountryCard(data) {
    let countriesCard = document.querySelector(".countries-card");
    countriesCard.innerHTML = "";
    data.forEach((value)=> {
        // console.log(value.name.common);
        let card = document.createElement("a");
        card.href = `/country.html?name=${value.name.common}`
        card.classList.add("flex")
        card.classList.add("card");
        
        let cardContent = `
                <img src="${value.flags.svg}" alt="South georgia">

                <div class="card-content">
                    <span class="countries-name">${value.name.common}</span>
                    <div class="population">
                        <p><b>Population:&nbsp;&nbsp;</b><span class="value">${value.population}</span></p>
                    </div>
                    <div class="region">
                        <p><b>Region:&nbsp;&nbsp;</b><span class="value">${value.region}</span></p>
                    </div>
                    <div class="capital">
                        <p><b>Capital:&nbsp;&nbsp;</b><span class="value">${value.capital}</span></p>
                    </div>
                </div>`;
        card.innerHTML = cardContent;
        countriesCard.appendChild(card);
    })
}

getData();

let input = document.querySelector(".input-box input");

input.addEventListener("input", ()=> {
   let filteredCountries = allCountries.filter((country) => {
    return country.name.common.toLowerCase().includes(input.value.toLowerCase());
   });

   createCountryCard(filteredCountries);
})

let regionCountriesUl = document.querySelector(".region-countries ul");

regionCountriesUl.addEventListener("click", (e) => {
    console.log(e.target.innerText);

    async function getRegionCountries(country) {
        let response = await fetch(`https://restcountries.com/v3.1/region/${country}`);
        let data = await response.json();
        createCountryCard(data);
    }

    getRegionCountries(e.target.innerText);
})

let filterToggle = document.querySelector(".filter-box i");
let regionCountries = document.querySelector(".region-countries");
filterToggle.addEventListener("click", () => {
    regionCountries.classList.toggle("hidden");
    filterToggle.classList.toggle("degree-180");
})