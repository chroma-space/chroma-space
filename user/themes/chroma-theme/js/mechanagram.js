window.mechanagram = (function(elementId,width,height){

	var mainElement = document.getElementById(elementId);

	var initalData = (function(){
		
		var o;
		o.set2D = function(){

		}

		return o;
	});

	var colUp=0, colDown=2, rowLeft=1,rowRight=3,
		moveCol = function(i){ return (i&1)===0; },
		moveLeftOrDown = function(i){ return (i&2)===0; },
		move(type,pos){ return {type:type,pos:pos} };

	var moves = (function(width,height){
		var m = [];
		for(var i=0;i<width;i++){
			for(var j=0;j<height;j++){
				m.push( move(colUp,i) );
				m.push( move(colDown,i) );
				m.push( move(rowLeft,j) );
				m.push( move(rowRight,j) );
				var element = document.createElement('div');
				element.innerHTML = '';
			}

		}

		return m;
	})(width,height);

	var shuffle = function(array)
	{
		if (array == null)
			return;
		
		int l = (array.length - 1);
		for (int i=0; i<l; i++) {
			var tmp = array [i];
			int r = Math.floor( array.length * Math.random (i, array.Length) );
			array [i] = array [r];
			array [r] = tmp;
		}
	}

	shuffle(moves);

	function update(){

	}

	function playMove(){

	}

	setInterval(playMove,1000);

});