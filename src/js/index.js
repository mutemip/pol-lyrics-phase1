//DOM Element Selectors
const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')

//load API client - Hoisting
gapi.load("client", loadClient);

function loadClient(){
    gapi.client.setApiKey("AIzaSyCXd8-DzhjLSwKvOTPJzFJkZHiKvsPNAJs");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
    .then(() => console.log("GAPI client loaded for API"), 
    err => console.error("Error loading GAPI client for API", err));
}

const apiUrl = "https://api.lyrics.ovh";

form.addEventListener('submit', e => {
    e.preventDefault();
    searchValue = search.ariaValueMax.trim();
    //make sure searchVAlue is not empty
    if(!searchValue){
        alert("Enter something to search");
    }else{
        searchSong(searchValue);
    }
    //searchValue.reset();
})

