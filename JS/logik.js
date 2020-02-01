// глобальные пременные для CSS и построения карты уровня
var left;
var bottom;
var tempId = "w";
var temp;
var vertical;
var life = 2;
var locator;
var tempLocation;
var buferLocation;
var r = /\d+/;
var row =12;
var col =12;
var step=-50;
var flag = 1;
var botLife = 3;

// Определяем адрес в строке и загружаем карту уровня
getLocation();
loadMap();



// функция, выполняется при загрузке - находит элементы по ClassName и присваивает им имена
window.onload = function(){
render();
figure=document.getElementById('player');
figure.innerHTML=life;
enemy=document.getElementById('monster');
enemy.innerHTML=botLife;
bullet=document.getElementById('bullet');
pistol=document.getElementById('pistol');
setCoordinatesPlayerMonster();
keywhite=document.getElementById('key_card_white');
keyblack=document.getElementById('key_card_black');
lock_white=document.getElementById('locked_door_white');
lock_black=document.getElementById('locked_door_black');
medicKit=document.getElementById('medicKit');
status=document.getElementById('panel');
falseDoor=document.getElementById('exit_door');
portal=document.getElementById('portal');
panel.innerHTML="life:" + life;
setInterval(get_coordinates,250);
timerId = setInterval(botMove,450);
setInterval(findExit,250);
getIdOfDiv();
setIDOfDiv();
};



// загрузка файла карты уровня
function loadMap(){
var script=document.createElement("script");
script.src='MAPS/room'+ (tempLocation) + '.js';
document.getElementsByTagName('head')[0].appendChild(script);
}

// создание карты уровня из подгруженого файла
function render () {
    for (var r = 0; r < row; r++) {
        for (var c = 0; c < col; c++) {
            var tile = map[ r ][ c ];
            let div = document.createElement('div');
            div.className = tile;
            div.innerHTML = ("&nbsp");
            game.append(div);
        }

    }
}



// логика работы редактора карт
function getIdOfDiv(){
document.querySelector('#editor').addEventListener('click', function(e){ 
  tempId = e.target.id; 
  console.log(tempId);
  return tempId;
});

}

function setIDOfDiv(){
document.querySelector('#game').addEventListener('click', function(e){ 
   e.target.id = tempId; 
  console.log(tempId);
});


}



// сохранение карты в HTML формате
function saveHTML(){
  var tempDiv = document.querySelector('#game'); 
  var data = tempDiv.innerHTML;
  alert(data);
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



// Определение URL страницы на данный момент
function getLocation(){
  locator = window.location;
  buferLocation=locator.toString().slice(-11);
  tempLocation = buferLocation.match(r);
  tempLocation = +tempLocation.toString();
  console.log(buferLocation);
  console.log(tempLocation);
  
}


// функция определения координаты игрока при столкновениях с монстром и вещами
function get_coordinates(){

 p = figure.getBoundingClientRect();
 m = enemy.getBoundingClientRect();
 bul = bullet.getBoundingClientRect();
var k = keywhite.getBoundingClientRect();
var b = keyblack.getBoundingClientRect();
var kit = medicKit.getBoundingClientRect();
var teleport = portal.getBoundingClientRect();
var gun = pistol.getBoundingClientRect();



// подбор оружия с пола
if (p.right==gun.right&&p.bottom==gun.bottom) {
   flag=0;
   bullet.style.left=left+'px';
   bullet.style.bottom=bottom +'px';
   pistol.style.display="none";
}




// логика работы дверей и карточек-ключей
if (p.right==k.right&&p.bottom==k.bottom) {
    console.log("you have a white card!");
    lock_white.removeAttribute('id');
    lock_white.className="ud_rd";
    keywhite.style.display="none";
    keyblack.style.display="flex";
  }

if (p.right==b.right&&p.bottom==b.bottom) {
    console.log("you have a black card!");
    falseDoor.removeAttribute('id');
    lock_black.id="exit_door";
    lock_black.removeAttribute('class');
    keyblack.style.display="none";
  }



// отслеживание столкновений с ботом
 if (p.right==m.right&&p.bottom==m.bottom){
  if(life==1){
  panel.innerHTML="life: 0";
  showMassege();
  setTimeout(location.reload.bind(location), 3000);
 
}
else{
  life-=1;
  panel.innerHTML="life:" + life;
  figure.innerHTML=life;
  console.log(life);
 }
}


// аптечка
 if (p.right==kit.right&&p.bottom==kit.bottom){
    medicKit.style.display="none";
    life+=1;
    panel.innerHTML="life:" + life;
    figure.innerHTML=life;
    console.log(life);
    }


    // телепортация player
 if (p.right==teleport.right&&p.bottom==teleport.bottom){
     left=left+teleportX;
     bottom=bottom+teleportY;
     figure.style.left = left +'px';
     figure.style.bottom = bottom + 'px';
    console.log("teloportation");
    }





// определение имени класса элемента "слева" от бота
m_left_empty = document.elementFromPoint((m.right-75),(m.bottom-25)).className;

// определение имени класса элемента "справа" от бота
m_right_empty  = document.elementFromPoint((m.right+25),(m.bottom-25)).className;

// определение имени класса элемента "снизу" от бота
m_down_empty = document.elementFromPoint((m.right-25),(m.bottom+25)).className;

// определение имени класса элемента "сверху" от бота
m_up_empty = document.elementFromPoint((m.right-25),(m.bottom-75)).className;



// определение имени класса элемента "слева" от игрока 
left_empty = document.elementFromPoint((p.right-75),(p.bottom-25)).className;

// определение имени класса элемента "справа" от игрока
right_empty  = document.elementFromPoint((p.right+25),(p.bottom-25)).className;

// определение имени класса элемента "снизу" от игрока
down_empty = document.elementFromPoint((p.right-25),(p.bottom+25)).className;

// определение имени класса элемента "сверху" от игрока
up_empty = document.elementFromPoint((p.right-25),(p.bottom-75)).className;



// определение имени класса элемента "слева" от пули 
b_left_empty = document.elementFromPoint((bul.right-75),(bul.bottom-25)).className;

// определение имени класса элемента "справа" от пули
b_right_empty  = document.elementFromPoint((bul.right+25),(bul.bottom-25)).className;

// определение имени класса элемента "снизу" от пули
b_down_empty = document.elementFromPoint((bul.right-25),(bul.bottom+25)).className;

// определение имени класса элемента "сверху" от пули
b_up_empty = document.elementFromPoint((bul.right-25),(bul.bottom-75)).className;


}



// Определение выхода из уровня
function findExit(){
    exit_door=document.getElementById('exit_door');
    var ex = exit_door.getBoundingClientRect();
    if (p.right==ex.right&&p.bottom==ex.bottom) {
        document.location.href = "room" + (tempLocation + 1) + ".html";

    }
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



// обаботчики нажатий на клавиши
window.onkeyup = function(){


 // left
 if(event.keyCode==37){
    get_coordinates();
    figure.style.backgroundImage='URL("IMG/player_l.png")';
    if (left_empty!="w" && left_empty!="wc"&& left_empty!="ws" && left_empty!="wp" &&left_empty!="locked_door_white"&&left_empty!="locked_door_black" &&left_empty!="person") {
    left=left-50;
    figure.style.left = left + 'px';
    console.log("player from left: " + left);
    console.log("player from bottom: " + bottom);
    if(flag==0){
    bullet.style.left=left+'px';
    bullet.style.bottom=bottom +'px';
    }
    }

}

  // right
    else if(event.keyCode==39){
      get_coordinates();
      figure.style.backgroundImage='URL("IMG/player_r.png")';
      if (right_empty!="w" && right_empty!="wc"&& right_empty!="ws" && right_empty!="wp" &&right_empty!="locked_door_white"&&right_empty!="locked_door_black" &&right_empty!="person") {
      left=left+50;
      figure.style.left = left + 'px';
      console.log("player from left: " + left);
      console.log("player from bottom: " + bottom);
      if(flag==0){
      bullet.style.left=left+'px';
      bullet.style.bottom=bottom +'px';
      }
      }
}

   // down
    else if(event.keyCode==40){
      get_coordinates();
      if (down_empty!="w"  && down_empty!="wc"&& down_empty!="ws" && down_empty!="wp" &&down_empty!="locked_door_white"&&down_empty!="locked_door_black" &&down_empty!="person") {
      bottom=bottom-50;
      figure.style.bottom= bottom + 'px';
      figure.style.backgroundImage='URL("IMG/player_r.png")';
      console.log("player from left: " + left);
      console.log("player from bottom: " + bottom);
      if(flag==0){
      bullet.style.left=left+'px';
      bullet.style.bottom=bottom +'px';
      }
      }
}

// up
    else if(event.keyCode==38){
      get_coordinates();
      if (up_empty!="w"  && up_empty!="wc"&& up_empty!="ws" && up_empty!="wp" &&up_empty!="locked_door_white"&&up_empty!="locked_door_black" &&up_empty!="person") {
      bottom=bottom+50;
      figure.style.bottom= bottom + 'px';
      figure.style.backgroundImage='URL("IMG/player_l.png")';
      console.log("player from left: " + left);
      console.log("player from bottom: " + bottom);
      if(flag==0){
      bullet.style.left=left+'px';
      bullet.style.bottom=bottom +'px';
     }
     }
}

// // fire
     else if(event.keyCode==32){

      
      if(flag==0){
      flag=1;
      timerShoot = setInterval(shoot,100);
         }
      }
      
    }


    
      


function shoot(){
  get_coordinates();
   if (b_left_empty!="w" && b_left_empty!="wc"&& b_left_empty!="ws" && b_left_empty!="wp" && b_left_empty!="locked_door_white"&& b_left_empty!="locked_door_black" && b_left_empty!="exit_door") {
      bullet.style.left=left+step+'px';
      bullet.style.bottom=bottom +'px';
      step+=-50; 
      console.log("shoot!");
      figure.style.backgroundImage='URL("IMG/player_shoot.png")';
      // выстрел и попадание в бота
if (bul.right==m.right&&bul.bottom==m.bottom){
  console.log("bot damage!"+ botLife);
  botLife-=1;
  enemy.innerHTML=botLife;
   bullet.style.left=left+'px';
       bullet.style.bottom=bottom +'px';
       step=-50;
       flag=0;
       figure.style.backgroundImage='URL("IMG/player_l.png")';
       console.log("stop shoot");
       clearInterval(timerShoot);
  if(botLife==0){
  clearInterval(timerId);
  enemy.style.border="1px solid red";
  enemy.style.backgroundImage=
  enemy.style.bottom=0;
  enemy.style.left=0;
  }
}
      }
    else{
       bullet.style.left=left+'px';
       bullet.style.bottom=bottom +'px';
       step=-50;
       flag=0;
       figure.style.backgroundImage='URL("IMG/player_l.png")';
       console.log("stop shoot");
       clearInterval(timerShoot);
    }

     } 
      



// обаботчики нажатия кнопок на станице
function up(){
   get_coordinates();
      if (up_empty!="w" && up_empty!="wc"&& up_empty!="ws" && up_empty!="wp" &&up_empty!="locked_door_white"&&up_empty!="locked_door_black") {
      bottom=bottom+50;
      figure.style.bottom= bottom + 'px';
      figure.style.backgroundImage='URL("IMG/player_l.png")';
     }

}

function down(){
  get_coordinates();
      if (down_empty!="w" && down_empty!="wc"&& down_empty!="ws" && down_empty!="wp" &&down_empty!="locked_door_white"&&down_empty!="locked_door_black") {
      bottom=bottom-50;
      figure.style.bottom= bottom + 'px';
      figure.style.backgroundImage='URL("IMG/player_r.png")';

     }
}

function lefty(){
  get_coordinates();
    if (left_empty!="w" && left_empty!="wc"&& left_empty!="ws" && left_empty!="wp" &&left_empty!="locked_door_white"&&left_empty!="locked_door_black") {
    left=left-50;
    figure.style.left = left + 'px';
    figure.style.backgroundImage='URL("IMG/player_l.png")';
    }

}

function right(){
   get_coordinates();
      if (right_empty!="w" && right_empty!="wc"&& right_empty!="ws" && right_empty!="wp" &&right_empty!="locked_door_white"&&right_empty!="locked_door_black") {
      left=left+50;
      figure.style.left= left + 'px';
      figure.style.backgroundImage='URL("IMG/player_r.png")';
      }

}

function showMassege(){

  message=document.getElementById('message');
  message.style.display="block";
  message.innerHTML="<br><br><br><br><br><h1>YOU DIED!</h1>";
  setTimeout(hideMassege, 3000);
}


function hideMassege(){
  
  message=document.getElementById('message');
  message.style.display="none";
 
}



function stat(){
    alert("Life: " + life  
        + "Location: room" + tempLocation);
}
















