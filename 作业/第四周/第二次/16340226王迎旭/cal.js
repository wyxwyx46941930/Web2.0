//最蠢的eval实现方法但是搞定了0.1+0.2=0.30000000000004的问题
//看了网上的博客然后解决问题可以说的上是客观一个小进步


var display = "" ;  
var check = 0;


window.onload = function() 
{
    document.getElementById("zero").onclick=function() 
    {
        if( display.length == 0 )
        {
            display += "" ;
        }
        if (check == 1) 
        {
            display = "" ;
            document.getElementById("result").value = display;
            check = 0;
        }
        display += "0";
        document.getElementById("result").value = display; 

    }

    document.getElementById("one").onclick=function() 
    {
        if (check == 1) 
        {
            display = "";
            document.getElementById("result").value = display;
            check = 0;
        }
        display += "1";
        document.getElementById("result").value = display;
    }

    document.getElementById("two").onclick=function() 
    {
        if (check == 1) 
        {
            display = "";
            document.getElementById("result").value = display;
            check = 0;
        }
        display += "2";
        document.getElementById("result").value = display;
    }

    document.getElementById("three").onclick=function() 
    {
        if (check == 1) 
        {
            display = "";
            document.getElementById("result").value = display;
            check = 0;
        }
        display += "3";
        document.getElementById("result").value = display;
    }

    document.getElementById("four").onclick=function() 
    {
        if (check == 1) 
        {
            display = "";
            document.getElementById("result").value = display;
            check = 0;
        }
        display += "4";
        document.getElementById("result").value = display;
    }

    document.getElementById("five").onclick=function() 
    {
        if (check == 1) 
        {
            display = "";
            document.getElementById("result").value = display;
            check = 0;
        }
        display += "5";
        document.getElementById("result").value = display;
    }

    document.getElementById("six").onclick=function()
     {
        if (check == 1) 
        {
            display = "";
            document.getElementById("result").value = display;
            check = 0;
        }
        display += "6";
        document.getElementById("result").value = display;
    }

    document.getElementById("seven").onclick=function() 
    {
        if (check == 1) 
        {
            display = "";
            document.getElementById("result").value = display;
            check = 0;
        }
        display += "7";
        document.getElementById("result").value = display;
    }

    document.getElementById("eight").onclick=function() 
    {
        if (check == 1) 
        {
            display = "";
            document.getElementById("result").value = display;
            check = 0;
        }
        display += "8";
        document.getElementById("result").value = display;
    }

    document.getElementById("nine").onclick=function() 
    {
        if (check == 1) 
        {
            display = "";
            document.getElementById("result").value = display;
            check = 0;
        }
        display += "9";
        document.getElementById("result").value = display;
    }

    document.getElementById("plus").onclick=function() 
    {
        if (check == 1) 
        {
            check = 0;
        }
        if (display[display.length-1] == '+') return;
        display += "+";
        document.getElementById("result").value = display;
    }

    document.getElementById("substract").onclick=function() 
    {
        if (check == 1) 
        {
            check = 0;
        }
        if (display[display.length-1] == '-') return;
        display += "-";
        document.getElementById("result").value = display;
    }

    document.getElementById("multiply").onclick=function() 
    {
        if (check == 1) 
        {
            check = 0;
        }
        if (display[display.length-1] == '*') return;
        display += "*";
        document.getElementById("result").value = display;
    }

    document.getElementById("divide").onclick=function() 
    {
        if (check == 1) 
        {
            check = 0;
        }
        if (display[display.length-1] == '/') return;
        display += "/";
        document.getElementById("result").value = display;
    }

    document.getElementById("point").onclick=function() 
    {
        if (check == 1) 
        {
            display = "";
            document.getElementById("result").value = display;
            check = 0;
        }
        display += ".";
        document.getElementById("result").value = display;
    }

    document.getElementById("delete_one").onclick=function() 
    {
        if (check == 1)
        {
            return;
        }
        display = display.substring(0, display.length-1);
        document.getElementById("result").value = display;
    }

    document.getElementById("delete_all").onclick=function() 
    {
        display = "";
        document.getElementById("result").value = display;
    }

    document.getElementById("left_bracket").onclick=function() 
    {
        if (check == 1) 
        {
            display = "";
            document.getElementById("result").value = display;
            check = 0;
        }
        display += "(";
        document.getElementById("result").value = display;
    }

    document.getElementById("right_bracket").onclick=function() 
    {
        if (check == 1) 
        {
            display = "";
            document.getElementById("result").value = display;
            check = 0;
        }
        display += ")";
        document.getElementById("result").value = display;
    }

    document.getElementById("equal").onclick = function() 
    {

        try 
        {
            while(display[0] == "0")
            {
                display = display.substr(1,(display.length-1)) ;
            }
            for( var i = 0 ; i < display.length ; i ++ )
            {
                if( display[i] == "0" )
                {
                    if( display[i] == 0 && ( display[i-1] == "+" || display[i-1] == "-" || display[i-1] == "*" || display[i-1] == "/"))
                    {
                        display = display.replace("0","") ;
                    }
                }
            }
            display = eval(display);
        }

        catch(exception) 
        {
            alert("Enter Error!");
        }

        display = parseFloat( display ) ;
        display = parseFloat( display.toFixed(12) ) ;
        document.getElementById("result").value = display;
        check = 1 ;
    }

}
