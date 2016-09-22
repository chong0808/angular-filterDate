(function () {
	// body...

var  app = angular.module('app',[])
.controller('filterDate',function($scope){
		$scope.time = new Date();
		$scope.time1 = '2016-8-8 17:04:05';
		$scope.time2 = '2015-8-8 17:04:05';
		$scope.time3 = '2013-1-8 17:04:05';
		console.log($scope.time);
	})

.filter('outoDate',function(){
	function _moment(val){
		var time;
		val ? time = new Date(val) : time = new Date();
		var y = time.getFullYear(), m = time.getMonth()+1,d = time.getDate() , hh = time.getHours(),mm = time.getMinutes(),ss = time.getSeconds();
			String(hh).length>1?hh = hh: hh = '0' + hh;
			String(mm).length>1?mm = mm: mm = '0' + mm;
			String(ss).length>1?ss = ss: ss = '0' + ss;
		return{
			'YY-MM-DD':  y+'-'+m+'-'+d,
			'MM-DD':  m+'-'+d,
			'YY/MM/DD':  y+'/'+m+'/'+d,
			'MM/DD': m+'/'+d,
			'YY/MM/DD-H-M-S':  y+'/'+m+'/'+d+'  '+hh+':'+mm+':'+ss,
			'MM/DD-H-M-S':  m+'/'+d+'  '+hh+':'+mm+':'+ss,
			'H-M-S':hh+':'+mm+':'+ss,
			Y:y,
			M:m,
			D:d,
			HH:hh,
			MM:mm,
			SS:ss
		}
	};
	//格式化日期
	function date(dateString,module) {
	  	var date1=new Date(dateString); //开始时间
	  	var date2=new Date();    //结束时间
	  	var date3=date2.getTime()-date1.getTime();  //时间差的毫秒数
	  	//计算出相差天数
	  	var days=Math.floor(date3/(24*3600*1000));
	  	//计算出小时数
	  	var leave1=date3%(24*3600*1000)    //计算天数后剩余的毫秒数
	  	var hours=Math.floor(leave1/(3600*1000));
	  	//计算相差分钟数
	  	var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
	  	var minutes=Math.floor(leave2/(60*1000));
	  	//计算相差秒数
	  	var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
	  	var seconds=Math.round(leave3/1000);
	  	if(module =='countDay'){
			    if( days == 0){
			       	 return _moment(dateString)['H-M-S'];
			    }
			    if(0<days && days<3){
			      var text = days+'天前';
			        return text;
			    }
			    if(2<days && days<365){
			      var text = (Number(date1.getMonth())+1)+'月'+date1.getDate()+'日';
			        return text;
			    }
			    if(days>365){
			      var a = Math.floor(days/365);
			      var text = a +"年前";
			        return text;
			    }
	  	}else if(module=='detail'){
			    if( days == 0){
			       	return  _moment(dateString)['H-M-S'];
			    }else if(days>365){
			      return _moment(dateString)['YY/MM/DD'];
			    }else{
			      return _moment(dateString)['MM/DD'];
			    }
	  	}else if( ! module ){
			  	if( days == 0){
			       	 return _moment(dateString)['H-M-S'];
			    }else if(days>365){
			      return _moment(dateString)['YY/MM/DD-H-M-S'];
			    }else{
			      	return _moment(dateString)['MM/DD-H-M-S'];
			    }
	  	}
	};
	return function(item,index){
		return date(item,index);
	}
	})
})()