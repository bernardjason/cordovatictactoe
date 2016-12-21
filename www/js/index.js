var platform = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;

var game = "tictactoe";
var margin=10

var cellWidth=($(window).width()-(margin*2) )/3;
var cellHeight=($(window).height() * 0.5 )/3;

var rows = [ ];
var wincells = [];
rows[0]=[];
rows[1]=[];
rows[2]=[];
var rowCanvas = [];
rowCanvas[0] = [];
rowCanvas[1] = [];
rowCanvas[2] = [];
var player="X";


var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
		if ( ! platform ) {
			cellWidth=($(window).width()/2-(margin*2) )/3;
			cellHeight=($(window).height()/2 )/3;
		}
		$("#player1").addClass('hidden');
    		$("#player2").addClass('hidden');
    		$("#game").addClass('hidden');

				$('#menu').on('click', 'a', function(e) {
      		e.preventDefault();
      		var what = $(this).attr('href').substring(1);
      		loadMenuAreaSelected(what);
  			});

        setupNewGame();
				$("div#home").removeClass("hidden");
				setupEvents();
				navigator.splashscreen.hide() ;
				document.addEventListener("backbutton", onBackKeyDown, false);

        app.overrideBrowserAlert();
    },

    overrideBrowserAlert: function() {
        if (navigator.notification) { // Override default HTML alert with native dialog
					console.log("Platform is "+platform);
					if ( platform ) {
            		window.alert = function (message) {
                		navigator.notification.alert(
                    		message,    // message
                    		null,       // callback
                    		game,
                    		'OK'        // buttonName
                		);
						};
					} else {
						window.alert = function(message) {
							browserAlert("tictactoe alert","tictactoe alert",message);
						}
						navigator.notification.prompt = function(message,callBackFunction,title,buttonLabels,defaultText) {
							browserAlertInput(message,callBackFunction,title,buttonLabels,defaultText);
						}
					}
        }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

var localStorage = window.localStorage;	

function onBackKeyDown(e) {
		//loadMenuAreaSelected();
		navigator.Backbutton.goHome(function() {
  		console.log('success')
		}, function() {
  		console.log('fail')
		});
		return false;
}

function setupEvents() {
	$('#newgame').on('click', function(e) {
		setupNewGame();
		drawGame();
  	$("#currentplayerimage").attr('src', 'img/img_avatar.png');
		setPlayer("X");
	});
	
	$('#player1clear').on('click', function(e) {
  	localStorage.removeItem("player1");
		loadMenuAreaSelected();
	});
	
	$('#player2clear').on('click', function(e) {
  	localStorage.removeItem("player2");
		loadMenuAreaSelected();
	});
}

function loadMenuAreaSelected(todo) {
		var p = $(this).parent();
		if($(p).hasClass('active')){
			$("#menu li").removeClass('active');
		} else {
			$("#menu li").removeClass('active');
			$(p).addClass('active');
		}
	  $("#player1").addClass('hidden');
	  $("#player2").addClass('hidden');
	  $("#game").addClass('hidden');
		$("#"+todo).removeClass('hidden');
		if ( todo != "game" && todo != undefined ) {
			loadImage(todo,$("#"+todo+"image"),true);
		} 
		if ( todo == "game" ) {
			setPlayer(player);
		}
}



function clearGame() {
	rows[0] = [ '','','' ];
	rows[1] = [ '','','' ];
	rows[2] = [ '','','' ];
	resetWin();
}
function resetWin() {

	wincells[0] = [ 0,0,0];
	wincells[1] = [ 0,0,0];
	wincells[2] = [ 0,0,0];
}

function setupNewGame()  {

	clearGame();
	for(r=0 ; r <= 2 ; r++) {
		for(c=0 ; c <= 2 ; c++) {
			var canvas = document.createElement('canvas');
			canvas.id = "c"+r+c;
      			canvas.width = cellWidth;
      			canvas.height = cellHeight;
      			var context = canvas.getContext('2d');
			canvasClear(context)
			var row = rowCanvas[r] 
			console.log("row is "+row);
			row[c] = canvas;
			// was append
      			$("#ttt"+r+c).html(canvas);
			$('#c'+r+c).on('click', function(e) {
					console.log("clicked, id "+this.id+", text"+this.innerHTML);
					console.log("ROWS is "+JSON.stringify(rows));
					var id = this.id ; //e.toElement.id.substring(1);
					var r = id.substring(1,2);
					var c = id.substring(2,3);
					console.log("R =["+r+"]");
					console.log("C =["+c+"]");
					console.log("["+rows[r][c].length+"]");
					if( rows[r][c].length == 0  ) {
						rows[r][c]=player
						if ( player == "X" ) 
							setPlayer("O");
						else 
							setPlayer("X");

						drawGame();	
						checkWinner();
					} else {

					}
				}
			);
		}
	}
}

function setPlayer(p) {
		if ( p == "X" || p == "O" ) player = p;
		if ( p == "X" ) which = "player1";
		if ( p == "O" ) which = "player2";
  	$("#currentplayerchip").html(
			'<img id="currentplayerimage"  src="img/img_avatar.png" alt="Person" width="128" height="128">'+which
		);
		loadImage(which,$("#currentplayerimage"),false);
}
function canvasClear(context) {
      context.beginPath();
      context.fillStyle = "pink";
      context.rect(1, 1, cellWidth-1, cellHeight-1);
      context.fill();
}

function drawGame() {
	for(r = 0 ; r <= 2 ; r++ ) {
		for(c = 0 ; c <= 2 ; c++) {
  		var canvas = rowCanvas[r][c]
			var context = canvas.getContext('2d');
			var border = cellHeight*0.12
      if ( cellHeight > cellWidth )  border = cellWidth*0.12;
			context.lineWidth=2;
			canvasClear(context)
			if ( wincells[r][c] == 1 ) {
				context.strokeStyle="#FF0000";
			} else {
				context.strokeStyle="#000000";
			}
			if( rows[r][c] == 'X' ) {
				context.beginPath();
				context.moveTo(border,border);
				context.lineTo(cellWidth-border,cellHeight-border);
				context.stroke();
				context.moveTo(border,cellHeight-border);
				context.lineTo(cellWidth-border,border);
				context.stroke();
			}
			if( rows[r][c] == 'O' ) {
				context.beginPath();
				var radius = cellHeight/2;
        if ( cellHeight > cellWidth )  radius = cellWidth/2;
				context.arc(cellWidth/2,cellHeight/2,radius - border ,0,2*Math.PI);
				context.stroke();
			}
		}
	}

}

function checkWinner(p) {
	check("X");
	check("O");
}

function check(p) {
	var winner=false;
	resetWin();
	lookfor=p+","+p+","+p;
	for(r=0 ; r <= 2 ; r++) {
		if (rows[r].toString() == lookfor ) {
			winner=true;
			wincells[r] = [ 1,1,1];
		}
	}
	if ( winner == false ) {
		for(c=0 ; c <= 2 ; c++) {
			var w=0;
			for(r=0 ; r <= 2 ; r++) {
				if ( rows[r][c] == p ) w=w+1;
			}
			if ( w == 3 ) {
				winner=true;
				wincells[0][c]=1;
				wincells[1][c]=1;
				wincells[2][c]=1;
			}
		}
	}
	if ( winner == false ) {
		var r=0;
		var w=0;
		for(c=0 ; c <= 2 ; c++) {
				if ( rows[r][c] == p ) w=w+1;
				wincells[r][c]=1;
				r=r+1;
		}	
		if ( w == 3 ) {
			winner=true;
		} else {
			resetWin();
		}
	}
	if ( winner == false ) {
		var r=2;
		var w=0;
		for(c=0 ; c <= 2 ; c++) {
				if ( rows[r][c] == p ) w=w+1;
				wincells[r][c]=1;
				r=r-1;
		}	
		if ( w == 3 ) {
			winner=true;
		} else {
			resetWin();
		}
	}
	if ( winner == true ) {
		alert("We have a winner");
		drawGame();
	}
}

/* ****************************************************************
Camera 
*******************************************************************
*/

function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}
function openCamera(selection,filename,dest) {

    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);

    if (selection == "camera-thmb") {
        options.targetHeight = 100;
        options.targetWidth = 100;
    }

    navigator.camera.getPicture(function cameraSuccess(imageUri) {

        displayImage(imageUri,filename,dest);

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}
function displayImage(imgUri,filename,dest) {
		console.log("displayImage "+filename);
		console.log("original "+imgUri.length);
		saveImage(filename,imgUri,dest);
}

function loadImage(filename,dest,capture) {

	dest.attr('src', 'img/img_avatar.png');

  var storage = window.localStorage;
  var imgUri = storage.getItem(filename); 
  if ( imgUri != null ) {
		dest.attr('src', 'data:image/jpg;base64,'+imgUri);
  } else if ( capture == true ) {
    openCamera("camera-thmb",filename,dest);
	}
}

function saveImage(filename,imgUri,dest) {
  var storage = window.localStorage;
  storage.setItem(filename,imgUri); 
	dest.attr('src', 'data:image/jpg;base64,'+imgUri);

}
