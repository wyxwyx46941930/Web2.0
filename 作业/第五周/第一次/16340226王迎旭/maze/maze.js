var begin = 0;
var isCheat = 0;

window.onload = function() {
	addEventListeners();
}

function addEventListeners() 
{
	var walls = document.getElementsByClassName("wall");
	for (var i = 0; i < walls.length; i++) 
	{
		walls[i].addEventListener('mouseover', lose);
		walls[i].addEventListener('mouseout', restore);
	}
	var buttons = document.getElementsByClassName("button");

	for (var i = 0; i < buttons.length; i++)
	{
		buttons[i].addEventListener('mouseover', changeMouseStyle);
	}
	var ways = document.getElementsByClassName("way");

	for (var i = 0; i < ways.length; i++)
	{
		ways[i].addEventListener('mouseover', changeMouseStyle);
	}

	document.getElementById("maze").addEventListener('mouseleave', cheat);

	document.getElementById("startButton").addEventListener('mouseover', start);

	document.getElementById('endButton').addEventListener('mouseover', end);
}

function lose(event) 
{
	if (begin == 1) 
	{
		begin = 0;
		var target = event.target;
		if (target.id == 'middleTopWall' || target.id == 'middleBottomWall') 
		{
			var wall1 = document.getElementById("middleBottomWall");
			var wall2 = document.getElementById("middleTopWall");
			wall1.className = 'changed';
			wall2.className = 'changed';
		}
		else if (target.id == 'leftTopWall' || target.id == 'leftWall') 
		{
			var wall1 = document.getElementById("leftWall");
			var wall2 = document.getElementById("leftTopWall");

			wall1.className = 'changed';
			wall2.className = 'changed';

		} 
		else if (target.id == 'rightTopWall' || target.id == 'rightWall') 
		{
			var wall1 = document.getElementById("rightWall");
			var wall2 = document.getElementById("rightTopWall");

			wall1.className = 'changed';
			wall2.className = 'changed';

		} 
		else
			event.target.className = 'changed';
		document.getElementById("screen").innerHTML = "<h2>You lose</h2>";
	}
}

function restore(event) 
{
	var changes = document.getElementsByClassName("changed");
	while (changes.length > 0)
	{
		changes[0].className = 'wall';
	}
}

function changeMouseStyle(event) 
{
	event.target.style.cursor = "pointer";
}

function cheat(event) 
{
	isCheat = 1;
}

function start() 
{
	begin = 1;
	isCheat = 0;
	document.getElementById("screen").innerHTML = "";
}

function end() 
{
	if (begin == 1 && isCheat == 0) 
	{
		begin = 0;
		document.getElementById("screen").innerHTML = "<h2>You Win</h2>";
	} 
	else if (isCheat == 1 && begin == 1) 
	{
		begin = 0;
		isCheat = 0;
		document.getElementById("screen").innerHTML = "<h2>Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!</h2>";
	}
}

