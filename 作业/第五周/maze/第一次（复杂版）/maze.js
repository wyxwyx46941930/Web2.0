(function () 
{
  var config = 
  {
    "resultDescrption": 
    {
      "win": 'You Win',
      "lose": 'You Lose',
      "cheated":"Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!"
    }
  };
  var resultEle = document.querySelector('.result-description');
  var maze = document.querySelector('.maze-wrapper');
  var wallAreaEle = maze.querySelector('.wall-area');
  var startEle = maze.querySelector('.start-block');
  var endEle = maze.querySelector('.end-block');
  var playing = false;
  var cheated = false;
  var hoveredBlock = null;
  init();

  function init() 
  {
    addWallBlock();
    startEle.addEventListener('mouseover', function() 
    {
      if (playing) 
      {
        cheated = false;
        return;
      }
      start();
    }, false);

    endEle.addEventListener('mouseover', function() 
    {
      if (!playing) return;
      if (cheated) 
      {
        gameover(config.resultDescrption.cheated);
      } else 
      {
        gameover(config.resultDescrption.win);
      }
    }, false);

    wallAreaEle.addEventListener('mouseleave', function()
   {
      if (!playing) 
      {
        unhoverWall();
      } else
      {
        cheated = true;
      }
    }, false);
  }

  function addWallBlock() 
  {
    for (var i = 1; i <= 9; ++i) 
    {
      var oneWallBlock = createElementWith('div', ['wall-block', 'wall-block-' + i]);
      oneWallBlock.addEventListener('mouseover', function() 
      {
        if (!playing) return;
        this.classList.add('hovered');
        hoveredBlock = this;
        gameover(config.resultDescrption.lose);
      }, false);
      wallAreaEle.appendChild(oneWallBlock);
    }
  }

  function start() 
  {
    resultEle.classList.remove('show');
    playing = true, cheated = false;
    wallAreaEle.classList.add('playing');
    unhoverWall();
  }

  function unhoverWall() 
  {
    if (hoveredBlock) 
    {
      hoveredBlock.classList.remove('hovered');
      hoveredBlock = null;
    }
  }

  function gameover(text) 
  {
    resultEle.classList.add('show');
    resultEle.textContent = text;
    wallAreaEle.classList.remove('playing');
    playing = false;
  }

  function createElementWith(tagName, classList, children) 
  {
    var newElement = document.createElement(tagName);
    if (classList === undefined)
    {
      return newElement;
    }

    if (typeof(classList) === 'string') 
    {
      classList = new Array(classList);
    }

    classList.forEach(function(oneClass) 
    {
      newElement.classList.add(oneClass);
    });

    if (children === undefined) return newElement;

    if ( Object.prototype.toString.apply(children) != '[object Array]' || typeof(children) === 'string' ) 
    {
      children = new Array(children);
    }

    children.forEach(function(oneChild) 
    {
      if (typeof(oneChild) === 'string') oneChild = document.createTextNode(oneChild);
      newElement.appendChild(oneChild);
    });

    return newElement;
  }

})();
