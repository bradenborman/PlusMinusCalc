var AllCombos = [];
var amountSelected = 0;
var plusMinusTotal = []
var currentIndex = 0;
//addToCombo()
var SecondsPlayed = []
var NamesOLD = []
var SecondsLast = 1200


$(document).ready(function(){
    makeClickable() 
});

function makeClickable() {
	    $(".select").click(function(){
	   var checkboxPlus = document.getElementById("Select")
	   var checkboxMinus = document.getElementById("Un-Select")
		if(checkboxPlus.checked) { 
			if (amountSelected < 5) {
				if(!$(this).hasClass("Playeractive"))
					amountSelected++
				$(this).addClass("Playeractive");
				$(this).removeClass("unActive"); }
		}else {
			if (amountSelected > 0) {
				if($(this).hasClass("Playeractive"))
					amountSelected--
				$(this).addClass("unActive");
				$(this).removeClass("Playeractive");
			}
		}
			if(amountSelected == 0) checkboxPlus.checked = true
    });	
}

function displayAllCombos() {
document.getElementById("results").innerHTML = ""

	for (var i=0, len=AllCombos.length; i<len; i++) {
		document.getElementById("results").innerHTML +=  "<span class='alignleft'>"
		for (var j=0, len2=AllCombos[i].length; j<len2; j++) 	{	
			if(j + 1 < len2)
				document.getElementById("results").innerHTML +=  AllCombos[i][j] + ", "
			else 
				document.getElementById("results").innerHTML +=  AllCombos[i][j] + "</span>"
		}
		var mins = Math.floor(SecondsPlayed[i] / 60)
		var sec = (SecondsPlayed[i] % 60)
		var time = mins + ":" + sec
		if(plusMinusTotal[i] >= 0)
			document.getElementById("results").innerHTML +=  "<b><span class='alignright' style='color: green; font-size: 1.6em;'>" + plusMinusTotal[i] + " (" + time + ")</span></b> </span><br>"
		else {
			document.getElementById("results").innerHTML +=  "<b><span class='alignright' style='color: red; font-size: 1.6em;'>" + plusMinusTotal[i] + " (" + time + ")</span></b> </span><br>"
		}
	document.getElementById("results").innerHTML +=  "<div style='clear: both;'></div>"
	}	
}

function adjustPoints(x) {
if(amountSelected == 5) {	
		BuildCurrentLinup()		
		plusMinusTotal[currentIndex] += x
		displayAllCombos()		
}
}

function BuildCurrentLinup() {
 
 var currentLinup = []

	$(".Playeractive").each(function( index ) {
			var text =  $(this).find("p:first").text();
			currentLinup.push(text)
		});
		addToCombo(currentLinup)
}

function addToCombo(y) {
var add = true;

	for (var x = 0; x < AllCombos.length; x++) {
		if(arraysEqual(AllCombos[x], y)) 
		{	add = false
			currentIndex = x }
	}

	if(add) {
		AllCombos.push(y) 
		plusMinusTotal.push(0)
		SecondsPlayed.push(0)
		currentIndex = AllCombos.length - 1
	}	
}

	function addTime() {
		
		var chk = document.getElementById("Un-Select")
		
		if(chk.checked && SecondsPlayed.length > 0 && amountSelected == 5){
			
			var mins = prompt("Please enter mins on clock", "0");
			var seconds = prompt("Please enter seconds on clock", "0");
			var x = parseInt(mins)
			var y = parseInt(seconds)
			var total = SecondsLast - ((x * 60) + y	)
			
			SecondsPlayed[currentIndex] += total
			displayAllCombos()
			SecondsLast = (x * 60) + y
			
			if(SecondsLast == 0) 
				SecondsLast = 1200
		}
	}

function arraysEqual(a, b) {

	a.sort(); b.sort();

  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
