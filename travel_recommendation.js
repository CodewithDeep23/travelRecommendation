const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const input = document.getElementById("searchInput");
const results = document.getElementById("results");

let data = {};

fetch("travel_recommendation_api.json")
    .then(res => res.json())
    .then(json => data = json);

searchBtn.addEventListener("click", () => {
    const keyword = input.value.toLowerCase().trim();
    results.innerHTML = "";

    if(keyword.includes("beach")){
        showList(data.beaches);
    }
    else if(keyword.includes("temple")){
        showList(data.temples);
    }
    else if(keyword.includes("country")){
        showCountries();
    }
});

clearBtn.addEventListener("click", () => {
    input.value = "";
    results.innerHTML = "";
});

function showList(list){
    list.forEach(item => {
        results.innerHTML += `
            <div class="card">
                <img src="${item.imageUrl}">
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
    });
}

function showCountries(){
    data.countries.forEach(country => {
        country.cities.forEach(city => {
            results.innerHTML += `
                <div class="card">
                    <img src="${city.imageUrl}">
                    <div>
                        <h3>${city.name}</h3>
                        <p>${city.description}</p>
                    </div>
                </div>
            `;
        });
    });
}