(function () {
    let loadGoogleMapsOnce = 0;
    let moveMaindOnce = 0;
    let wordOfDay = "";

    document.getElementById("searchBox").addEventListener("submit", search);
    document.getElementById("wordDayName").addEventListener("click", loadWordOfTheDay);

    function search() {
        let searchInput = "";

        if (window.location.hash) {
            console.log("eh");
            //get the param from the end of the url and reset it
            searchInput = window.location.hash.substr(1);
            location.hash = "";
        } else {
            searchInput = document.getElementById("searchInput").value;
        }
        console.log(`searchInput: ${searchInput}`);

        //see if the word exists. If it doesn't then index = -1
        let obj = JSON.parse(jsonString);
        let index = obj.findIndex(function (item, i) {
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

    function loadWordOfTheDay() {
        window.location.hash = wordOfDay;
        search();
    }

    function expandMain() {
        if (typeof window.innerWidth !== 'undefined') {
            viewportwidth = window.innerWidth;
        }

        if (viewportwidth >= 500) {
            if (moveMaindOnce === 0) {
                document.getElementById("topBanner").style.animation = "movingHeader 2s 1 forwards";
                document.getElementById("mainBody").style.animation = "movingBody 2s 1 forwards";
                moveMaindOnce = moveMaindOnce + 1;
            }
        } else {
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

    function wordOfTheDay(obj) {
        let jsonLength = obj.length;
        let randomIndex = Math.floor(Math.random() * (jsonLength));
        let wordOfDaySection = document.getElementById("wordDayName");

        let name = `${obj[randomIndex].name}`;
        wordOfDay = name;
        wordOfDaySection.innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
        ;
        event.preventDefault();
    }

    function addMap() {
        let googleMapApi = document.createElement("script");
        googleMapApi.setAttribute("async", "");
        googleMapApi.setAttribute("defer", "");
        //calls the initMap() to actually create the map and position the marker 
        googleMapApi.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXlGIU84NMenpp9ni_L4kMo9HOq7uHMgo&callback=initMap");
        if (loadGoogleMapsOnce === 0) {
            document.body.appendChild(googleMapApi);
            loadGoogleMapsOnce = loadGoogleMapsOnce + 1;
        }
    }

})();

function initMap() {
    let searchInput = document.getElementById("searchInput").value;
    let obj = JSON.parse(jsonString);
    let index = obj.findIndex(function (item, i) {
        return item.name === searchInput;
    });

    let originLatData = `${obj[index].originLat}`;
    let originLongData = `${obj[index].originLong}`;

    let location = {lat: parseInt(originLatData, 10), lng: parseInt(originLongData, 10)};
    let map = new google.maps.Map(document.getElementById('map'), {
        center: location, zoom: 4});
    let marker = new google.maps.Marker({
        position: location, map: map});
}