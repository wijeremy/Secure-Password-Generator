// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

  
  function generatePassword() {
    //this asks how many characters our user wants
    var ammount = window.prompt("How many characters do you want to use? (Must be between 8 and 128)");
    
    //this makes sure ammount is a number between 8 and 128:
    if (ammount == null || ammount<8 || ammount>128 || isNaN(ammount)) {
      window.alert("Sorry, invalid response. Try again.");
      return
    }

    //this asks which character types the user wants
    var isUpper = window.confirm("Do you want to include upper case letters?");
    var isLower = window.confirm("Do you want to include lower case letters?");
    var isNumber = window.confirm("Do you want to include numbers?");
    var isSpecial = window.confirm("Do you want to include special characters?");
    
    //this makes sure at least one charater type is selected:
    if (!isUpper && !isLower && !isNumber && !isSpecial) {
      window.alert("Sorry, please select at least one character type. Try again.");
      return
    }

    //character arrays
    var upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var lower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var special = [' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', "\\", ']', '^', '_', '`', '{', "|", "}", '~'];

    //this sets up our isGood array, which we'll use in the checkPassword() function.
    var isGood = [];

    //this puts our character arrays inside an array named char if they were selected
    //it also pushes the value false into the isGood array a number of times to make it the same lenght as char (which will be useful later)
    var char = [];
    if (isUpper) {
      char.push(upper);
      isGood.push(false);
    };
    if (isLower) {
      char.push(lower);
      isGood.push(false);
    };
    if (isNumber) {
      char.push(number);
      isGood.push(false);
    };
    if (isSpecial) {
      char.push(special);
      isGood.push(false);
    };

    console.log(char);

    //we declare our password variable outside of where it's created. this is because we won't return it until 
    //everything inside of getPassword is done. we may make several passes through it, due to a function 
    //inside that checks to make sure it meets all user selected criteria.
    var myPassword = [];

    //this creates our password
    function getPassword () {
      //this generates a number of characters equal to the ammount the user chose
      for (var i=0; i<ammount; i++) {
        //this gets a random character array out of the chosen character types we put in char
        var rand1 = Math.floor(Math.random() * (char.length));
        //this gets a random character out of that random array
        var rand2 = Math.floor(Math.random() * char[rand1].length);
        //this puts that random character into an array myPassword
        myPassword.push(char[rand1][rand2])
      }
      //This makes sure we included every character type the user asked for.
      function checkPassword() {
        for (var i = 0; i < char.length; i++) {
          for (var j = 0; j < char[i].length; j++) {
            for (var k = 0; k < myPassword.length; k++ ) {
              //If we're in the loop i, corresponding to the ith character option in char, we check every
              //value in the ith array in char against every value in myPassword. If any of them are the same, 
              //we set the ith value in isGood to true.
              if (char[i][j] == myPassword[k]) {
                isGood[i] = true;
              };
            };
          }; 
        };
        //i just like to see how many times it fails
        console.log(isGood);
        //Then we check if any values in isGood are still false, which means that the character array corresponding 
        //to that position i in the previous for loop did not contain any characters that were in myPassword, or put
        //another way, myPassword did not include that character set which the user asked for.
        for (var i = 0; i < char.length; i++) {
          //if any character type the user asked for was ommited
          if (isGood[i] == false) {
            //we set isGood back to all false
            for (var i = 0; i < isGood.length; i++) {
              isGood[i] = false;
            }
            //we clear myPassword
            myPassword = [];
            //and run a new password
            getPassword();
          }
        }
      }

      checkPassword();
    }

    getPassword();

    //this returns the values in myPassword, but removes unwanted commas
    return myPassword.join("");
  }
}
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
