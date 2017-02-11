var Schedule = function(option){//进度条对象
	this._init(option);
}
Schedule.prototype = {
	_init:function(option){
		//面向对象的进度条
		//第一步：外部矩形 ：坐标、宽高、边框颜色、圆角
		//第二步：内部矩形：坐标、宽高、填充颜色、圆角
		/*外部矩形*/
		this.x = option.x || 0,//矩形的横坐标位置
		this.y = option.y || 0,//纵坐标
		this.outerWidth = option.outerWidth || 300, //外部矩形宽
		this.h = option.h || 20,  //内外部矩形共同高
		this.stroke = option.stroke || 'blue', //边框颜色
		this.outerRadius = option.outerRadius || 5, //外部矩形圆角
		
		/*内部矩形*/
		this.innerWidth = option.innerWidth || 10,//内部矩形宽
		this.fill = option.fill || 'green' //内部矩形填充颜色
		this.innerRadius = option.innerRadius || 13
		
		//文字
		this.txt = option.txt  //传入文字
		this.fontSize = option.fontSize   //字体大小
		
		//创建一个组织用于容纳 内外矩形以及文字对象
		this.group = new Konva.Group({ //将矩形和外矩形 放到一个组中
			x:this.x,  //组的横坐标位置
			y:this.y
		})
		this.outerRect = new Konva.Rect({ //外矩形
			x:0,
			y:0,
			width:this.outerWidth, //宽
			height:this.h,  //高
			stroke:this.stroke,  //边框颜色
			cornerRadius:this.outerRadius  //圆角
			
		})
		this.group.add(this.outerRect); //添加到组中
		this.innerRect = new Konva.Rect({  //画内部矩形
			x:0,
			y:0,
 			height:this.h,  //高
			width:this.innerWidth, //宽
			cornerRadius:this.innerRadius,
			fill:this.fill  //填充颜色
		})
		this.group.add(this.innerRect);
	    this.text=new Konva.Text({   //画文字
	    	width:this.outerRect.width(),  //以外矩形作为文字的宽

	    	align:'center', //所以当center时就会居中
	    	x:0,
	    	y:-this.fontSize-3,  //y向下为正 上为负值 因为要在矩形上方 所以-的
	    	text:this.txt,  //传入文字
	    	fontSize:this.fontSize
	    })
	    this.group.add(this.text)
	},
	addLayerOrGroup:function(layerOrGroup){
		layerOrGroup.add(this.group); //将组织添加到层或者组织中
	},
	changeVal:function(val){ //传入矩形进度条的值
			
		this.innerRect.to({ //该this指内部圆 to是动画
			width:val*this.outerRect.width(),
			duration:2
		})
		this.text.text('努力加载中:'+val*100 + '%') 
	}
	
}
