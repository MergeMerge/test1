(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	// 1.初始化数据
	// 创建模板
	var app = angular.module('todoApp',[]);
	// 创建控制器
	app.controller('TodoController',['$scope',function($scope){
		$scope.todoList = [
			{id:0,name:'吃饭',isCompleted:false},
			{id:1,name:'睡觉',isCompleted:true},
			{id:2,name:'学习',isCompleted:false},
			{id:3,name:'打豆豆',isCompleted:false}
		]
		// 2.添加数据
		// 利用form表单中点击enter键会触发ng-submit提交事件
		$scope.newTask = '';
		var id;
		$scope.add = function(){
			//当输入的添加任务内容不为空才提交
			if(!$scope.newTask){
				return false;
			};
			if($scope.todoList.length === 0){
				id = 0;
			}else{
				id = $scope.todoList[$scope.todoList.length-1].id+1;
			}
			$scope.todoList.push({id:id,name:$scope.newTask,isCompleted:false});
			$scope.newTask = '';}
			

		// 3.删除数据
		$scope.remove = function(id){
			console.log($scope.todoList);
			console.log(id);
			for(var i = 0;i < $scope.todoList.length; i++){
				if(id === $scope.todoList[i].id){
					$scope.todoList.splice(i,1);
					break;
				}
			}
		};
		// 4.双击修改数据
		 // var updateId = -1;
		 $scope.updateId =-1;
		$scope.update = function(id){
			console.log(11111)
			$scope.updateId = id;
			console.log($scope.updateId)
		};
		$scope.save = function(id){
			$scope.updateId = -1;
		};
		// 5.切换任务绑定状态
		// $scope.isCheckedAll = false;
		$scope.$watch('isCheckedAll',function(newValue, oldValue){
			if(newValue === oldValue)return ;
			for(var i = 0; i < $scope.todoList.length; i++){
				$scope.todoList[i].isCompleted = newValue;
			}
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
					console.log(111);
					return true;
				}
			}
			return false;
		}
		 

	
	}])

})(angular);
