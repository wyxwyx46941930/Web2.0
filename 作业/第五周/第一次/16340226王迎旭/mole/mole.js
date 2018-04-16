window.onload = function()
{
    var start = document.getElementById("start") ;
    start.addEventListener("click",clickStart) ;
    var show = document.getElementById("show") ;
    var radios = document.getElementsByName("radio") ;
    var Globalvalue ;
    var flag = true ;
    var playing = false ;
    var stopping = false ;
    var gameover = true ;
    var score = document.getElementById("score") ;
    var scoresValue = parseInt(score.value) ;
    var main = document.getElementById("main") ;
    main.onclick = function(event)
    {
        if (event.target.name == "radio" && playing == true) 
        {

            if (flag == true) 
            {
                Globalvalue = event.target.value;
                flag = false;
            }
            if (event.target.value == Globalvalue) 
            {
                scoresValue += 1;
                var randomValue = parseInt(60*Math.random());
                Globalvalue = randomValue;
                radios[Globalvalue].checked = true;
            } 
            else 
            {
                scoresValue -= 1;
                radios[Globalvalue].checked = true;
                radios[event.target.value].checked = false;
            }
            score.value = scoresValue;
        } 
        else if (event.target.name == "radio" && stopping == true) 
        {
            radios[event.target.value].checked = false;
            radios[Globalvalue].checked = true;
        }
    }

    function timeM()
    {
        var time = document.getElementById("time") ;
        var timeValue = parseInt(time.value) ;
        if(timeValue != 0 )
        {
            timeValue -= 1 ;
            time.value = timeValue ;
        }
        else
        {
            playing = false ;
            show.value = "Game Over" ;
            clearInterval(clock) ;
            gameover = true ;
            alert("Game Over.\nYour score is: " + scoresValue) ;
        }
    }

    function clickStart()
    {
        if(show.value.indexOf("Playing") >= 0)
        {
            show.value = "Stopping" ;
            clearInterval(clock) ;
            playing = false ;
            stopping = true ;
        }
        else if( show.value.indexOf("Game") >= 0)
        {
            playing = true ;
            time.value = "30";
            score.value = "0" ;
            scoresValue = 0 ;
            clock = setInterval(timeM,1000) ;
            show.value = "Playing" ;
        }
        else if(show.value.indexOf("Stopping") >= 0 )
        {
            clock= window.setInterval(timeM,1000) ;
            show.value = "Playing" ;
            playing = true ;
        }
        else
        {
            clock = window.setInterval(timeM,1000) ;
            show.value = "Playing" ;
            var randomValue = parseInt(60*Math.random());
            radios[randomValue].checked = true ;
            playing = true ; 
        }
    }
}