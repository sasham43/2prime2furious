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


  // keypress
  var keyBoxClicked = '';
  $(".keyBoxes").on('click',function(event){
    console.log(event.target);
    keyBoxClicked = '#' + event.target.id;
    console.log(keyBoxClicked);
  });

  $(document).keydown(function(key){
    // console.log(key.which);
    var keyX = parseInt($(keyBoxClicked).css("left"));
    var keyY = parseInt($(keyBoxClicked).css("top"));
    switch(key.which){
      case 38:
        keyY -= 15;
        break;
      case 40:
        keyY += 15;
        break;
      case 37:
        keyX -= 15;
        break;
      case 39:
        keyX += 15;
        break;
    }
    var keyXString = keyX + "px";
    var keyYString = keyY + "px";
    // console.log("keyXString",keyXString);
    // console.log("keyYString",keyYString);
    $(keyBoxClicked).css({"left": keyXString,"top":keyYString});
  });


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
