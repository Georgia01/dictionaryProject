var loadGoogleMapsOnce = 0;
var moveMaindOnce = 0;

function search(){

    let searchInput = document.getElementById("searchInput").value;
    console.log(`searchInput: ${searchInput}`);

    //see if the word exists. If it doesn't then index = -1
    let obj = JSON.parse(jsonString);
    let index = obj.findIndex(function(item, i){
        return item.name === searchInput;
    });
    
    document.getElementById("mainBody").style.display = "block";
    if (index !== -1) {
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("wordList").style.display = "none";
        fillInDetails(obj, index);
        addMap();
        wordOfTheDay(obj);
    } else {
        document.getElementById("mainContent").style.display = "none";
        document.getElementById("wordList").style.display = "block";
    }
    
    expandMain();
    event.preventDefault();
}

function expandMain(){
    if (typeof window.innerWidth !== 'undefined') {
        viewportwidth = window.innerWidth;
    }

    if (viewportwidth >= 500) {
        if (moveMaindOnce === 0) {
            document.getElementById("topBanner").style.animation =  "movingHeader 2s 1 forwards";
            document.getElementById("mainBody").style.animation =  "movingBody 2s 1 forwards";
            moveMaindOnce = moveMaindOnce + 1;
        }
    }
    else {
        document.body.style.marginTop = "0px";
        document.getElementById("pageHeader").style.paddingTop = "0px";
    }
    event.preventDefault();
}

 function fillInDetails(obj, index) {

    let nameSection = document.getElementById("name");
    let nameData = `${obj[index].name}`;
    nameSection.innerHTML = nameData.charAt(0).toUpperCase() + nameData.slice(1);

    let typeSection = document.getElementById("type");
    let typeData = "(" + `${obj[index].type}` + ")";
    typeSection.innerHTML = typeData;

    let defintionDataSection = document.getElementById("definition");
    let definitionData = `${obj[index].description}`;
    defintionDataSection.innerHTML = definitionData;

    let exampleDataSection = document.getElementById("example");
    let exampleData = obj[index].example;
    let finalExampleOutput = "";

    for (i of exampleData) {
        finalExampleOutput += i + "</br></br>";
    }
    exampleDataSection.innerHTML = finalExampleOutput;
}

function wordOfTheDay(obj){
    var jsonLength = obj.length;
    var randomIndex = Math.floor(Math.random()*(jsonLength+1)); 
    
    let wordOfDaySection = document.getElementById("wordDayName");
    let name = `${obj[randomIndex].name}`;
    console.log(`name: ${name}`);
    wordOfDaySection.innerHTML = name;
    event.preventDefault();
}

 function addMap(){
    var googleMapApi = document.createElement("script");
    googleMapApi.setAttribute("async", "");
    googleMapApi.setAttribute("defer", "");
    //calls the initMap() to actually create the map and position the marker 
    googleMapApi.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXlGIU84NMenpp9ni_L4kMo9HOq7uHMgo&callback=initMap");
    if (loadGoogleMapsOnce === 0) {
        document.body.appendChild(googleMapApi);
        loadGoogleMapsOnce = loadGoogleMapsOnce + 1;
    }
}

function initMap() {
    let searchInput = document.getElementById("searchInput").value;
    let obj = JSON.parse(jsonString);
    let index = obj.findIndex(function(item, i){
        return item.name === searchInput;
    });
    
    let originLatData = `${obj[index].originLat}`;
    let originLongData = `${obj[index].originLong}`;

    var location = {lat: parseInt(originLatData, 10), lng: parseInt(originLongData, 10)};
    var map = new google.maps.Map(document.getElementById('map'), {
        center: location, zoom: 4});
    var marker = new google.maps.Marker({
        position: location, map: map});
}
