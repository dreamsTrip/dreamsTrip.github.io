var Cake = function(option){ //创建一个饼状图对象
	this._init(option);    //初始化参数
}                
Cake.prototype={//原型对象
	_init:function(option){ 
		this.x = option.x; //饼状图中点横坐标位置
		this.y = option.y;
		this.outCirRadius  = option.outCirRadius; //外圆半径
		this.inCirRadius = option.inCirRadius; //内圆半径
		this.outCirColor = option.outCirColor; //外圆颜色
		this.data = option.data;
		this.group = new Konva.Group({ //通过konva框架创建 组织Group
			x:this.x,  //将组的横坐标位置设在画布的中点
			y:this.y
		})
		this.outCircle = new Konva.Circle({
			x:0,  //因为圆是在组中 而组的起始原点在画布的中点  所以x:0就是在画布的中点
			y:0,
			radius:this.outCirRadius, // 外圆半径
			stroke:this.outCirColor  //外圆颜色
			
		})
		this.group.add(this.outCircle);  //添加到组中
		this.innerCircle =  new Konva.Circle({
			x:0,
			y:0,
			radius:this.inCirRadius,  //内圆半径
			stroke:this.outCirColor   //内圆颜色跟外圆一样
		})
		this.group.add(this.innerCircle);//一定要将画的对象添加到组中
		                  //组添加到层中layer 层添加到舞台stage中
		var _this = this;   //要保存this 否则在this.data中会被改变
		var endAngle=0;    //圆弧的角度
		var textAngle=0;   //字的角度
		this.data.forEach(function(item,index){
			var arc = new Konva.Arc({//基于框架画圆
			x:0,
			y:0,
			outerRadius:_this.inCirRadius, //圆弧的半径以内圆半径为准
			angle:item.value*360,
			fill:item.color,
			rotation:endAngle,  //旋转角度之后 在画下一个圆弧就会以上一个结束边作为起始
			name:'arc'  //作为每个圆的名称 
			
			
		 })
			
		
			textAngle =endAngle+ 1/2*item.value*360; //文字角度是上一个的圆弧加上下一个圆弧的一半
			var text = new Konva.Text({ //画文字
				x:(200+20)*Math.cos(textAngle*Math.PI/180),
				y:(200+20)*Math.sin(textAngle*Math.PI/180),
				text:item.value*100+"%",  //百分比
				fill:item.color //填充颜色
			})
			if(textAngle > 180 && textAngle < 260){
				text.x(text.x()-text.width())  //将百分比往左移一些
			}
			endAngle += item.value*360; //画圆弧由起始角度+结束角度 在画下个圆弧时 要将上一个的圆弧结束角度 
			                        //作为当下的起始角度 所以上一个圆弧的角度
			_this.group.add(arc)
			_this.group.add(text)
	   })
		
	},
	addLayerOrGroup:function(layerOrGroup){
		layerOrGroup.add(this.group);   //层或者组添加组
	},
	moveTo:function(){        //动画
		var arcArr= this.group.find('.arc');  //找到每个圆要加.（name:arc）
		arcArr.forEach(function(item,index){//foreach遍历
			var oldAngle = item.angle(); //先获得每个圆弧原来的角度
			item.angle(0);  //然后把角度设为0
			item.to({
				angle:oldAngle,  //从0旋转到原来的角度
				duration:1
			})
		})
	}
}
