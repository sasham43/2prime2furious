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

  // press 'n' to create new building

  $(document).keydown(function(key){

  });


  // click to move buildings
  var buildingSelected = '';
  $(document).on('click',".building",function(event){
    buildingSelected = '#' + event.target.id;
    console.log(buildingSelected);
  });

  $(document).on('dblclick', ".building" ,function(){
    buildingSelected = '';
  })

  $(document).on('mousemove',function(event){
    var buildingX = event.pageX;
    var buildingY = event.pageY;

    $(buildingSelected).css({"left":(event.pageX)-50, "top":(event.pageY)-50});
  });

  // console.log("buildingArray",buildingArray);

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

    var keyX = parseInt($(carClicked).css("left"));
    var keyY = parseInt($(carClicked).css("top"));

    // pull out speed and bounceback variables
    var speed = 15;
    var bounceback = 10;

    if(!collisionDetected){
      switch(key.which){
        case 38: // up
          keyY -= speed;
          $(carClicked).addClass("car-up");
          $(carClicked).removeClass("car-right");
          $(carClicked).removeClass("car-left");
          $(carClicked).removeClass("car-down");
          break;
        case 40: // down
          keyY += speed;
          $(carClicked).addClass("car-down");
          $(carClicked).removeClass("car-right");
          $(carClicked).removeClass("car-left");
          $(carClicked).removeClass("car-up");
          break;
        case 37: // left
          keyX -= speed;
          $(carClicked).addClass("car-left");
          $(carClicked).removeClass("car-down");
          $(carClicked).removeClass("car-right");
          $(carClicked).removeClass("car-up");
          break;
        case 39: // right
          keyX += speed;
          $(carClicked).addClass("car-right");
          $(carClicked).removeClass("car-left");
          $(carClicked).removeClass("car-down");
          $(carClicked).removeClass("car-up");
          break;
      }
    } else {
      switch(key.which){
        case 38:
          keyY+=bounceback;
          break;
        case 40:
          keyY-=bounceback;
          break;
        case 37:
          keyX+=bounceback;
          break;
        case 39:
          keyX-=bounceback;
          break;
      }
      keyX-=5;
      keyY-=5;
      collisionDetected = false;
    }

    var keyXString = keyX + "px";
    var keyYString = keyY + "px";
    $(carClicked).css({"left": keyXString,"top":keyYString});

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

    // create new buildings
    // console.log(key.which);
    var numBuildings = buildingArray.length;
    var newID = numBuildings+1;
    if(key.which == 78){
      $(".building-container").append("<div class=\"building\" id=\"building" + newID + "\"></div>");
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
