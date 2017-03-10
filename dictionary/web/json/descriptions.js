let jsonString = `
[{ 
    "name":"object-oriented",
    "type":"noun",
    "description":"A form of programming based around the use of objects that encapsulate data into fields and provide methods of interacting with this data",
    "example": ["Java and PHP are examples of object-oriented languages.", "Object-oriented languages work around the concept of data being encapsulated in data structures called objects."],
    "originLat":"37.7749",
    "originLong":"122.4194"
  },
  {
    "name":"programming",
    "type":"adjective",
    "description":"The process of how a computer program is written",
    "example": ["I will be programming a calculator later.", "Programming can be a time consuming process as you may have to fix and errors that occur."], 
    "originLat":"37.9838",
    "originLong":"23.7275"
  },
  {
    "name":"bug",
    "type":"noun",
    "description":"An unexpected or incorrect result that is created by an error, failure or fault in a computer program",
    "example": ["There is a bug in this program causing an ArrayOutOfBounds exception", "There must be a bug in this code somewhere.", "I have found the software bug."],
    "originLat":"36.546296",
    "originLong":"-78.6569"
  },
  { 
    "name":"integer",
    "type":"noun",
    "description":"A data type that represents whole numbers - numbers which do not possess a decimal point. From the latin word meaning whole",
    "example": ["An integer can hold the number 32", "The number 2.5 is not an integer."],
    "originLat":"52.3555",
    "originLong":"-1.1743"
  },
  {
    "name":"variable",
    "type":"noun",
    "description":"A symbol or object that contains a value from a range of various values.",
    "example": ["One of my variables will hold the value true whilst another holds the number 42."], 
    "originLat":"46.2276",
    "originLong":"2.2137"
  },
  {
    "name":"parameter",
    "type":"noun",
    "description":"Similar to a variable, a parameter is a symbol or object that holds a value. Parameter is the term more commonly associated with object-oriented programming methods though.",
    "example": ["This value will be passed as a paremeter into the sqaure root method which will then return that values square root."],
    "originLat":"39.0742",
    "originLong":"21.8243"
  },
  { 
    "name":"loop",
    "type":"noun",
    "description":"A construct that allows repetitive code to be ececuted multiple times. Each language will have its own constructs to carry out this behaviour but some popular ones are the for and while loops.",
    "example": ["I will loop this code so that it repeates whilst there are numbers left in the array", "A for loop will let me count and print the numbers from 0 to 100."],
    "originLat":"56.4907",
    "originLong":"-4.2026"
  },
  {
    "name":"array",
    "type":"adjective",
    "description":"A data struct that allows multiple values to be stored together. Usually only values of the same type can be stored in an array.",
    "example": ["This array will hold the numbers 1 to 10."], 
    "originLat":"46.2276",
    "originLong":"2.2137"
  },
  {
    "name":"method",
    "type":"noun",
    "description":"Code that has been encapsulated into a form so that it can be used again and again without having to repeat the same code.",
    "example": ["I will vreate a method that will open the screen reader for me.", "I will use this method to sum up any array of numbers.."],
    "originLat":"41.9028",
    "originLong":"12.4964"
  },
  { 
    "name":"brackets",
    "type":"noun",
    "description":"A punctuation mark usually found with another that is used to enclose code. Has various effects which depends on the language.",
    "example": ["Adding brackets after a word makes it into a method."],
    "originLat":"37.0902",
    "originLong":"-95.7129"
  },
  {
    "name":"class",
    "type":"adjective",
    "description":"In object-oriented programming a class is an construct which contains the blueprints on how to create an object. Contains the objects values and associated methods.",
    "example": ["This class represents the instructions on how to create a car object.", "This class will be used to show a watch's properties and methods."], 
    "originLat":"41.9028",
    "originLong":"12.4964"
  },
  {
    "name":"comment",
    "type":"noun",
    "description":"A useful piece of information left by a programmer to help themselves and other understand the code. There are different kinds of comments e.g. multi-line, inline, etc.",
    "example": ["This comment explains what the below method will carry out."],
    "originLat":"52.8294",
    "originLong":"-1.3321"
  },
  { 
    "name":"compiler",
    "type":"noun",
    "description":"A compiler turns high-level programming code into a machine readable form so that a computer can understand and use it.",
    "example": ["The Java language has multiple compilers so that different computer systems can use the language"],
    "originLat":"48.8566",
    "originLong":"2.3522"
  },
  {
    "name":"execute",
    "type":"verb",
    "description":"To carry out a set of instructions.",
    "example": ["This piece of code will execute at 4PM.", "This method will execute a timer."], 
    "originLat":"52.6369",
    "originLong":"-1.1398"
  },
  {
    "name":"float",
    "type":"noun",
    "description":"Similar to an integer which is a data type that stores numbers but a float only stores numbers which contain a decimal point.",
    "example": ["23.4 is a float value.", "A float can hold a number with more than one decimal place specified.", "A float type can not contain the number 4."],
    "originLat":"51.1657",
    "originLong":"10.4515"
  },
  { 
    "name":"implement",
    "type":"verb",
    "description":"To carry something out. e.g. a method or command",
    "example": ["The code will implement a standard goverment procedure.."],
    "originLat":"52.3555",
    "originLong":"-1.1743"
  },
  {
    "name":"nested",
    "type":"adjective",
    "description":"When objects are contained inside of another object",
    "example": ["These brackets are nested because they are within another set of brackets."], 
    "originLat":"51.1657",
    "originLong":"10.4515"
  },
  {
    "name":"read",
    "type":"verb",
    "description":"The action of collecting external data and bringing it to use in a program.",
    "example": ["I have read the names from the database into my current program."],
    "originLat":"52.1326",
    "originLong":"5.2913"
  },
  { 
    "name":"write",
    "type":"verb",
    "description":"The action of writing data from the program to the device that it is running on.",
    "example": ["I will write this data to memory.", "Write will allow a new file to be created on the file system."],
    "originLat":"51.1657",
    "originLong":"10.4515"
  },
  {
    "name":"syntax",
    "type":"noun",
    "description":"The rules on which a language is based. Describes how to present code so that the compiler can understand it.",
    "example": ["The syntax of this code demands that every command must end with a semi-colon."], 
    "originLat":"39.0742",
    "originLong":"21.8243"
  },
  { 
    "name":"exception",
    "type":"noun",
    "description":"A special condition that a program may exhibit if an unexpected outcome occurs.",
    "example": ["A null pointer exception was thrown because the object did not contain a value."],
    "originLat":"46.2276",
    "originLong":"2.2137"
  },
  {
    "name":"hardware",
    "type":"noun",
    "description":"The physical components that make up a device.",
    "example": ["A mouse is a piece of hardware.", "If the hardware breaks then it will need replacing."], 
    "originLat":"37.9838",
    "originLong":"23.7275"
  },
  {
    "name":"input",
    "type":"noun",
    "description":"An unexpected or incorrect result that is created by an error, failure or fault in a computer program",
    "example": ["There is a bug in this program causing an ArrayOutOfBounds exception", "There must be a bug in this code somewhere.", "I have found the software bug."],
    "originLat":"52.3555",
    "originLong":"-1.1743"
  },
  { 
    "name":"output",
    "type":"noun",
    "description":"The result given from a command or program. Can beclassed as data with meaning in some cases.",
    "example": ["The output for this function will be the fully capitalised name or the person."],
    "originLat":"52.3555",
    "originLong":"-1.1743"
  },
  {
    "name":"zipped",
    "type":"verb",
    "description":"When information or files has been compressed into a smaller format to use up less space.",
    "example": ["These files will all be zipped so that they free up space on the server."], 
    "originLat":"37.0902",
    "originLong":"-95.7129"
  },
  {
    "name":"recursion",
    "type":"noun",
    "description":"When the same process is repeated again and again. This is usally in the form of a method which calls itself repeatedly.",
    "example": ["Recursion is needed in some languages to carry out specific algorithms."],
    "originLat":"37.0902",
    "originLong":"-95.7129"
  }
]
`;