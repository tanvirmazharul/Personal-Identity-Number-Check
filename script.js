// Program
function isPersonID() {
  // Read value from the userInput
  let userInput = String(document.getElementById("personID").value);
  userInput = removeSpace(userInput);
  printResult(userInput);
}

// Remove space from data
function removeSpace(userInput) {
  return String(userInput).replace(/[ \.\,\/]/g, "");
}

// Print result
function printResult(userInput) {
  let retValue = "Input: " + userInput + "<br>is valid: ";
  let arruserInput = getSplitData(userInput);
  let dob = makeDob(arruserInput);

  if (!isValidLength(userInput, 11)) retValue += "False - Wrong input length";
  else if (!isValidDate(dob)) retValue += "False - Invalid Date";
  else if (isValidPersonID(arruserInput)) {
    retValue += "True <br>";
    retValue += "Sex: " + getSex(arruserInput);
    retValue += "<br>Age: " + calculateAge(dob);
  } else {
    retValue += "False - ID is not correct!";
  }
  document.getElementById("result").innerHTML = retValue;
}

// Check is userInput is correct length
// Function return True/False
function isValidLength(userInput, len) {
  return userInput.length == len;
}

function getSplitData(userInput) {
  let tmpDob = String(userInput);
  let dd = tmpDob.substring(0, 2);
  let mm = tmpDob.substring(2, 4);
  let yy = tmpDob.substring(4, 6);
  let century = tmpDob.substring(6, 7);
  let orderNumber = tmpDob.substring(7, 10);
  let chkMark = tmpDob.substring(10, 11);
  let arrUserInput = [dd, mm, yy, century, orderNumber, chkMark];

  return arrUserInput;
}

// Make DOB in format mm/dd/yyyy
// Make DOB in format yyyy-mm-dd
function makeDob(data) {
  let century = ["+", "-", "A", "B", "C"];
  let year = 1800;
  for (let i = 0; i < century.length; i++) {
    if (data[3] == century[i]) {
      year += i * 100 + Number(data[2]);
      break;
    }
  }
  return String(data[1] + "/" + data[0] + "/" + year);
}

// Check is date valid
function isValidDate(dob) {
  let d = new Date(dob);

  return new Date(dob) != "Invalid Date" && !isNaN(new Date(dob));
}

// Calculate Age
function calculateAge(dob) {
  var dob = new Date(dob);

  //calculate month difference from current date in time
  var month_diff = Date.now() - dob.getTime();

  //convert the calculated difference in date format
  var age_dt = new Date(month_diff);

  //extract year from date
  var year = age_dt.getUTCFullYear();

  //now calculate the age of the user
  var age = Math.abs(year - 1970);

  //display the calculated age
  return age;
}

// Check sex
function getSex(arrUserInput) {
  let sex = "Female";
  if (arrUserInput[4] % 2 != 0) sex = "Male";

  return sex;
}

// Check is PersonID valid
// 131052-308T
// [dd,mm,yy,c,xxx,m]
// [ 0, 1, 2,3,  4,5]
function isValidPersonID(arrUserInput) {
  let marks = "0123456789ABCDEFHJKLMNPRSTUVWXY";
  let calc =
    arrUserInput[0] + arrUserInput[1] + arrUserInput[2] + arrUserInput[4];
  nbr = Math.floor(calc % 31);
  if (marks[nbr] != arrUserInput[5].toUpperCase()) return false;
  return true;
}
