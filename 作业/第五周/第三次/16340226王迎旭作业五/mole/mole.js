window.onload = function() {
	var start = document.getElementById("start");
	start.addEventListener("click", clickStart);
	var show = document.getElementById("show");
	var radios = document.getElementsByName("radio");
	var randomValue;
	var flag = true;
	var playing = false;
	var stopping = false;
	var gameover = true;
	var score = document.getElementById("score");
	var scoresValue = parseInt(score.value);
	var main = document.getElementById("main");
	main.onclick = function(event) {
		if (event.target.name == "radio" && playing == true) {
			if (event.target.value == randomValue) {
				scoresValue += 1;
				randomValue = parseInt(60 * Math.random());
				radios[randomValue].checked = true;
			} else {
				scoresValue -= 1;
				radios[randomValue].checked = true;
				radios[event.target.value].checked = false;
			}
			score.value = scoresValue;
		} else if (event.target.name == "radio" && playing == false) {
			radios[event.target.value].checked = false;
		}
	}

	function timeM() {
		var time = document.getElementById("time");
		var timeValue = parseInt(time.value);
		if (timeValue != 0) {
			timeValue -= 1;
			time.value = timeValue;
		} else {
			playing = false;
			show.value = "Game Over";
			clearInterval(clock);
			gameover = true;
			alert("Game Over.\nYour score is: " + scoresValue);
			for (var i = 0; i < 60; i++) {
				radios[i].checked = false;
			}
			score.value = "0";
		}
	}

	function clickStart() {
		if (show.value.indexOf("Playing") >= 0) {
			show.value = "Game Over";
			time.value = "0"
			timeM();
			playing = false;
		} else if (show.value.indexOf("Game") >= 0) {
			playing = true;
			time.value = "30";
			score.value = "0";
			scoresValue = 0;
			clock = setInterval(timeM, 1000);
			show.value = "Playing";
			radios[randomValue].checked = true;
		} else {
			clock = window.setInterval(timeM, 1000);
			show.value = "Playing";
			randomValue = parseInt(60 * Math.random());
			radios[randomValue].checked = true;
			playing = true;
		}

	}
}