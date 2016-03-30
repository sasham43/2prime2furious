$(function(){
//$("ol").add("ul").add("div").css("color", "red");  // add lets you chain together selectors to select disparate elements
//
// console.log($("a").attr());

  // $(".box").on('dblclick',function(){
  //   $(this).toggleClass("white-box");
  // });

//  $(".box:first").add(".box:last").toggleClass("invisible");


  // basket
  var bX = $(".basket").css("top");
  var bY = $(".basket").css("left");

  // box-follow
  var boxSelected = '';
  var scored = false;
  $(".box").one('click', function(event){
    //$(event.target).toggleClass("absolute-positioned"); // switch positioning to absolute so the left and top properties affect it
    //$(event.target).text(event.target.id);
    boxSelected = "#" + event.target.id;
    // console.log(boxSelected);
  });

  $(".box").on('dblclick',function(){
    boxSelected = '';
    scored = false;
  });

  var points = 0;
  $(document).on("mousemove",function(event){
    var xPos = event.pageX;
    var yPos = event.pageY;
    $("#xPos").html(xPos);
    $("#yPos").html(yPos);
    $("#xBasket").html(bX);
    $("#yBasket").html(bY);
    // console.log('xPos',xPos);
    // console.log('yPos',yPos);
     $(boxSelected).css({"left":(event.pageX)-50, "top":(event.pageY)-50}); // makes it so the box follows the cursor.  The -50 is so that it's possible to click an element to return it to its original position

     // scorekeeping
     if(!scored & boxSelected != ''){
       if(xPos >= 240 && xPos <= 293){
         if(yPos >= 539 && yPos <= 594){
           scored = true;
           points++;
           $("#points").html(points);
         }
       }
     }
  });


//////////////////////////////
//      cars
///////////////////////////////



  // keypress
  var carClicked = '#car1';
  $(".cars").on('click',function(event){
    //console.log(event.target);
    carClicked = '#' + event.target.id;
    //console.log(carClicked);
  });

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

    var keyX = parseInt($(carClicked).css("left"));
    var keyY = parseInt($(carClicked).css("top"));

    if(!collisionDetected){
      switch(key.which){
        case 38: // up
          keyY -= 15;
          $(carClicked).addClass("car-up");
          $(carClicked).removeClass("car-right");
          $(carClicked).removeClass("car-left");
          $(carClicked).removeClass("car-down");
          break;
        case 40: // down
          keyY += 15;
          $(carClicked).addClass("car-down");
          $(carClicked).removeClass("car-right");
          $(carClicked).removeClass("car-left");
          $(carClicked).removeClass("car-up");
          break;
        case 37: // left
          keyX -= 15;
          $(carClicked).addClass("car-left");
          $(carClicked).removeClass("car-down");
          $(carClicked).removeClass("car-right");
          $(carClicked).removeClass("car-up");
          break;
        case 39: // right
          keyX += 15;
          $(carClicked).addClass("car-right");
          $(carClicked).removeClass("car-left");
          $(carClicked).removeClass("car-down");
          $(carClicked).removeClass("car-up");
          break;
      }
    } else {
      switch(key.which){
        case 38:
          keyY+=5;
          break;
        case 40:
          keyY-=5;
          break;
        case 37:
          keyX+=5;
          break;
        case 39:
          keyX-=5;
          break;
      }
      keyX-=5;
      keyY-=5;
      collisionDetected = false;
    }

    var keyXString = keyX + "px";
    var keyYString = keyY + "px";
    $(carClicked).css({"left": keyXString,"top":keyYString});

    // collision
    // var car = {
    //   x: parseInt($(carClicked).css("left")),
    //   y: parseInt($(carClicked).css("top")),
    //   width: parseInt($(carClicked).css("width")),
    //   height: parseInt($(carClicked).css("height"))
    // };

    // var building = {
    //   x: parseInt($(".building").css("left")),
    //   y: parseInt($(".building").css("top")),
    //   width: parseInt($(".building").css("width")),
    //   height: parseInt($(".building").css("height"))
    // };

    // console.log('car',car);
    // console.log('building',building);

    // if(
    //   car.x < building.x + building.width &&
    //   car.x + car.width > building.x &&
    //   car.y < building.y + building.height &&
    //   car.y + car.height > building.y
    // ) {
    //   collisionDetected = true;
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


  function Building(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    // this.isCollided = function(){
    //   var collided = car.x < this.x + this.width &&
    //   car.x + car.width > this.x &&
    //   car.y < this.y + this.height &&
    //   car.y + car.height > this.y;
    //
    //   return collided;
    // }
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
