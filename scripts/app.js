angular.module('App', []).controller('Ctrl', function($scope) {
    $scope.numbRows = [1,2,3,4,5];
    $scope.buttonArray = [
                          {row:1, char: '-' ,optionalClass:''},
                          {row:1, char: '-' ,optionalClass:''},		
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
    $scope.panelNumber = 0;
    $scope.memoryNumber = '';
    $scope.memoryOperator = '';
	$scope.equalOperatorApplied = false;
	
    $scope.writeToPanel = function(invar){
        if(isNaN(invar)){//its an operator
            console.log(invar);
            if(invar == '='){
                if($scope.memoryOperator!=''){
                    $scope.memoryNumber = isNaN($scope.memoryNumber)?0:$scope.memoryNumber;
					$scope.equalOperatorApplied = true;
                    switch($scope.memoryOperator){
                        case '+':
                            var aux = $scope.panelNumber;
                            $scope.panelNumber = Number($scope.memoryNumber) + Number(aux);
                            $scope.memoryNumber = '';
                            break;
                        case '-':
                            var aux = $scope.panelNumber;
                            $scope.panelNumber = Number($scope.memoryNumber) - Number(aux);
                            $scope.memoryNumber = '';
                            break;
                        case '*':
                            var aux = $scope.panelNumber;
                            $scope.panelNumber = Number($scope.memoryNumber) * Number(aux);
                            $scope.memoryNumber = '';
                            break;
                        case '/':
                            var aux = $scope.panelNumber;
                            $scope.panelNumber = Number($scope.memoryNumber) / Number(aux);
                            $scope.memoryNumber = '';
                            break;
                    }

                    $scope.memoryOperator = '';
                }else{
                    $scope.memoryOperator = invar;
                }
            }else{
                $scope.memoryOperator = invar;
            }
        }else{//its a number
            console.log(invar);
				if($scope.equalOperatorApplied){
					$scope.equalOperatorApplied=false;
					$scope.memoryNumber = $scope.panelNumber;
					$scope.panelNumber = invar;
				}else{			
					if($scope.panelNumber.length = 1 && $scope.panelNumber == "0"){
						$scope.panelNumber = invar;
					}else{
						if($scope.memoryOperator != ''){
							if(isNaN($scope.memoryNumber) || $scope.memoryNumber == ''){
								$scope.memoryNumber = $scope.panelNumber;
								$scope.panelNumber = invar;
							}else{
								$scope.panelNumber = $scope.panelNumber + '' + invar;
							}
						}else{
							$scope.panelNumber = $scope.panelNumber + '' + invar;
						}
					}
				}
        }
    }
});

/*
            if($scope.operator!=''){
                switch($scope.operator){
                    case '+':
                        var aux = $scope.panelNumber;
                        $scope.panelNumber = Number(aux) + Number(invar);
                        break;
                    case '-':
                        var aux = $scope.panelNumber;
                        $scope.panelNumber = Number(aux) - Number(invar);
                        break;
                    case '*':
                        var aux = $scope.panelNumber;
                        $scope.panelNumber = Number(aux) * Number(invar);
                        break;
                    case '/':
                        var aux = $scope.panelNumber;
                        $scope.panelNumber = Number(aux) / Number(invar);
                        break;
                }
                $scope.operator = '';
            }
*/
