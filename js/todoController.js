(function(angular){
	var app1 = angular.module("todoApp.todoCtrl",[]);
	app1.controller('TodoController',['$scope','$location', 'todoSrv', function($scope,$location,todoSrv){
		$scope.todoList = todoSrv.getData();
		// 2.添加数据
		// 利用form表单中点击enter键会触发ng-submit提交事件
		$scope.newTask = '';
		var id;
		$scope.add = function(){
			//当输入的添加任务内容不为空才提交
			//这个判断不是操作数据，不放到服务中去
			if(!$scope.newTask){
				return false;
			};
			todoSrv.add($scope.newTask);
			$scope.newTask = '';

		}

		// 3.删除数据
		$scope.remove = function(id){
			todoSrv.remove(id);
		};
		// 4.双击修改数据
		$scope.updateId =-1;
		$scope.update = function(id){
			$scope.updateId = id;
		};
		$scope.save = function(id){
			$scope.updateId = -1;
			todoSrv.saveData();//调用服务的保存数据到缓存的方法

		};

		// 4.点击每项任务切换完成状态
		// 注意todoList是对象，需要第三个参数，true
		$scope.$watch("todoList",function(newValue, oldValue){
			if(newValue === oldValue) return;
			todoSrv.saveData();
		},true)

		// 5.切换任务绑定状态
		$scope.$watch('isCheckedAll',function(newValue, oldValue){
			if(newValue === oldValue)return ;
			todoSrv.checkedAll(newValue);
		});

		// 6.清除完成的任务
		$scope.clearCompleted = function(){
			// 用一个数组存储未完成的任务
			var temp = [];
			for(var i = 0; i< $scope.todoList.length; i++){
				var todo = $scope.todoList[i];
				if(!todo.isCompleted){
					temp.push(todo);
				}
			};
			$scope.todoList.length = 0;//清空数组
			[].push.apply($scope.todoList,temp);
		};
		// 6.1控制清除任务按钮的显示和隐藏
		$scope.isShow = function(){
			for(var i = 0; i< $scope.todoList.length; i++){
				var todo = $scope.todoList[i];
				if(todo.isCompleted){
					return true;
				}
			}
			return false;
		}
		 // 6.2计数没有完成的任务项的个数
		$scope.getCount = function(){
		 	var count = 0;
		 	$scope.todoList.forEach(function(value,index){
		 		if(!value.isCompleted){
		 			count++;
		 		};
		 	});
		 	return count;
		}
		
		// 7.任务完成与否分类
		$scope.status = {};
		// $scope.checkAll = function(){
		// 	$scope.status = {};
		// };
		// $scope.checkCompleted = function(){
		// 	$scope.status = {isCompleted: true};
		// };

		// $scope.checkActive = function(){
		// 	$scope.status = {isCompleted: false};
		// };

		// 8.点击分类按钮实现锚点跳转
		$scope.location = $location;//$watch只能监视$scope的属性
		$scope.$watch("location.url()",function(newValue,oldValue){
			console.log(newValue);
			switch(newValue){
				case "/":
					$scope.status = {};
					break;
				case "/active":
					$scope.status = {isCompleted: false};
					break;
				case "/completed":
					$scope.status = {isCompleted: true};
					break;
				defalut 
					$scope.status = {};
					break;

			}
		})
	}]);
}(angular))