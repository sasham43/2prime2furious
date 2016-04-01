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

  // Initialize speed and bounceback variables
  var speed = 15;
  var bounceback = speed + 5;

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
    $(coinSelected).addClass("coin-picked-up");
  });

  $(document).on('dblclick', ".coins", function(){
    $(coinSelected).removeClass("coin-picked-up");
    coinSelected = '';
  })

  // click to move powerups
  var pwrUpSelected = '';
  $(document).on('click',".pwrups", function(event){
    pwrUpSelected = '#' + event.target.id;
    $(pwrUpSelected).addClass("coin-picked-up");
  })

  $(document).on('dblclick', ".pwrups", function(){
    $(pwrUpSelected).removeClass("coin-picked-up");
    pwrUpSelected = '';
  })

  // click to move buildings
  var buildingSelected = '';
  $(document).on('click',".building",function(event){
    buildingSelected = '#' + event.target.id;
    $(buildingSelected).addClass("building-picked-up");
    console.log(buildingSelected);
    // should add box shadow to look like it's picked up
  });

  $(document).on('dblclick', ".building" ,function(){
    $(buildingSelected).removeClass("building-picked-up");
    buildingSelected = '';
  })

  $(document).on('mousemove',function(event){
    var buildingX = event.pageX;
    var buildingY = event.pageY;

    $(buildingSelected).css({"left":(event.pageX)-50, "top":(event.pageY)-50});
    $(coinSelected).css({"left":(event.pageX)-10, "top":(event.pageY)-10});
    $(pwrUpSelected).css({"left":(event.pageX)-10, "top":(event.pageY)-10});
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

    var pwrUpArray = [];
    $(".pwrups").each(function(index){
      var tempX = parseInt($(this).css("left"));
      var tempY = parseInt($(this).css("top"));
      var tempWidth = parseInt($(this).css("width"));
      var tempHeight = parseInt($(this).css("height"));
      var tempID = "#pwrup" + (index+1);
      var tempPwrUp = new PowerUp(tempX, tempY, tempWidth, tempHeight, tempID);

      pwrUpArray.push(tempPwrUp);
    });

    // var keyX = parseInt($(carClicked).css("left"));
    // var keyY = parseInt($(carClicked).css("top"));

    if(!collisionDetected){
      switch(key.which){
        case 38: // up
          car.y -= speed;
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
      console.log("collision");
      switch(key.which){
        case 38:
          car.y+=bounceback;
          car.x+=bounceback-10;
          break;
        case 40:
          car.y-=bounceback;
          car.x-=bounceback-10;
          break;
        case 37:
          car.x+=bounceback;
          car.y+=bounceback-10;
          break;
        case 39:
          car.x-=bounceback;
          car.y-=bounceback-10;
          break;
      }
      //car.x-=5;
      //car.y-=5;
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

    for(var pt = 0; pt < pwrUpArray.length; pt++){
      pwrUpArray[pt].isCollected = function(){
        var collected = car.x < this.x + this.width &&
        car.x + car.width > this.x &&
        car.y < this.y + this.height &&
        car.y + car.height > this.y;

        return collected;
      }
      if(pwrUpArray[pt].isCollected()){
        speed+=10;
        $("#speed").html(speed);
        $(pwrUpArray[pt].id).remove();
        console.log(speed);
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

    // console.log('Which key?',key.which);
    // create new coins with 'c'
    var numCoins = coinArray.length;
    var coinID = numCoins+1;
    if(key.which == 67){
      $(".coin-container").append("<div class=\"coins\" id=\"coin" + coinID + "\"></div>");
    }

    // create new powerups with 'p'
    var numPwrUps = pwrUpArray.length;
    var pwrUpID = numPwrUps+1;
    if(key.which == 80){
      $(".pwrup-container").append("<div class=\"pwrups\" id=\"pwrup" + pwrUpID + "\"></div>")
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

  function PowerUp(x,y,width,height,id){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.id = id;
  }

});
