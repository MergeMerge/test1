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
		// 2.添加一条数据：利用form表单中点击enter键会触发ng-submit提交事件
		$scope.newTask = '';
		var id;
		$scope.add = function(){
			console.log($scope.todoList)
			//当输入的添加任务内容不为空才提交
			if($scope.newTask){
				if($scope.todoList.length === 0){
					id = 0;
				}else{
					id = $scope.todoList[$scope.todoList.length-1].id+1;
				}
				$scope.todoList.push({id:id,name:$scope.newTask,isCompleted:false});
				$scope.newTask = '';
			}
			
	}
	
	}])

})(angular);
