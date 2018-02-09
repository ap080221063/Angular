angular.module("components", [])


  .component("ngtable",{
      template:
                  "<form>" +
                  "<div class="+'form-group'+">" +
                  "<label for="+'lookup'+">search..</label>" +
                  "<input type="+'"text"'+" class="+'"form-control"'+" id="+'"lookup"'+" aria-describedby="+'"lookupHelp"'+" placeholder="+'"search"'+" ng-model="+"fetchValue"+" ng-change="+"gofetch()"+" />" +
                  "</div>" +
                  "</form>" +
                  "<table class="+"table table-dark"+">" +
                  "<thead><tr>" +
                  "<th scope="+"col"+">Make</th>"+
                  "<th scope="+"col"+">Model</th>"+
                  "</tr></thead>"+
                  "<tr ng-repeat='x in datasource track by $index '>"+
                    "<td>{{x.make}}</td>"+
                    "<td>{{x.model}}</td>"+
                  "</tr>"+
                "</table>",
      controller : function($scope,ngservice){
            $scope.datasource = ngservice.getData();
            $scope.gofetch = function(){
                                $scope.datasource = ngservice.setFilter(ngservice.getData(),$scope.fetchValue);
                             };
            $scope.fetchValue = "";
        },
  })

  .service('ngservice', function() {

    this.data = [
                 { "make":"Ford"   ,  "model": "Mustang"  },
                 { "make":"BMW"    ,  "model": "320"      },
                 { "make":"Fiat"   ,  "model": "Stilo"    },
                 { "make":"Ferrari",  "model": "Modena"   },
                 { "make":"Seat"   ,  "model": "Ibiza"    },
                ];

    this.getData = function(){
        return this.data;
    };

    this.setFilter = function(ds,f) {
        if(f.length == 0){
            return ds;
        }else{
            var fx = JSON.parse('{"make":"'+f+'"}');
            return _.filter(ds, function(input){
                                      return input.make.indexOf(fx.make) !== -1;
                                }
                           );
        }
    };

});
