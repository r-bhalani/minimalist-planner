//Create main array and call functions
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var currentIndex = 0;
createButtons();
formatMonth();
var currentMonth;
var currentDay;
var time;

//Initialize start of all of the storage arrays
var January = [];
createBlankArray(January, 31);
var February = [];
createBlankArray(February, 28);
var March = [];
createBlankArray(March, 31);
var April = [];
createBlankArray(April, 30);
var May = [];
createBlankArray(May, 31);
var June = [];
createBlankArray(June, 30);
var July = [];
createBlankArray(July, 31);
var August = [];
createBlankArray(August, 31);
var September = [];
createBlankArray(September, 30);
var October = [];
createBlankArray(October, 31);
var November = [];
createBlankArray(November, 30);
var December = [];
createBlankArray(December, 31);

//Function to float the decimal point to make more concise numbers
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals+'e-'+decimals));
}

//Takes the value from the time slider, and converts it to hours and minutres
//Then, displays the final value
onEvent("TimeSlider", "input", function(){
    time = getProperty("TimeSlider", "value");
    var min = time % 60;
    var hours = round((time/60) - (min/60), 0);
    var hsingplur;
    var msingplur;

    if(min == 1) {
        msingplur = "minute";
    } else {
        msingplur = "minutes";
    }
    if(hours == 1) {
        hsingplur = "hour";
    } else {
        hsingplur = "hours";
    }

});


//The regular value of things; what the user will see before and after edit
//Stores and updates information
onEvent("UpdateInformationButton", "click", function(){
    hideElement("UpdateInformationButton");
    hideElement("TimeEstimateDisplay");
    hideElement("TimeSlider");
    hideElement("TimeSelectedLabel");
    hideElement("TimeQuestionDisplayLabel");
    showElement("EditTimeButton");
    showElement("TimeEstimateDisplay");
    setProperty("TaskDisplayArea", "readonly", true);
    setProperty("TimeEstimateDisplay", "text", "Time Estimate: " + getProperty("TimeSelectedLabel", "text"));
    if(currentMonth == "January") {
        storeInformation(January);
    } else if(currentMonth == "February") {
        storeInformation(February);
    } else if(currentMonth == "February") {
        storeInformation(February);
    } else if(currentMonth == "March") {
        storeInformation(March);
    } else if(currentMonth == "April") {
        storeInformation(April);
    } else if(currentMonth == "May") {
        storeInformation(May);
    } else if(currentMonth == "June") {
        storeInformation(June);
    } else if(currentMonth == "July") {
        storeInformation(July);
    } else if(currentMonth == "August") {
        storeInformation(August);
    } else if(currentMonth == "September") {
        storeInformation(September);
    } else if(currentMonth == "October") {
        storeInformation(October);
    } else if(currentMonth == "November") {
        storeInformation(November);
    } else if(currentMonth == "December") {
        storeInformation(December);
    }
});

//Allows user to edit time and text
onEvent("EditTimeButton", "click", function(){
    showElement("TimeQuestionDisplayLabel");
    showElement("TimeSlider");
    showElement("TimeSelectedLabel");
    showElement("UpdateInformationButton");
    setProperty("TaskDisplayArea", "readonly", false);
    hideElement("TimeEstimateDisplay");
    hideElement("EditTimeButton");
});

//Takes user from the task screen back to home
onEvent("TaskListButton", "click", function(){
    setScreen("HomeScreen");
});

//Function that includes Event Handlers for when buttons are clicked!!
for(var b = 1; b < 38; b++) {
    buttonClick(b);
}

//Updates task screen
function initalizePerList(list) {
    setText("TaskDisplayArea", list[currentDay-1].T);
    setText("TimeEstimateDisplay", "Time Estimate: " + list[currentDay].H);
    setText("TimeSelectedLabel", list[currentDay-1].H);
    setProperty("TimeSlider", "value", list[currentDay-1].M);
}

//Formats task screen when user clisk on a day
function initializeTaskScreen() {
    setText("DateDisplayLabel", month[currentIndex] + " " + currentDay + ", 2018");
    if(currentMonth == "January") {
        initalizePerList(January);
    } else if(currentMonth == "February") {
        initalizePerList(February);
    } else if(currentMonth == "February") {
        initalizePerList(February);
    } else if(currentMonth == "March") {
        initalizePerList(March);
    } else if(currentMonth == "April") {
        initalizePerList(April);
    } else if(currentMonth == "May") {
        initalizePerList(May);
    } else if(currentMonth == "June") {
        initalizePerList(June);
    } else if(currentMonth == "July") {
        initalizePerList(July);
    } else if(currentMonth == "August") {
        initalizePerList(August);
    } else if(currentMonth == "September") {
        initalizePerList(September);
    } else if(currentMonth == "October") {
        initalizePerList(October);
    } else if(currentMonth == "November") {
        initalizePerList(November);
    } else if(currentMonth == "December") {
        initalizePerList(December);
    }
}

//Allows all buttons to be clickable
function buttonClick(buttonNumber) {
    onEvent("day"+buttonNumber+"Button", "click", function() {
        currentMonth = month[currentIndex];
        currentDay = getText("day"+buttonNumber+"Button");
        setScreen("TaskListScreen");
        initializeTaskScreen();
    });
}


//Stores information input by the user
function storeInformation(list) {
    list[currentDay-1].T = getText("TaskDisplayArea");
    list[currentDay-1].M = getProperty("TimeSlider", "value");
    list[currentDay-1].H = getProperty("TimeSelectedLabel", "text");
}

//Function to create all of the days in a blank array so that they can be stored
function createBlankArray(list, days) {
    for(var i = 0; i<days; i++) {
        appendItem(list, {T: "", H: "0 hours", M:0});
    }
}

//Next and last buttons to change the months
onEvent("NextButton", "click", function(){
    changeMonth("next");
    formatMonth();
});

onEvent("LastButton", "click", function(){
    changeMonth("last");
    formatMonth();
});

//Changs months and adjusts indices
function changeMonth(nextOrLast) {
    if(nextOrLast == "next") {
        currentIndex++;
        if(currentIndex==(month.length-1)){
            hideElement("NextButton"); //end of months
        }
    }
    if(nextOrLast=="last") {
        currentIndex--;
        if(currentIndex==0){
            hideElement("LastButton");
        }
    }

    if(currentIndex!==(month.length-1)&&currentIndex!==0){
        showElement("NextButton");
        showElement("LastButton");
    }

    setText("MonthTitle", month[currentIndex]);
    formatMonth();

}

//Makes all the days visible as a reset before each month formats
function makeAllDaysVisible(){
    for(var i = 0; i<37; i++){
        showElement("day", (i+1), "Button");
    }
}

//Function to hide unnecessary buttons in 31-day months
function hide31days(btn1, btn2, btn3, btn4, btn5, btn6){
    hideElement("day" + btn1 + "Button");
    hideElement("day" + btn2 + "Button");
    hideElement("day" + btn3 + "Button");
    hideElement("day" + btn4 + "Button")
    hideElement("day" + btn5 + "Button");
    hideElement("day" + btn6 + "Button")
}

//Function to hide unecessary buttons in 30-day months
function hide30days(btn1, btn2, btn3, btn4, btn5, btn6){
    hideElement("day" + btn1 + "Button");
    hideElement("day" + btn2 + "Button");
    hideElement("day" + btn3 + "Button");
    hideElement("day" + btn4 + "Button")
    hideElement("day" + btn5 + "Button");
    hideElement("day" + btn6 + "Button")
    hideElement("day" + btn7 + "Button")
}

//Set button names correctly
function changeButtons(variable, days, add){
    for(variable = 1; variable<(days+1); variable++){
        setProperty("day"+(variable+add)+"Button", "text", variable);
    }
}

//Format all months, taking into account the number of days + start day of the week
function formatMonth(){
    makeAllDaysVisible();
    if(month[currentIndex] == "January"){
        hide31days(1,33, 34, 35, 36, 37);
        changeButtons("i",31,1);
    } else if(month[currentIndex] == "February"){
        hide30days(1,2,3,4,33,34,37);
        hideElement("day35Button");
        hideElement("day36Button");
        changeButtons("j",28,4);
    } else if(month[currentIndex] == "March"){
        hide31days(1,2,3,4,36,37);
        changeButtons("k",31,4);
    } else if(month[currentIndex] == "April"){
        hide31days(31,32,33,34,35,36,37);
        changeButtons("m",30,0);
    } else if(month[currentIndex] == "May"){
        hide31days(1,2,34,35,36,37);
        changeButtons("p",31,2);
    } else if(month[currentIndex] == "June"){
        hide31days(1,2,3,4,5,36,37);
        changeButtons("r",30,0);
    } else if(month[currentIndex] == "July"){
        hide31days(32,33,34,35,36,37);
        changeButtons("s",31,0);
    } else if(month[currentIndex] == "August"){
        hide31days(1,2,3,35,36,37);
        changeButtons("t",31,3);
    } else if(month[currentIndex] == "September"){
        hide31days(1,2,3,4,3,6,37);
        changeButtons("u",30,6);
    } else if(month[currentIndex] == "October"){
        hide31days(1,33,34,35,36,37);
        changeButtons("v",31,1);
    } else if(month[currentIndex] == "November"){
        hide31days(1,2,3,4,35,36,37);
        changeButtons("w",30,4);
    } else if(month[currentIndex] == "December"){
        hide31days(1,2,3,4,5,6);
        changeButtons("x",31,6);
    }
}

//Create all of the days
function createButtons(){
    for(var i=0; i<38; i++){
        button("day"+i+"Button","width",35);
        setProperty("day"+i+"Button","height",35);
        setProperty("day"+i+"Button","font-size",12);
        setProperty("day"+i+"Button","text-align","center");
        setProperty("day"+i+"Button","y",100);
        setProperty("day"+i+"Button","text-color","black");
        setProperty("day"+i+"Button","background-color","white");
    }
}