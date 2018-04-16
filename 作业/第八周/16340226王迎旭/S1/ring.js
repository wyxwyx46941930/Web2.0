
(function() 
{
  //删除时间
  $('#button').data('clear', function clear() 
  {
    $('#control-ring li.button .unread').removeClass('show').text('');

    $('#info-bar ul').removeClass('active').find('.page').removeClass('show').find('.result').text('');
  });


  //增加事件
  $('#button').on('mouseenter', function onHoveringButton() 
  {
    $('#button').data('hasStarted', Number(new Date()));
    $('#button').data('clear')();
    $('#control-ring li.button').addClass('active');
  });



  //鼠标离开事件
  $('#button').on('mouseleave', function onLeavingButton() 
  {
    //任何时候，鼠标离开@+区域，将重置整个计算器，清除所有A~E按钮的随机数和大气泡内的和
    $('#button').data('hasStarted', false);
    $('#control-ring li.button').removeClass('active');
    var delayTime = 1000 * (parseFloat($('#button .apb').css('transition-delay'))
                          + parseFloat($('#button .apb').css('transition-duration')));
    var prevStartedAt = $('#button').data('hasStarted');
    setTimeout(function() 
    {
      if (prevStartedAt !== $('#button').data('hasStarted')) return;
      $('#button').data('clear')();
    }, delayTime);
  });



  //点击产生随机数事件
  $('#control-ring li.button').on('click', function onClickingButton() 
  {
    var $self = $(this);
    if (false === $('#button').data('hasStarted') ||
        false === $self.hasClass('active') ||
        true === $self.find('.unread').hasClass('show')) {
       return;
    }
    // 用户点击某个按钮，将显示其对应红色圆圈，并发送请求到服务器获取随机数
    // 红色圆圈内显示....表示正在等待随机数
    $self.find('.unread').addClass('show').addClass('waiting').text('...');
    // 灭活（disable）其它按钮，变为灰色，用户不能够点击（点击没有响应，也不会发送新的请求到服务器）
    $('#control-ring li.button').not($self).removeClass('active');

    var prevStartedAt = $('#button').data('hasStarted');
    $.get('/').done(function(randomNum) 
      {
        if (prevStartedAt !== $('#button').data('hasStarted')) return;
        // 显示在当前按钮右上角红色圆圈内
        $self.find('.unread').removeClass('waiting').text(randomNum);
        // 激活（enable）其余按钮，呈现为蓝色，用户可以点击，从服务器获取随机数
        $('#control-ring li.button .unread:not(.show)').closest('li.button').addClass('active');
        //灭活当前按钮，变为灰色，用户不能够点击
        $self.removeClass('active');
        if (0 === $('#control-ring li.button .unread:not(.show)').length &&
            0 === $('#control-ring li.button .unread.waiting').length) {
          //当A~E按钮全部获得了自己的随机数时，激活大气泡
          $('#info-bar ul').addClass('active');
        }
      })
      .fail(function() 
      {
        console.log('failed');
      });
  });


  //点击求和事件
  $('#info-bar ul').on('click', function onClickingTopButton() 
  {
    if (false === $(this).hasClass('active')) return;
    //  灭活大气泡
    $(this).removeClass('active');
    // 计算A~E随机数的和，显示在大气泡内
    var result = 0;
    $('#control-ring li.button .unread').each(function() 
    {
      result += Number($(this).text());
    });
    $(this).find('.page').addClass('show').find('.result').text(result);
    $('#control-ring li.button').addClass('active');
  });

})();
