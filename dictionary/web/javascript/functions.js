/*
 * Self executing function used because certain values needed a larger scope in 
 * order to ensure certain behaviour like loading the googleMapsAPI was only carried out 
 * once.
 */
(function () {
    let loadGoogleMapsOnce = 0;
    let moveMaindOnce = 0;
    let randomWord = "";
    let allNavItems = 0;
    let obj = JSON.parse(jsonString);
    
    /*
     * Create a new element for the GoogleMapApi to allow it to be used in other 
     * functions.
     */
    let googleMapApi = document.createElement("script");
    
    /*
     * Add events to the html elements so that JavaScript functions can be 
     * called when the user performs an action e.g. click or form submission.
     */
    document.getElementById("searchBox").addEventListener( "submit", search);
    document.getElementById("randomWord").addEventListener("click", loadRandomWord);

    /**
     * Takes in the users input and searches the json file to see if a word is 
     * defined in there. If the word is then its details are populated into the 
     * relevent definition, example and origin areas, else the navigation view
     * is displayed showing the user alternative words they can search for.
     * 
     * @param {type} event takes in the event that caused the method to execute
     */
    function search(event) {
        let searchInput = "";

        /*
         * The searched word could either be typed in by the user or set as part
         * of the url if a navigational or the random word of the day button is
         * clicked. So if there is no hash then the user has typed the answer into
         * the searchInput element so get that word.
         */
        if (window.location.hash) {
            searchInput = window.location.hash.substr(1);
        } else {
            searchInput = document.getElementById("searchInput").value;
        }

        //see if the word exists. If it doesn't then index = -1
        let index = obj.findIndex(function (item, i) {
            return item.name === searchInput;
        });

        // Needed for the first time the search is run to display the main page
        document.getElementById("mainBody").style.display = "block";
        
        if (index !== -1) {
            //display the main view with the found word
            document.getElementById("mainContent").style.display = "block";
            document.getElementById("wordList").style.display = "none";
            document.getElementById("errorBox").style.display = "none";
            fillInDetails(obj, index);
            addMap(index);
            createRandomWord(obj);
        } else {
            //display the navigational view
            document.getElementById("mainContent").style.display = "none";
            document.getElementById("wordList").style.display = "block";
            document.getElementById("errorBox").style.display = "block";
            getFullNavigation();
        }
        expandMain(e);
        window.location.hash = "";
        event.preventDefault();
    }

    /**
     * This will load the selected random word into the main view.
     * 
     * @param {type} event pass triggering event into the search function
     */
    function loadRandomWord(event) {
        window.location.hash = randomWord;
        search(event);
    }

    /**
     * This applies the animation to the title section and main section which 
     * addes some CSS3 animation style to the elements so that slide upwards.
     */
    function expandMain() {
        if (typeof window.innerWidth !== 'undefined') {
            viewportwidth = window.innerWidth;
        }

        //For mobile views do not use the slide animation, simply change the padding
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

    /**
     * Fills in the searched words details into the definition, example and 
     * origin sections. 
     * 
     * @param {type} obj contains the word definitions
     * @param {type} index the index of the word in the definitions object
     */
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

        //Can be multiple examples so loop through and print them all
        let exampleDataSection = document.getElementById("example");
        let exampleData = obj[index].example;
        let finalExampleOutput = "";
        for (i of exampleData) {
            finalExampleOutput += i + "</br></br>";
        }
        exampleDataSection.innerHTML = finalExampleOutput;
    }

    /**
     * Fills in the random word section by getting all of the words from the json
     * descriptions file and chooses a word using a random index generated.
     * 
     * @param {type} obj contains all of the word definitions from the json file
     */
    function createRandomWord(obj) {
        let jsonLength = obj.length;
        let randomIndex = Math.floor(Math.random() * (jsonLength));
        let randomWordSection = document.getElementById("randomWord");

        let name = `${obj[randomIndex].name}`;
        randomWord = name;
        randomWordSection.innerHTML = name.charAt(0).toUpperCase() + name.slice(1);
    }
    
    /**
     * Changes the allNavItems value to 1 so that the getSingleNav function will
     * display all of the defined words
     */
    function getFullNavigation() {
       allNavItems = 1;
       getSingleNav();
    }

    /**
     * Compares words against each other to see which one is before another 
     * alphabetically. Used to sort the words for the navigation view.
     * 
     * @param {type} firstName first word to be searched
     * @param {type} secondName second word to be searched
     * @returns {Number} returns -1 if the firstName is smaller (so sooner in the
     *      alphabet) than the secondName, 1 if firstName is bigger (so late in the
     *      alphabet) than the secondName and 0 if they are equal
     */
    function compareStrings(firstName, secondName) {
        firstName = firstName.toLowerCase();
        secondName = secondName.toLowerCase();
        return (firstName < secondName) ? -1 : (firstName > secondName) ? 1 : 0;
    }

    /**
     * Gets the word chosen to view from the navigational menu and sets that as 
     * part of the pages url so that the search method will use it and populate
     * the relsvent fields. The event in question is the button clicked that caused
     * the method to be called. The buttons have an id of the word so that it can
     * be passed in for this function to use.
     *  
     * @param {type} event button that triggered the event
     */
    function loadWordFromNav(event) {
        window.location.hash = event.target.id;
        search(event);
    }

    /**
     * Creates a list of items the user can search through. Shows all words if the
     * user has entered a word into the search that does not exist in the json
     * definition file. Shows all words beginning with the specified letter if a
     * navigational letter button is pressed. 
     * 
     * @param {type} event button that triggered this method
     */
    function getSingleNav(event) {
        let finalNavOutput = "";
        let name;
        
        //sort into alphabetical order
        let sortedValues = obj.sort(function (firstWord, secondWord) {
            return compareStrings(firstWord.name, secondWord.name);
        });
        
        //go through all of the json definitions
        for (i = 0; i < sortedValues.length; i++) {
            name = sortedValues[i].name;
            //return all items if the allNavItems flag has been set
            if (allNavItems === 1) {
                finalNavOutput += "<button class='navLink' id='" + name + "'>" + name.charAt(0).toUpperCase() + name.slice(1) + "</button></br>";
            }
            else if (name.charAt(0) === event.target.id) {
                finalNavOutput += "<button class='navLink' id='" + name + "'>" + name.charAt(0).toUpperCase() + name.slice(1) + "</button></br>";
            }
        }
        allNavItems = 0;
        
        /*
         * Put the navigation links in columns for views bigger than 320px. Two
         * columns for some views and any view over 500px gets three columns
         */
        let width = (document.getElementById('mainBody').offsetWidth);
        if (width > 320 && width < 500) {
            let width = (document.getElementById('mainBody').offsetWidth)/2 - 40;
            document.getElementById("navColumns").style.columns = width + "px 2";
        }
        else if (width >= 500){
            let width = (document.getElementById('mainBody').offsetWidth)/3 - 40;
            document.getElementById("navColumns").style.columns = width + "px 3";
        }
        
        //if no words in that selection then let the user know
        if (finalNavOutput === "") {
            finalNavOutput = "<strong>No words for this letter.</strong>";
        }
        
        let navSection = document.getElementById("wordList");
        navSection.innerHTML = finalNavOutput;
        
        /**
         * add events to the newly created buttons so they can call the loadWordFromNav 
         * method
         */
        let allItems = document.getElementsByClassName("navLink");
        for (var i = 0; i < allItems.length; i++) {
            allItems[i].addEventListener('click', loadWordFromNav);
        }
        document.getElementById("mainContent").style.display = "none";
        document.getElementById("wordList").style.display = "block";
    }
    
    /**
     * Self executing function to add the getSingleNav to all of the navigational
     * buttons so they can call the above method.
     */
    (function () {
        let navClass = document.getElementsByClassName("navigationButton");
        for (var i = 0; i < navClass.length; i++) {
            navClass[i].addEventListener('click', getSingleNav);
        }
    })();
    
    /**
     * Adds the google map to the page
     * 
     * @param {type} index the index of the word being searched from the json file
     */
    function addMap(index) {
        //set the default attributes for the api
        googleMapApi.setAttribute("async", "");
        googleMapApi.setAttribute("defer", "");
        
        /*
         * The src attribute uses a callback function so to use the index with the
         * function requires we set it as an attribute to get outside of this function
         */
        googleMapApi.setAttribute("data-index", index);
        googleMapApi.setAttribute("id", "googleMaps");
        
        //calls the initMap() to actually create the map and position the marker 
        googleMapApi.setAttribute("src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyAXlGIU84NMenpp9ni_L4kMo9HOq7uHMgo&callback=initMap");
        
        //only load the api once to prevent errors occurring
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

/**
 * Creates the individual map for the loaded element. Gets the longitude and 
 * latitude from the json file to mark the exact location with a marker and then
 * zooms out to show the surrounding area. 
 */
function initMap() {
    let index = document.getElementById("googleMaps").getAttribute("data-index");
    let obj = JSON.parse(jsonString);

    let originLatData = `${obj[index].originLat}`;
    let originLongData = `${obj[index].originLong}`;
    let location = {lat: parseInt(originLatData, 10), lng: parseInt(originLongData, 10)};
    
    //create the object and center the location
    let googleMap = new google.maps.Map(document.getElementById('map'), {
        center: location, zoom: 4});
    let marker = new google.maps.Marker({position: location, map: googleMap});
}