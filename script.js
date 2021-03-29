var darkMode = window.localStorage.getItem('darkMode');
if(!darkMode){
	darkMode =  false;
}
else if(darkMode === "true"){
	darkMode = true;
}
else{
	darkMode = false;
}
mode();


function darkToggle(){
	toggle();
	mode();
}

function mode(){
	var button = document.getElementById("dark-button");
	if(darkMode){
		document.body.classList.add("dark");
		button.innerText = "Light Mode";

		let comic = document.getElementById("comic");
		if (comic != null) {
			comic.style.filter = "invert(1)";
		}
	}
	else{
		document.body.classList.remove("dark");
		button.innerText = "Dark Mode";

		let comic = document.getElementById("comic");
		if (comic != null) {
			comic.style.filter = "invert(0)";
		}
	}
}

function toggle(){
	darkMode = !darkMode;
	window.localStorage.setItem('darkMode',darkMode);	
}