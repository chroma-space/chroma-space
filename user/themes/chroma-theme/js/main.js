"use strict";

var title="\
      o                                                                     \n\
      O                                                                     \n\
      o                                                                     \n\
      O                                                                     \n\
.oOo  OoOo. `OoOo. .oOo. `oOOoOO. .oOoO'    .oOo  .oOo. .oOoO' .oOo  .oOo.  \n\
O     o   o  o     O   o  O  o  o O   o     `Ooo. O   o O   o  O     OooO'  \n\
o     o   O  O     o   O  o  O  O o   O  oO     O o   O o   O  o     O      \n\
`OoO' O   o  o     `OoO'  O  o  o `OoO'o Oo `OoO' oOoO' `OoO'o `OoO' `OoO'  \n\
                                                  O                         \n\
                                                  o'                        \n\
";

var quotes = [
 {
    q: "We re going down to the bottom All the way to the bottom We get turned around There is another world spinning inside of this one.",
    a: "Laurie Anderson - Free Fall https://www.youtube.com/watch?v=mrD4aWq9Hr4"
  },
  {
    q: "Don t be your own worst enemy.",
    a: "Bruce Sterling, Literary Freeware -- Not For Commercial Use. Computer Game Developers Conference speech, March 1991: The Wonderful Power of Storytelling https://w2.eff.org/Misc/Publications/Bruce_Sterling/comp_game_designers.article"
  },
  {
    q: "I now see the Earth realistically as a sphere and think of it as a spaceship.",
    a: "Buckminster Fuller, Operating Manual for Spaceship Earth http://72.52.202.216/~fenderse/OperatingManual.html"
  },
  {
    q: "The rest of this is more like retooling for World War II, except with everyone playing on the same team.",
    a: "Saul Griffith on The Long Now Foundation http://library.fora.tv/2009/01/16/Saul_Griffith_Climate_Change_Recalculated/Griffith_Proposes_Massive_Increase_in_Green_Energy. Reference found via http://worrydream.com/ClimateChange/ "
  },
  {
    q: "There are no passengers on Spaceship Earth. We are all crew.",
    a: "Marshall McLuhan https://en.wikiquote.org/wiki/Marshall_McLuhan#/media/File:Robot_Arm_Over_Earth_with_Sunburst_-_GPN-2000-001097.jpg See also https://medium.com/poc-stories/we-are-all-crew-68b10a4b0819#.93f0vipb1 http://v2.nl/archive/articles/we-are-all-crew-blowup-reader-4"
  },
];

//$.ajax("https://gist.githubusercontent.com/paulhayes/9b817f142dbff4655c7b/raw/colorToIChing.js", {success: function(text){ eval(text); }});

var asciiBlockCodes =[9608, 9619, 9618, 9617];
var asciiBlocks = ["█", "▓", "▒", "░"];

$.easing.easeInOutCirc = function (x, t, b, c, d) {
  if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
  return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
}

function isHome(){
  return $('body.home').length>0;
}

function elapsed(time){
  return Date.now() - time;
}

function fadeInOnLoad(selector,duration){
  $(selector).hide().ready(function() {
    $(selector).hide().fadeIn(duration);
  });
}

function isPage(name){
  return $('body.'+name).length>0;
}

function HSLToRGB(h, s, l) {
    if (s == 0) {
      return [l, l, l];
    }

    var temp2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var temp1 = 2 * l - temp2;

    h /= 360;

    var
    rtemp = (h + 1 / 3) % 1,
    gtemp = h,
    btemp = (h + 2 / 3) % 1,
    rgb = [rtemp, gtemp, btemp],
    i = 0;

    for (; i < 3; ++i) {
      rgb[i] = rgb[i] < 1 / 6 ? temp1 + (temp2 - temp1) * 6 * rgb[i] : rgb[i] < 1 / 2 ? temp2 : rgb[i] < 2 / 3 ? temp1 + (temp2 - temp1) * 6 * (2 / 3 - rgb[i]) : temp1;
    }

    return "#"+rgb[0].toString(16)+rgb[1].toString(16)+rgb[2].toString(16);
}

$(function() {

  // if( isHome() ){
  //   $('a[href="/about"]').attr('href','#about');
  // }

  var scrollToAnchor = function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[id=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').delay(300).animate({
          scrollTop: target.offset().top
        }, 900, "easeInOutCirc");
        return false;
      }
    }
  };

  $('a[href*=\\#]:not([href=\\#])').click(scrollToAnchor);

  if( window.location.hash ){
    //scrollToAnchor.apply(location,true);
  }
});

fadeInOnLoad('.splash h1',1800);

$(function(){

    if( isHome() ){
      var video = document.getElementsByTagName("video")[0];
      var turnOn = false;
      var lastTime = Date.now();
      var videoFX = function(on){
          if( typeof(on) != "undefined" ) turnOn = on;
          else turnOn = !turnOn;
          var val = !turnOn ? "none" : "saturate(100) hue-rotate(-127deg)" ;
          var duration = 2400 ;
          lastTime = Date.now();
          $(video).css( "-webkit-filter",val);
          $(video).css( "filter",val);
          if(turnOn) setTimeout(videoFX,duration);
      }

      var randomInterval = function(s,min,max,f){
          if(f)f(true);
          setTimeout(randomInterval.bind(null,s,min,max,s),min+Math.random()*(max-min));
      }

      //randomInterval(videoFX.bind(null,true),5000,20000);

      $(".splash-title").mouseover(function(){
        if( elapsed(lastTime) > 5000 ){
          videoFX(true);
        }
      }).mouseout(function(){
        //videoFX(false);
      });
    }
    if( isPage("about") ){
        var video = $("video.kate-rainbow");
        video.css("-webkit-filter","saturate(0)");
        var lastScroll;

        if( video ){
          setInterval(function(){
            var scroll = $(document).scrollTop();
            var p = Math.max(0,1-scroll/50);
            var b = 1+(scroll/50);
            if( lastScroll != scroll ){
              video.css("-webkit-filter","saturate("+p+") brightness("+b+")");
              video.css("filter","saturate("+p+")");
              lastScroll = scroll;
            }
          },100);
          /*
          $('#navbar a').mouseover(function(){
            console.log("over");
            video.css("-webkit-filter","saturate(0.3), contrast(-100)");
          });
          $('#navbar a').mouseout(function(){
            video.css("-webkit-filter","saturate(1)");
          });
          */
        }

    }
});

$(function(){
  var panoramas = $("canvas.panorama");
  panoramas.each(function(i,pano){

      var userControl = ($(pano).attr("user-control")=="true") || false;
      var manualControl = false;
      var longitude = $(pano).attr("start-angle") || 180;
      var latitude = 0;
      var savedX;
      var savedY;
      var savedLongitude;
      var savedLatitude;
      var longitudeSpeed = Number( $(pano).attr("longitude-speed") || 0.01 );

      // panoramas background
      var baseUrl = ($(pano).attr("base-url")) || "" ;
      var panoramasArray = $(pano).attr("panorama-images").split(",").map(function(e){ return baseUrl+e });
      var panoramaNumber = Math.floor(Math.random()*panoramasArray.length);

      // setting up the renderer
      var renderer = new THREE.WebGLRenderer({ canvas : pano });
      renderer.setSize($(pano).width(),$(pano).height());

      // creating a new scene
      var scene = new THREE.Scene();

      // adding a camera
      var camera = new THREE.PerspectiveCamera(30, $(pano).width() / $(pano).height(), 1, 1000);
      camera.target = new THREE.Vector3(0, 0, 0);

      // creation of a big sphere geometry
      var sphere = new THREE.SphereGeometry(100, 100, 40);
      sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

      // creation of the sphere material
      var sphereMaterial = new THREE.MeshBasicMaterial();
      sphereMaterial.map = THREE.ImageUtils.loadTexture(panoramasArray[panoramaNumber])

      // geometry + material = mesh (actual object)
      var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
      scene.add(sphereMesh);




        var render = function(){

          requestAnimationFrame(render);

          if(!manualControl){
            longitude += longitudeSpeed;
          }

          // limiting latitude from -85 to 85 (cannot point to the sky or under your feet)
          latitude = Math.max(-85, Math.min(85, latitude));

          // moving the camera according to current latitude (vertical movement) and longitude (horizontal movement)
          camera.target.x = 500 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.cos(THREE.Math.degToRad(longitude));
          camera.target.y = 500 * Math.cos(THREE.Math.degToRad(90 - latitude));
          camera.target.z = 500 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.sin(THREE.Math.degToRad(longitude));
          camera.lookAt(camera.target);

          // calling again render function
          renderer.render(scene, camera);

      }

      // when the mouse is pressed, we switch to manual control and save current coordinates
      var onDocumentMouseDown = function(event){

        event.preventDefault();

        manualControl = true;

        savedX = event.clientX;
        savedY = event.clientY;

        savedLongitude = longitude;
        savedLatitude = latitude;

      }

      // when the mouse moves, if in manual contro we adjust coordinates
      var onDocumentMouseMove = function(event){

        if(manualControl){
          longitude = (savedX - event.clientX) * 0.1 + savedLongitude;
          latitude = (event.clientY - savedY) * 0.1 + savedLatitude;
        }

      }

      // when the mouse is released, we turn manual control off
      var onDocumentMouseUp = function(event){

        manualControl = false;

      }

      // pressing a key (actually releasing it) changes the texture map
      document.onkeyup = function(event){

        panoramaNumber = (panoramaNumber + 1) % panoramasArray.length
        sphereMaterial.map = THREE.ImageUtils.loadTexture(panoramasArray[panoramaNumber])

      }

      // listeners
      if( userControl ){
        document.addEventListener("mousedown", onDocumentMouseDown, false);
        document.addEventListener("mousemove", onDocumentMouseMove, false);
        document.addEventListener("mouseup", onDocumentMouseUp, false);
      }
      render();


  });

});

$('.half-splash').mouseover(function(){
  $('.splash-bottom').fadeIn();
});
$('.half-splash').mouseleave(function(){
  $('.splash-bottom').fadeOut();
});

$(function(){

  if( new Date().getDate() == 6 && new Date().getMonth() == 8 ){

    title="\
 ██████╗██╗  ██╗██████╗  ██████╗ ███╗   ███╗ █████╗    ███████╗██████╗  █████╗  ██████╗███████╗\n\
██╔════╝██║  ██║██╔══██╗██╔═══██╗████╗ ████║██╔══██╗   ██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝\n\
██║     ███████║██████╔╝██║   ██║██╔████╔██║███████║   ███████╗██████╔╝███████║██║     █████╗\n\
██║     ██╔══██║██╔══██╗██║   ██║██║╚██╔╝██║██╔══██║   ╚════██║██╔═══╝ ██╔══██║██║     ██╔══╝\n\
╚██████╗██║  ██║██║  ██║╚██████╔╝██║ ╚═╝ ██║██║  ██║██╗███████║██║     ██║  ██║╚██████╗███████╗\n\
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝\n\
";
}

  var lines = [
    "chroma - this help message ",
    "contact - our contact details",
    "quote - voices we receive with gratitude across the cultural membrane",
  ];

  var log = function(s){
    console.log("%c"+s,"background:#fff");
  }

  console.hueLog = function(text){
    var x = 0;
    for(var i=0;i<text.length;i++){
      if( text[i] == "\n" ){
        x=0;
        console.log("\n");
        continue;
      }
      console.log("%c"+text[i],"color "+HSLToRGB(x,1,0.5) );
      x++;
    }
  }

  window.__defineGetter__("chroma",function(){
    log( lines.join("\n") );
  });

  window.__defineGetter__("contact",function(){
    log("kate@chroma.space - Kate Genevieve \n");
  });

  window.__defineGetter__("quote",function(){
    var i = Math.floor( quotes.length * Math.random() );
    log( quotes[i].q + "\n\t\t\t - "+quotes[i].a );
  });


  var s="";
  for(var i=0;i<360;i++){
    var p=i/360.0;
    s+="0px "+(i/4)+"px hsl("+(180+i)+",80%,"+((0.5*p+0.5)*100)+"%)";
    if(i<359)s+=', ';
  }

  console.log("%c"+title+"\n\n\n\n\n","color:#fff;text-shadow: "+s);
  log("type chroma to list commands");
});

$(function(){
  var cols = ['red','yellow','green','sea-green','blue', 'purple', 'magenta'];
  var index = Math.floor( Math.random() * cols.length );



  $('a').each(function(i,e){
    if( $.grep( ($(e).attr('class') || "").split(/\s+/),function(n){ return cols.indexOf(n) != -1 }).length > 0 ){
        return;
    };
    var firstWord = ( $(e).attr('title') || "" ).split(" ")[0] ;
    var colClass = firstWord;
    if( cols.indexOf(colClass) == -1 ){
      colClass = cols[index];
      //index++;
      if( index == cols.length ) index = 0;
    }
    $(e).addClass( colClass );
  });

});

$(function(){
  var controls = $('.video-controls');
  var muteButton = $('.mute',controls);
  var unmuteButton = $('.unmute',controls);
  muteButton.click(function(){
    (controls.prev()).prop('muted', true);
    muteButton.hide();
    unmuteButton.show();
    event.preventDefault();
    return false;
  });
  unmuteButton.click(function(){
    (controls.prev()).prop('muted', false);
    unmuteButton.hide();
    muteButton.show();
    event.preventDefault();
    return false;
  });

  $('video.pauseable-video').each(function(i,e){
    console.log(e);
    $(e).parent().click(function(){
      console.log(e);
      if( e.paused ) e.play();
      else e.pause();
    });
  });

});

$(function(){

  var randRange = function(min,max){
      return min+Math.floor( Math.random()*(max-min) );
  }

  var container=$('.about-container')[0];
  var canvas = $('.about-background')[0];
  if( !container || !canvas ) return;
  var context = canvas.getContext('2d');
  var url = $(container).css('background-image').replace('url("','').replace('")','');

  var backgroundImg = new Image();
  var mixup = function(){
    var d = [
      randRange(1,5),
      randRange(1,100)
    ];
    var p1 = [
      randRange(0,context.canvas.width-d[0]),
      randRange(0,backgroundImg.height-d[1]),
    ]
    var p2 = [
      randRange(0,context.canvas.width-d[0]),
      randRange(0,context.canvas.height-d[1]),
    ]
    var rect1=context.getImageData(p1[0],p1[1],d[0],d[1]);
    var rect2=context.getImageData(p2[0],p2[1],d[0],d[1]);
    context.putImageData(rect1,p2[0],p2[1]);
    context.putImageData(rect2,p1[0],p1[1]);
    requestAnimationFrame(mixup);
  }

  backgroundImg.onload = function() {
    context.canvas.width = $(container).width();
    context.canvas.height = $(container).height();

    var scaleX = context.canvas.width / backgroundImg.width ;
    var scaleY = context.canvas.height / backgroundImg.height ;
    var scale = ( scaleX > scaleY ) ? scaleX : scaleY ;
    $(container).css('background-image','none');
    context.drawImage(this, 0, 0, backgroundImg.width, backgroundImg.height, 0, 0, scale*backgroundImg.width, scale*backgroundImg.width*context.canvas.height/context.canvas.width);
    mixup();
  };

  var onWindowResize = function(){
    //canvas.width = $(canvas).parent().width();
    //canvas.height = $(canvas).parent().height();
  }

  window.addEventListener( 'resize', onWindowResize, false );

  backgroundImg.src = url;

})
