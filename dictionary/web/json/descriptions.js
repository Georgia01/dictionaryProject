let jsonString = `
[{ 
    "name":"object-oriented",
    "description":"A form of programming based around the use of objects that encapsulate data into fields and provide methods of interacting with this data",
    "example":"images/Everitt.jpg",
    "origin":"..."
  },
  {
    "name":"programming",
    "description":"The process of how a computer program is written",
    "example":"images/fania.gif",
    "origin":"..."
  },
  {
    "name":"bug",
    "description":"An unexpected or incorrect result that is created by an error, failure or fault in a computer program",
    "example":"images/attwood.jpg",
    "origin":"..."
  }
]
`;

//print out first element
// <script src="json/descriptions.js"></script>
//<<script>
//(function(){
//  let demoData = document.getElementById("demo");
//
//  // creates a JavaScript object by parsing the JSON-formatted string from the file
//  let obj = JSON.parse(jsonString);
//
//  /*
//    EXERCISE 01:
//    Rewrite this to make it loop through all the lecturers' names. 
//    (Note the ES6 'template literal' syntax):
//  */
//  let theData =  `${obj.lecturers[1].firstName} ${obj.lecturers[1].lastName}`;
//  
//  // populates the chosen element's content with the data:
//  demoData.innerHTML = theData; 
//
//  /*
//    EXERCISE 02:
//    Once you have looped through all the data, present the 
//    results on the page, styled with CSS.
//  */
//}());
//</script>

// Go through multiple elements and priunt them all out
// <script src="json/descriptions.js"></script>
//<script>
//            (function (){
//                let demoData = document.getElementById("demo");
//                        // creates a JavaScript object by parsing the JSON-formatted string from the file
//                let obj = JSON.parse(jsonString);
//                        /*
//                         EXERCISE 01:
//                         Rewrite this to make it loop through all the lecturers' names. 
//                         (Note the ES6 'template literal' syntax):
//                         */
//                        let theData = "";
//                        let length = obj.lecturers.length;
//                        for (var i = 0; i < length; i++) {
//                            theData += `<tr>
//                                            <td class="pic"><a href='${obj.lecturers[i].website}'><img src='${obj.lecturers[i].picture}'></a></td>
//                                            <td> ${obj.lecturers[i].firstName} ${obj.lecturers[i].lastName} </td>\n\
//                                        </tr>`;
//                        }
//                // populates the chosen element's content with the data:
//                demoData.innerHTML = theData;
//                        /*
//                         EXERCISE 02:
//                         Once you have looped through all the data, present the 
//                         results on the page, styled with CSS.
//                         */
//                }());
//        </script>