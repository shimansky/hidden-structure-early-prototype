var temp;
var vertical;


enemy=document.getElementById('monster');
figure=document.getElementById('player');

window.onload = function(){
setCoordinatesPlayerMonster();
timerId = setInterval(botMove,450);
setInterval(get_coordinates,250);

}

// установка начальных координат монстра и игрока на карте
function setCoordinatesPlayerMonster(){
  left=+figure.style.left.toString().slice(0, -2);
  console.log("player: " + left);
  bottom=+figure.style.bottom.toString().slice(0, -2);
  console.log("player: " + bottom);
  temp=+enemy.style.left.toString().slice(0, -2);
  console.log("monster: " + temp);
  vertical=+enemy.style.bottom.toString().slice(0, -2);
  console.log("monster: " + vertical);

}


function get_coordinates(){


 m = enemy.getBoundingClientRect();
 p = figure.getBoundingClientRect();

// определение имени класса элемента "слева"
m_left_empty = document.elementFromPoint((m.right-75),(m.bottom-25)).className;

// определение имени класса элемента "справа"
m_right_empty  = document.elementFromPoint((m.right+25),(m.bottom-25)).className;

// определение имени класса элемента "снизу"
m_down_empty = document.elementFromPoint((m.right-25),(m.bottom+25)).className;

// определение имени класса элемента "сверху"
m_up_empty = document.elementFromPoint((m.right-25),(m.bottom-75)).className;

}


// блок функций анимации бота
 var botMoveRight = function() {
if (m_right_empty!="w" && m_right_empty!="wc"&& m_right_empty!="ws" && m_right_empty!="wp" && m_right_empty!="locked_door_white"&& m_right_empty!="locked_door_black" && m_right_empty!="exit_door") {
  temp=temp+50;
  enemy.style.left = temp + 'px';
}
}

 var botMoveLeft = function() {
if (m_left_empty!="w" && m_left_empty!="wc"&& m_left_empty!="ws" && m_left_empty!="wp" && m_left_empty!="locked_door_white"&& m_left_empty!="locked_door_black" && m_left_empty!="exit_door") {
  temp=temp-50;
  enemy.style.left = temp + 'px';
}
}

var botMoveUp = function() {
if (m_up_empty!="w"  && m_up_empty!="wc"&& m_up_empty!="ws" && m_up_empty!="wp" && m_up_empty!="locked_door_white"&& m_up_empty!="locked_door_black" && m_up_empty!="exit_door") { 
  vertical=vertical+50;
  enemy.style.bottom = vertical + 'px';
}
}

var botMoveDown = function() {
if (m_down_empty!="w"  && m_down_empty!="wc"&& m_down_empty!="ws" && m_down_empty!="wp" && m_down_empty!="locked_door_white"&& m_down_empty!="locked_door_black" && m_down_empty!="exit_door") {
  vertical=vertical-50;
  enemy.style.bottom = vertical + 'px';
}
}

var botDirection=[botMoveRight, botMoveLeft, botMoveUp, botMoveDown];

// ИИ для бота
function botMove(){
    if(p.right-m.right<150 && p.right-m.right>0){
        console.log("botHuntig right");
      botMoveRight();
    }
    else
     if(p.right-m.right>-150 && p.right-m.right<0){
        console.log("botHuntig left");
      botMoveLeft();
    }
    else
      if(p.bottom-m.bottom<150 && p.bottom-m.bottom>0){
        console.log("botHuntig down");
      botMoveDown();
    }
    else
     if(p.bottom-m.bottom>-150 && p.bottom-m.bottom<0){
        console.log("botHuntig up");
      botMoveUp();
    }
    else{
setTimeout(botDirection[Math.floor(Math.random() * (4 - 0)) + 0], 0);
}
}
