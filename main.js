let map = L.map('map')
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
const marker = L.marker([0, 0]).addTo(map)

const adress = document.querySelector(".adress-ip");
const locationAdress = document.querySelector(".location-adress");
const timezone = document.querySelector(".timezone-data");
const isp = document.querySelector(".name-isp");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search");

const API_URL = "http://ip-api.com/json/";
const API_FIELDS = "?fields=33615871";
const FIRST_URL = API_URL + API_FIELDS;


fetch(FIRST_URL)
.then((res) => res.json())
.then((res) => {
    console.log(res)
   const adressRaw = res.query;
   const ispRaw = res.isp;
   const cityRaw = res.city; 
   const countryRaw = res.country;
   const timezoneRaw = res.offset;
   const latRaw = res.lat;
   const lngRaw = res.lon;
   const postalcodeRaw = res.zip; 


searchInput.value = adressRaw;
adress.textContent = adressRaw;
timezone.textContent = `UTC ${timezoneRaw / 60 / 60}:00`;
isp.textContent = ispRaw;
locationAdress.textContent = `${cityRaw}, ${postalcodeRaw} ${countryRaw}`;
map.setView([latRaw, lngRaw], 13);
marker.setLatLng([latRaw, lngRaw]);


})

const findIP = () => {

const ip = searchInput.value;

const URL = API_URL + ip + API_FIELDS;
fetch(URL)
.then((res) => res.json())
.then((res) => {
    // const adressRaw = res.ip;
    console.log(res)
    if (res.status === "fail") {
        alert("Invalid IP adress! Please try again.")
    }
    else {
    const adressRaw = res.query;
    const ispRaw = res.isp;
    const cityRaw = res.city; 
    const countryRaw = res.country;
    const timezoneRaw = res.offset;
    const latRaw = res.lat;
    const lngRaw = res.lon;
    const postalcodeRaw = res.zip; 

// searchInput.value = adressRaw;
adress.textContent = ip;
timezone.textContent = `UTC ${timezoneRaw / 60 / 60}:00`;
isp.textContent = ispRaw;
locationAdress.textContent = `${cityRaw}, ${postalcodeRaw} ${countryRaw}`;
map.setView([latRaw, lngRaw], 13);
marker.setLatLng([latRaw, lngRaw]);
    }

})

}

const enterKeyChceck = e => {
    if(e.key === "Enter") {
        findIP()
    }
}

searchBtn.addEventListener("click", findIP);
searchInput.addEventListener("keyup", enterKeyChceck);