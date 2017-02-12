angular.module('App', []).controller('Ctrl', function($scope) {
    $scope.numbRows = [1,2,3,4];
    $scope.buttonArray = [
                          {row:1, char: 7  },
                          {row:1, char: 8  },
                          {row:1, char: 9  },
                          {row:1, char: '*'},
                          {row:2, char: 4  },
                          {row:2, char: 5  },
                          {row:2, char: 6  },
                          {row:2, char: '-'},
                          {row:3, char: 1  },
                          {row:3, char: 2  },
                          {row:3, char: 3  },
                          {row:3, char: '+'},
                          {row:4, char: '.'},
                          {row:4, char: 0  },
                          {row:4, char: '/'},
                          {row:4, char: '='}
    ];
    $scope.panelNumber = 0;
    $scope.memoryNumber = '';

    $scope.memoryOperator = '';

    $scope.writeToPanel = function(invar){
        if(isNaN(invar)){ //operator
            console.log(invar);
            if(invar == '='){
                if($scope.memoryOperator!=''){
                    $scope.memoryNumber = isNaN($scope.memoryNumber)?0:$scope.memoryNumber;
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
            //$scope.memoryOperator = invar;
        }else{ //number
            console.log(invar);

                if($scope.panelNumber.length = 1 && $scope.panelNumber == "0"){
                    $scope.panelNumber = invar;
                }else{
                    if($scope.memoryOperator != ''){
                        if(isNaN($scope.memoryNumber)){
                            $scope.panelNumber = $scope.panelNumber + '' + invar;
                        }else{
                            $scope.memoryNumber = $scope.panelNumber;
                            $scope.panelNumber = invar;
                        }
                    }else{
                        $scope.panelNumber = $scope.panelNumber + '' + invar;
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
