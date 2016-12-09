(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	// 1.创建模板
	var app = angular.module('todoApp',[]);
	// 2.创建控制器
	app.controller('TodoController',['$scope',function($scope){
		$scope.todoList = [
			{id:0,name:'吃饭',isCompleted:false},
			{id:0,name:'睡觉',isCompleted:true},
			{id:0,name:'学习',isCompleted:false},
			{id:0,name:'打豆豆',isCompleted:false}
		]
	}])
})(angular);
