$(function(){
//$("ol").add("ul").add("div").css("color", "red");  // add lets you chain together selectors to select disparate elements
//
// console.log($("a").attr());

  // $(".box").on('dblclick',function(){
  //   $(this).toggleClass("white-box");
  // });

//  $(".box:first").add(".box:last").toggleClass("invisible");

//////////////////////////////
//      cars
///////////////////////////////

  // initialize coinCount
  var coinCount = 0;

  // put cars at start
  var startPosX = parseInt($(".car-start").css("left"));
  var startPosY = parseInt($(".car-start").css("top"));
  var carStartX = (startPosX+12) + "px";
  var carStartY = (startPosY+12) + "px";

  $(".cars").css({"top": carStartY,"left": carStartX});

  // keypress
  var carClicked = '#car1';
  $(".cars").on('click',function(event){
    //console.log(event.target);
    carClicked = '#' + event.target.id; // grab id and add # selector for jQuery
    //console.log(carClicked);
  });

  // click to move coins
  var coinSelected = '';
  $(document).on('click', ".coins", function(event){
    coinSelected = '#' + event.target.id;
    $(coinSelected).addClass("picked-up");
  });

  $(document).on('dblclick', ".coins", function(){
    $(coinSelected).removeClass("picked-up");
    coinSelected = '';
  })

  // click to move buildings
  var buildingSelected = '';
  $(document).on('click',".building",function(event){
    buildingSelected = '#' + event.target.id;
    $(buildingSelected).addClass("picked-up");
    console.log(buildingSelected);
    // should add box shadow to look like it's picked up
  });

  $(document).on('dblclick', ".building" ,function(){
    $(buildingSelected).removeClass("picked-up");
    buildingSelected = '';
  })

  $(document).on('mousemove',function(event){
    var buildingX = event.pageX;
    var buildingY = event.pageY;

    $(buildingSelected).css({"left":(event.pageX)-50, "top":(event.pageY)-50});
    $(coinSelected).css({"left":(event.pageX)-10, "top":(event.pageY)-10});
  });

  // car movement
  var collisionDetected = false;
  $(document).keydown(function(key){
    // build car object
    var car = {
      x: parseInt($(carClicked).css("left")),
      y: parseInt($(carClicked).css("top")),
      width: parseInt($(carClicked).css("width")),
      height: parseInt($(carClicked).css("height"))
    };

    // construct building objects
    var buildingArray = [];
    $(".building").each(function(index){
      var tempX = parseInt($(this).css("left"));
      var tempY = parseInt($(this).css("top"));
      var tempWidth = parseInt($(this).css("width"));
      var tempHeight = parseInt($(this).css("height"));
      var tempBuilding = new Building(tempX, tempY, tempWidth, tempHeight);

      buildingArray.push(tempBuilding);
    });

    var coinArray = [];
    $(".coins").each(function(index){
      var tempX = parseInt($(this).css("left"));
      var tempY = parseInt($(this).css("top"));
      var tempWidth = parseInt($(this).css("width"));
      var tempHeight = parseInt($(this).css("height"));
      var tempID = "#coin" + (index+1);
      var tempCoin = new Coin(tempX, tempY, tempWidth, tempHeight, tempID);

      coinArray.push(tempCoin);
    });

    // var keyX = parseInt($(carClicked).css("left"));
    // var keyY = parseInt($(carClicked).css("top"));

    // pull out speed and bounceback variables
    var speed = 15;
    var bounceback = 10;

    if(!collisionDetected){
      switch(key.which){
        case 38: // up
          car.y-= speed;
          $(carClicked).addClass("car-up");
          $(carClicked).removeClass("car-right");
          $(carClicked).removeClass("car-left");
          $(carClicked).removeClass("car-down");
          break;
        case 40: // down
          car.y += speed;
          $(carClicked).addClass("car-down");
          $(carClicked).removeClass("car-right");
          $(carClicked).removeClass("car-left");
          $(carClicked).removeClass("car-up");
          break;
        case 37: // left
          car.x -= speed;
          $(carClicked).addClass("car-left");
          $(carClicked).removeClass("car-down");
          $(carClicked).removeClass("car-right");
          $(carClicked).removeClass("car-up");
          break;
        case 39: // right
          car.x += speed;
          $(carClicked).addClass("car-right");
          $(carClicked).removeClass("car-left");
          $(carClicked).removeClass("car-down");
          $(carClicked).removeClass("car-up");
          break;
      }
    } else {
      switch(key.which){
        case 38:
          car.y+=bounceback;
          break;
        case 40:
          car.y-=bounceback;
          break;
        case 37:
          car.x+=bounceback;
          break;
        case 39:
          car.x-=bounceback;
          break;
      }
      car.x-=5;
      car.y-=5;
      collisionDetected = false;
    }

    var carXString = car.x + "px";
    var carYString = car.y + "px";
    $(carClicked).css({"left": carXString,"top": carYString});

    // build coin object
    // var coin = {
    //   x: parseInt($("#coin").css("left")),
    //   y: parseInt($("#coin").css("top")),
    //   width: parseInt($("#coin").css("width")),
    //   height: parseInt($("#coin").css("height"))
    // }

    // console.log("coin position", coin)

    // console.log(coinArray);
    // coin collection
    for(var ct = 0; ct < coinArray.length; ct++){
      coinArray[ct].isCollected = function(){
        var collected = car.x < this.x + this.width &&
        car.x + car.width > this.x &&
        car.y < this.y + this.height &&
        car.y + car.height > this.y;

        return collected;
      }
      if(coinArray[ct].isCollected()){
        coinCount++;
        $("#coin-count").html(coinCount);
        // removing coins messes with the coin array and thus the creation of coin ids for the html elements
        $(coinArray[ct].id).remove();
      }
    }
    // var collide1 = (car.x < coin.x + coin.width);
    // var collide2 = (car.x + car.width > coin.x);
    // var collide3 = (car.y < coin.y + coin.height);
    // var collide4 = (car.y + car.height > coin.y);
    // // console.log(collide1, collide2, collide3, collide4);
    // if (collide1 &&
    //   collide2 &&
    //   collide3 &&
    //   collide4
    // ){
    //   coinCount++;
    //   $("#coin-count").html(coinCount);
    //   $("#coin").remove();
    // }

    for(var kt = 0; kt < buildingArray.length; kt++){
      // console.log('buildingArray[kt]',buildingArray[kt]);
      buildingArray[kt].isCollided = function(){
        var collided = car.x < this.x + this.width &&
        car.x + car.width > this.x &&
        car.y < this.y + this.height &&
        car.y + car.height > this.y;

        return collided;
      };
      if(buildingArray[kt].isCollided()){
        collisionDetected = true;
        break;
      }
    }

    // create new buildings with 'n'
    var numBuildings = buildingArray.length;
    var newID = numBuildings+1;
    if(key.which == 78){
      $(".building-container").append("<div class=\"building\" id=\"building" + newID + "\"></div>");
    }

    console.log(key.which);
    var numCoins = coinArray.length;
    var coinID = numCoins+1;
    if(key.which == 67){
      $(".coin-container").append("<div class=\"coins\" id=\"coin" + coinID + "\"></div>");
    }

    // debug console
    // $("#carX").html(car.x);
    // $("#carY").html(car.y);
    // $("#carWidth").html(car.width);
    // $("#carHeight").html(car.height);
    //
    // $("#buildingX").html(building.x);
    // $("#buildingY").html(building.y);
    // $("#buildingWidth").html(building.width);
    // $("#buildingHeight").html(building.height);
  });

  // building constructor
  function Building(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  // coin constructor
  function Coin(x, y, width, height, id){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = id;
  }




  // console.log(bX);
  // console.log(bY);

  // jQuery documentation code
  // $( document ).on( "mousemove", function( event ) {
  //   // console.log(event.pageX);
  //   // console.log(event.pageY);
  // $( "#box1" ).text( "pageX: " + event.pageX + ", pageY: " + event.pageY );
  // $("#box1").css({"left":event.pageX, "top":event.pageY});
  // });


});
