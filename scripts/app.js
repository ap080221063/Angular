angular.module('App', []).controller('Ctrl', function($scope) {
    $scope.numbRows = [1,2,3,4,5];
    $scope.buttonArray = [
                          {row:1, char: '-' ,optionalClass:'hide'},
                          {row:1, char: '-' ,optionalClass:'hide'},		
						  {row:1, char: 'CE',optionalClass:'btn-primary cellSmallerFontSize'},
                          {row:1, char: 'C' ,optionalClass:'btn-primary'},                          						  
                          {row:2, char: 7   ,optionalClass:''},
                          {row:2, char: 8   ,optionalClass:''},
                          {row:2, char: 9   ,optionalClass:''},
                          {row:2, char: '*' ,optionalClass:''},
                          {row:3, char: 4   ,optionalClass:''},
                          {row:3, char: 5   ,optionalClass:''},
                          {row:3, char: 6   ,optionalClass:''},
                          {row:3, char: '-' ,optionalClass:''},
                          {row:4, char: 1   ,optionalClass:''},
                          {row:4, char: 2   ,optionalClass:''},
                          {row:4, char: 3   ,optionalClass:''},
                          {row:4, char: '+' ,optionalClass:''},
                          {row:5, char: '.' ,optionalClass:''},
                          {row:5, char: 0   ,optionalClass:''},
                          {row:5, char: '/' ,optionalClass:''},
                          {row:5, char: '=' ,optionalClass:'btn-success'},						  
    ];
	$scope.memory = [0];
	$scope.maxMemory = 10;	
	
	$scope.pushInput = function(invar){
		if($scope.memory.length > $scope.maxMemory){
			$scope.memory.shift();
			$scope.memory.push(invar);
		}else{
			$scope.memory.push(invar);
		}
	}
	
	$scope.get = function(index){
		return $scope.memory[index];
	}
	
	$scope.isNumber = function(invar){
		if(isNaN(invar)){
			if(invar == '.'){
				return true;
			}else{
				return false;
			}
		}else{
			return true;
		}
	}
	
    $scope.pressButton = function(invar){
		//$scope.pushInput(invar);
		if(invar == 'C'){
			$scope.memory = [0];
			return;
		}
		if(invar == 'CE'){
			$scope.memory.pop();
			return;
		}
		
		if($scope.memory.length == 0)
		{
			if(!$scope.isNumber(invar)){
				if(invar!='='){
					$scope.pushInput(0);
					$scope.pushInput(invar);
				}
			}else{
				$scope.pushInput(invar);	
			}			
		}
		else if($scope.memory.length == 1)
		{
			if(!$scope.isNumber(invar)){
				if(!$scope.isNumber($scope.get(0))){ //cannot accumulate 2 operators
					$scope.memory[0] = invar;
				}else{
					if(invar!='='){
						$scope.pushInput(invar);
					}
				}
			}else{
				if($scope.isNumber($scope.get(0)) && ($scope.get(0) == '0' || $scope.get(0) == 0)){ 
				//if previouse is a 0, dont want to concat it
					$scope.memory[0] = invar;
				}else if($scope.isNumber($scope.get(0)) && ($scope.get(0) != '0' || $scope.get(0) != 0)){	
					$scope.memory[0] = $scope.memory[0] + '' + invar;
				}else{
					$scope.pushInput(invar);
				}
			}				
		}
		else if($scope.memory.length == 2)
		{
			if(!$scope.isNumber(invar)){
				if(!$scope.isNumber($scope.get(1))){ //cannot accumulate 2 operators
					$scope.memory[1] = invar;
				}
			}else{
				if($scope.isNumber($scope.get(1))){ //if it is a number
					$scope.memory[1] = $scope.memory[1] + '' + invar;
				}else{
					$scope.pushInput(invar);
				}
			}
		}
		else
		{
					
			if($scope.isNumber($scope.get($scope.memory.length - 1)) && $scope.isNumber(invar)){
				$scope.memory[$scope.memory.length - 1] =  $scope.memory[$scope.memory.length - 1] + '' + invar;
			}else{
				$scope.pushInput(invar);
			}
			
			if($scope.memory.length>=3){
			
				var last         = $scope.get($scope.memory.length - 1);
				var penultimate  = $scope.get($scope.memory.length - 2);
				var penultimate2 = $scope.get($scope.memory.length - 3);
				var penultimate3 = $scope.get($scope.memory.length - 4);
					
				if(!$scope.isNumber(last)){//its an operator
					if(last == '='){
						switch(penultimate2){
							case '+':
								$scope.pushInput(Number(penultimate3) + Number(penultimate));
								break;
							case '-':
								$scope.pushInput(Number(penultimate3) - Number(penultimate));
								break;
							case '*':
								$scope.pushInput(Number(penultimate3) * Number(penultimate));
								break;
							case '/':
								$scope.pushInput(Number(penultimate3) / Number(penultimate));
								break;
						}
					}			
				}
			}
		}
    }

});
