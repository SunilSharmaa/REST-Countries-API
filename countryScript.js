window.onload = () => {
    function getQueryString() {
        let urlParam = new URLSearchParams(location.search);
        let params = urlParam.get("name");
        
        document.title = params;
        let url = `https://restcountries.com/v3.1/name/${params}?fullText=true`;
        getData(url);
    }
    
    async function getData(countryUrl) {
        let response = await fetch(countryUrl);
        let data = await response.json();
        fillingPage(data[0]);
    }

    function fillingPage(data) {
        let countryName = data.name.common;
        let nativeName = "NA";
        let population = data.population;
        let region = data.region;
        let subRegion = data.subregion;
        let capital = data.capital;
        let topLevelDomain = data.tld
        let currencies = "NA";
        let languages = "NA";
        let flag = data.flags.svg;
        let borderCountries = data.borders;

        if(data.name.nativeName) {
            nativeName = Object.values(data.name.nativeName)[0].common;
        }

        if(data.currencies) {
            currencies = Object.values(data.currencies)[0].name
        }

        if(data.languages) {
            let temp = Object.values(data.languages)
            languages = temp.join(", ");
        }

        let countrySection = document.createElement("div");
        countrySection.classList.add("country-section");
        countrySection.classList.add("flex");
        countrySection.innerHTML = `
        <div class="flag-section">
                <img src="${flag}" alt="${countryName} flag">
              </div>

              <div class="country-content">
                  <div class="country-name">
                    <h2 class="country-heading">${countryName}</h2>
                    <div class="country-details flex">
                        <div class="section-left flex">
                            <p><b>Native Name:</b> <span class="value">${nativeName}</span></p>
                            <p><b>Population:</b> <span class="value">${population}</span></p>
                            <p><b>Region:</b> <span class="value">${region}</span></p>
                            <p><b>Sub Region:</b> <span class="value">${subRegion}</span></p>
                            <p><b>Capital:</b> <span class="value">${capital}</span></p>
                        </div>
                        <div class="section-right flex">
                            <p><b>Top Level Domain:</b> <span class="value">${topLevelDomain}</span></p>
                            <p><b>Currencies:</b> <span class="value">${currencies}</span></p>
                            <p><b>Languages:</b> <span class="value">${languages}</span></p>
                        </div>
                    </div>

                    <div class="border-countries flex">
                        <p><b>Border Countries:</b></p>

                        
                    </div>
                  </div>
              </div>`

         let main = document.querySelector("main");
         main.appendChild(countrySection);

         createBorderCountries(borderCountries);
    }

    

    let backButton = document.querySelector(".back-button");

    backButton.addEventListener("click", ()=> {
        window.history.back();
    })

    function createBorderCountries(border) {
        let borderCountriesDiv = document.querySelector(".border-countries");
        
        if(border === undefined) {
            let notAvailable = document.createElement("span");
            notAvailable.classList.add("value");
            notAvailable.innerText = "NA";
            borderCountriesDiv.appendChild(notAvailable);
        } else {
            border.forEach((countries) => {
                fetch(`https://restcountries.com/v3.1/alpha/${countries}`)
                .then((res) => res.json())
                .then((data) => {
                    let borderCountryButton = document.createElement("a");
                    borderCountryButton.href = `/country.html?name=${data[0].name.common}`;
                    borderCountryButton.innerHTML = `<button class="border-country-btn">${data[0].name.common}</button>`;
                    borderCountriesDiv.appendChild(borderCountryButton);
                })
            })
        }

    }


    
    getQueryString();
}