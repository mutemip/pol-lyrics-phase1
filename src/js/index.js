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

//event listener for key up
const searchOnKeyUp =  () => {
    searchValue = search.value.trim();
    searchSong(searchValue)
}

//searchSong Fn
async function searchSong(searchVAlue){
    const searchResult = await fetch(`${apiUrl}/suggest/${searchVAlue}`)
    const data = await searchResult.json();

    //call showData fn
    showData(data);
}

function showData(data){
    result.innerHTML = `
   
    <ul class="song-list">
      ${data.data
        .map(song=> `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</span>
                </li>`
        )
        .join('')}
    </ul>
  `;
  document.getElementById('here').innerHTML = ''
}

//e listener for get lyrics btn
result.addEventListener('click', e=>{
    const clickElement = e.target;

    //check clicked element
    if (clickElement.tagName === 'SPAN'){
        const artist = clickElement.getAttribute('data-artist');
        const songTitle = clickElement.getAttribute('data-songtitle');

        getLyrics(artist, songTitle)
    }
})