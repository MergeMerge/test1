(function(angular){
	// 服务器放在模块中
	angular.module("todoApp.todoSrv",[])
		.service("todoSrv",['$window',function($window){

			var storage = $window.localStorage;
			var todoList = JSON.parse(storage.getItem("todo") || []);

			// 1.获取缓存中的数据
			this.getData = function(){
				return todoList;
			};
			// 1.1保存数据
			this.saveData = function(){
				storage.setItem("todo",JSON.stringify(todoList))
			}

			// 2.添加数据
			this.add = function(newTask){
				if(todoList.length === 0){
				id = 0;
				}else{
				id = todoList[todoList.length-1].id+1;
				
				}
				todoList.push({id:id,name:newTask,isCompleted:false});
				this.saveData();//保存数据
				
			};

			// 3.删除数据
			this.remove = function(id){
				for(var i = 0;i < todoList.length; i++){
				if(id === todoList[i].id){
					todoList.splice(i,1);
					this.saveData();//保存数据
					break;
				}
			}
			};
			// 4.点击切换每一项任务的完成状态（通过双向绑定数据实现）;无法给一个任务添加点击事件
			// 换个思路：只要todoList数据有变化就保存
			//5.全部切换绑定状态
			this.checkedAll = function(newValue){
				for(var i = 0; i < todoList.length; i++){
					todoList[i].isCompleted = newValue;
				};
				this.saveData();
			}
		}]);

}(angular))