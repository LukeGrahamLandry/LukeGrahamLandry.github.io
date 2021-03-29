let wordsElement = document.getElementById("words");
let fullDocElement = document.getElementById("display");
let writeElement = document.getElementById("write");
let wordCountElement = document.getElementById("wordcount");
let toggleElement = document.getElementById("toggle");
let localStorage = window.localStorage;

writeElement.addEventListener("keypress", handleKeyPress);
fullDocElement.addEventListener("keypress", saveText);
writeElement.value = " ";

let isViewMode = false;
let fullText = localStorage.getItem("fullText");
let words = [];
let maxWordsShown = 7;
let wordCount = 0;
for (let i=0;i<maxWordsShown;i++){words.push(" ");}
if (fullText == null) fullText = "";
else {
    updateWordsFromFullDoc();
    updateWordsDisplay();
}

function handleKeyPress(event){
    if (event.key == " " || event.key == "Enter"){
        let end = "";
        if (event.key == "Enter"){
            end = "\n";
        }

        words.push(writeElement.value);
        fullText += writeElement.value + end;
        localStorage.setItem('fullText', fullText);
        writeElement.value = "";
        words.shift();
        updateWordsDisplay();
        
        wordCount++;
        wordCountElement.innerText = wordCount + " Words";
    }
}

function updateWordsDisplay(){
    let code = "";
    for (let i=0;i<maxWordsShown;i++){
        //if (words[i] != " " && words[i] != "  " && words[i] != ""){
            code += '<span class="word" style="opacity:' + (i / maxWordsShown + 0.15) + ';">' + words[i] + "</span>";
        //}
    }
    if (code == "") {
        code = "Type something!"
    }
    wordsElement.innerHTML = code;
    wordsElement.scrollBy(1000, 0)
}

function toggleVisibility(){
    isViewMode = !isViewMode;

    if (isViewMode){
        writeElement.style.visibility = "hidden";
        wordsElement.style.visibility = "hidden";
        fullDocElement.style.visibility = "visible";
        wordCountElement.style.visibility = "hidden";
        fullDocElement.value = fullText;
        fullDocElement.focus();
        toggleElement.innerText = "Enter Write Mode";

    } else {
        writeElement.style.visibility = "visible";
        wordsElement.style.visibility = "visible";
        fullDocElement.style.visibility = "hidden";
        wordCountElement.style.visibility = "visible";
        toggleElement.innerText = "Enter Edit Mode";
        writeElement.value = " ";

        fullText = fullDocElement.value;
        localStorage.setItem('fullText', fullText);
        updateWordsFromFullDoc();
        updateWordsDisplay();
        writeElement.focus();
    }
}

function updateWordsFromFullDoc(){
    words = fullText.split(" ");

    while (words[words.length-1] == ""){
        words.pop();
    }
    wordCount = words.length;
    wordCountElement.innerText = wordCount + " Words";
    while (words.length < maxWordsShown){
        words.push(" ");
    }
    while (words.length > maxWordsShown){
        words.shift();
    }
    for (let i=0;i<maxWordsShown;i++){
        words[i] = " " + words[i];
    }
}

function saveText(event){
    localStorage.setItem('fullText', fullDocElement.value);
}

/* Settings */

let isDarkMode = window.localStorage.getItem('darkMode');
if(!isDarkMode){
	isDarkMode =  false;
}
else if(isDarkMode === "true"){
	isDarkMode = true;
}
else{
	isDarkMode = false;
}
isDarkMode = !isDarkMode;

function toggleDarkMode(){
    isDarkMode = !isDarkMode;
    window.localStorage.setItem('darkMode', isDarkMode);
    let link = isDarkMode ? "darkmode.css" : "lightmode.css";
    document.getElementById("theme").href = link;
}
toggleDarkMode();

/*
let showNav = true;
function toggleNav(){
    showNav = !showNav;
    if (showNav){
        document.getElementById("nav").style.display="block"; 
        document.getElementsByClassName("main")[0].style.marginLeft = "100px";
    } else {
        document.getElementById("nav").style.display="none"; 
        document.getElementsByClassName("main")[0].style.marginLeft = "0px";
    }
}
toggleNav();

*/