function myFunc(){

    let searchInput = document.getElementById("searchInput").value;
    console.log(`searchInput: ${searchInput}`);

    let obj = JSON.parse(jsonString);
    let index = obj.findIndex(function(item, i){
        return item.name === searchInput
    });

    if (index != -1) {
        expandMain();
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

        addMap();
    }
    event.preventDefault();
}

function expandMain(){

    if (typeof window.innerWidth != 'undefined') {
        viewportwidth = window.innerWidth;
    }

    if (viewportwidth >= 500) {
        document.getElementById("topBanner").style.animation =  "movingHeader 2s 1 forwards";
        document.getElementById("mainBody").style.animation =  "movingBody 2s 1 forwards";
    }
    else {
        document.body.style.marginTop = "0px";
        document.getElementById("h1").style.paddingTop = "0px";
    }
    document.getElementById("mainBody").style.display = "block";
    event.preventDefault();
}

 function addMap(){
    var googleMapApi = document.createElement("script");
    googleMapApi.setAttribute("async", "");
    googleMapApi.setAttribute("defer", "");
    googleMapApi.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXlGIU84NMenpp9ni_L4kMo9HOq7uHMgo&callback=initMap");
    document.body.appendChild(googleMapApi);
}

function initMap() {
    let searchInput = document.getElementById("searchInput").value;
    let obj = JSON.parse(jsonString);
    let index = obj.findIndex(function(item, i){
        return item.name === searchInput
    });
    let originLatData = `${obj[index].originLat}`;
    let originLongData = `${obj[index].originLong}`;

    var location = {lat: parseInt(originLatData, 10), lng: parseInt(originLongData, 10)};
    var map = new google.maps.Map(document.getElementById('map'), {
        center: location, zoom: 4});
    var marker = new google.maps.Marker({
        position: location, map: map});
}
