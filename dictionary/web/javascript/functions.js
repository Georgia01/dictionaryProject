(function () {
    let loadGoogleMapsOnce = 0;
    let moveMaindOnce = 0;
    let randomWord = "";
    let allNavItems = 0;
    let obj = JSON.parse(jsonString);
    
    let googleMapApi = document.createElement("script");
    document.getElementById("searchBox").addEventListener( "submit", search);
    document.getElementById("randomWord").addEventListener("click", loadRandomWord);

    function search(event) {
        let searchInput = "";

        if (window.location.hash) {
            //get the param from the end of the url and reset it
            searchInput = window.location.hash.substr(1);
        } else {
            searchInput = document.getElementById("searchInput").value;
        }

        //see if the word exists. If it doesn't then index = -1
        let index = obj.findIndex(function (item, i) {
            return item.name === searchInput;
        });

        document.getElementById("mainBody").style.display = "block";
        if (index !== -1) {
            document.getElementById("mainContent").style.display = "block";
            document.getElementById("wordList").style.display = "none";
            document.getElementById("errorBox").style.display = "none";
            fillInDetails(obj, index);
            addMap(index);
            createRandomWord(obj);
        } else {
            document.getElementById("mainContent").style.display = "none";
            document.getElementById("wordList").style.display = "block";
            document.getElementById("errorBox").style.display = "block";
            getFullNavigation();
        }

        expandMain(e);
        window.location.hash = "";
        event.preventDefault();
    }

    function loadRandomWord(event) {
        window.location.hash = randomWord;
        search(event);
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

    function createRandomWord(obj) {
        let jsonLength = obj.length;
        let randomIndex = Math.floor(Math.random() * (jsonLength));
        let randomWordSection = document.getElementById("randomWord");

        let name = `${obj[randomIndex].name}`;
        randomWord = name;
        randomWordSection.innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
    }

    function getFullNavigation() {
       allNavItems = 1;
       getSingleNav();
    }

    function compareStrings(firstName, secondName) {
        firstName = firstName.toLowerCase();
        secondName = secondName.toLowerCase();
        return (firstName < secondName) ? -1 : (firstName > secondName) ? 1 : 0;
    }

    function loadWordFromNav(event) {
        window.location.hash = event.target.id;
        search(event);
    }

    function getSingleNav(event) {
        let finalNavOutput = "";
        let name;
        
        //sort into alphabetical order
        let sortedValues = obj.sort(function (firstWord, secondWord) {
            return compareStrings(firstWord.name, secondWord.name);
        });
        
        for (i = 0; i < sortedValues.length; i++) {
            name = sortedValues[i].name;
            if (allNavItems === 1) {
                finalNavOutput += "<button class='navLink' id='" + name + "'>" + name.charAt(0).toUpperCase() + name.slice(1) + "</button></br>";
            }
            else if (name.charAt(0) === event.target.id) {
                finalNavOutput += "<button class='navLink' id='" + name + "'>" + name.charAt(0).toUpperCase() + name.slice(1) + "</button></br>";
            }
        }
        allNavItems = 0;
        let width = (document.getElementById('mainBody').offsetWidth);
        if (width > 320 && width < 500) {
            let width = (document.getElementById('mainBody').offsetWidth)/2 - 40;
            document.getElementById("navColumns").style.columns = width + "px 2";
        }
        else if (width >= 500){
            let width = (document.getElementById('mainBody').offsetWidth)/3 - 40;
            document.getElementById("navColumns").style.columns = width + "px 3";
        }
        
        if (finalNavOutput === "") {
            finalNavOutput = "<strong>No words for this letter.</strong>";
        }
        
        let navSection = document.getElementById("wordList");
        navSection.innerHTML = finalNavOutput;
        
        let allItems = document.getElementsByClassName("navLink");
        for (var i = 0; i < allItems.length; i++) {
            allItems[i].addEventListener('click', loadWordFromNav);
        }
        
        document.getElementById("mainContent").style.display = "none";
        document.getElementById("wordList").style.display = "block";
    }
    
    (function () {
        let navClass = document.getElementsByClassName("navigationButton");
        for (var i = 0; i < navClass.length; i++) {
            navClass[i].addEventListener('click', getSingleNav);
        }
    })();
    
    function addMap(index) {
        googleMapApi.setAttribute("async", "");
        googleMapApi.setAttribute("defer", "");
        googleMapApi.setAttribute("data-index", index);
        googleMapApi.setAttribute("id", "googleMaps");
        
        //calls the initMap() to actually create the map and position the marker 
        googleMapApi.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXlGIU84NMenpp9ni_L4kMo9HOq7uHMgo&callback=initMap");
        if (loadGoogleMapsOnce === 0) {
            document.body.appendChild(googleMapApi);
            googleMapApi.removeAttribute("src");
            loadGoogleMapsOnce = loadGoogleMapsOnce + 1;
        } 
        else {
            initMap();
        }
    }

})();

function initMap() {
    let searchInput;

    let index = document.getElementById("googleMaps").getAttribute("data-index");
    let obj = JSON.parse(jsonString);

    let originLatData = `${obj[index].originLat}`;
    let originLongData = `${obj[index].originLong}`;
    let location = {lat: parseInt(originLatData, 10), lng: parseInt(originLongData, 10)};
    let googleMap = new google.maps.Map(document.getElementById('map'), {
        center: location, zoom: 4});
    let marker = new google.maps.Marker({position: location, map: googleMap});
}