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
});
