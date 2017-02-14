## 继承

### 原型继承

	// 父类
	function SuperType() {
		this.specialty = 'handsome';
	}
	
	// 父类原型上绑定方法
	SuperType.prototype.say= function() {
		console.log('My specialty is handsome');
	}
	
	// 子类
	function SubType() {}
	
	//设置子类的原型对象为 父类的 实例
	SubType.prototype = new SuperType();
	
	// 实例对象
	var instance = new SubType();
	
	instance.say();// My specialty is handsome

### 混入继承

	var o = {
		specialty: 'handsome',
		say: function(){
			console.log('My specialty is handsome');
		}
	};
	
	function SubType(){
		this.name = 'zxx';
		this.age = '18';
		this.gender = 'male';
	}
	
	// 实例对象
	var instance = new SubType();
	
	// 给实例对象提供一个混入其他对象属性的方法
	instance.__mix__ = function(o){
		for(var k in o){
			this[k] = o[k];
		}
	};
	
	// 调用混入方法后 该实例对象就有了 对象 o 的属性和方法
	instance.__mix__(o);
	
	instance.say(); // My specialty is handsome


### 混合继承

	// 父类
	function SuperType() {};
	
	// 父类原型上绑定混入任意个对象的方法
	SuperType.prototype.extend = function(){
	
		// 循环遍历实参列表
		for(var i = 0;i < arguments.length;i++){
			// 遍历每一个实参对象
			for(var k in arguments[i]){
				// 利用对象的动态特性 混入
				this[k] = arguments[i][k];
			}
		}
	}
	
	// 给父类原型对象混入其他对象的方法,所有继承该父类原型对象的对象都会拥有这些方法
	SuperType.prototype.extend({
		specialty: 'handsome',
		say: function(){
			console.log('My specialty is handsome');
		}
	},{
		fight: function(){
			console.log('I can a man battles the ten people!');
		}
	})
	
	// 子类
	function SubType(name,age,gender) {
		this.name = name;
		this.age = age;
		this.gender = gender;
	}
	
	//设置子类的原型对象为 父类的 实例(原型继承)
	SubType.prototype = new SuperType();
	
	// 实例对象
	var instance = new SubType('zxx',18,'male');
	instance.say(); // My specialty is handsome
	instance.fight(); // I can a man battles the ten people!


### Object.create()

	var o = {
		specialty: 'handsome',
		say: function(){
			console.log('My specialty is handsome');
		}
	};
	
	// 使用Object.create()创建的实例 的原型 即为 参数 o
	var instance = Object.create(o);
	instance.say(); // My specialty is handsome
	
	// 兼容写法
	function createWithObject ( obj ) {
	// 先判断系统是否支持原生的方法,如果支持则使用原生方法
	if ( Object.create ) {
	    return Object.create( obj );
	} else {
	    function F() {}
	    F.prototype = obj;
	    return new F();
	}
	}	 


### 构造器继承

	// 父类
	function SuperType(){
		this.specialty = 'handsome';
		this.say = function(){
			console.log('My specialty is handsome');
		}
	}
	
	// 子类
	function SubType(name){
		SuperType.call(this,name);
	}
	
	// 实例对象
	var instance = new SubType('zxx');
	instance.say(); // My specialty is handsome



