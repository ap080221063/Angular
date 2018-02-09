angular.module("components", [])
    .component("ngtable",{
      template: "<table class="+"table table-dark"+">" +
                  "<thead><tr>" +
                  "<th scope="+"col"+">Make</th>"+
                  "<th scope="+"col"+">Model</th>"+
                  "</tr></thead>"+
                  "<tr ng-repeat='x in $ctrl.datasource track by $index'>"+
                    "<td>{{x.make}}</td>"+
                    "<td>{{x.model}}</td>"+
                  "</tr>"+
                "</table>",
      controller : function($scope,ngservice){
            this.datasource = ngservice.data();
        },
  })
  .component("nglookup",{
      template: "<form>" +
                "<div class="+'form-group'+">" +
                "<label for="+'lookup'+">search..</label>" +
                "<input type="+'"text"'+" class="+'"form-control"'+" id="+'"lookup"'+" aria-describedby="+'"lookupHelp"'+" placeholder="+'"search"'+" ng-model="+"fetchValue"+" ng-change="+"gofetch()"+" />" +
                //"<input type="+'"text"'+" ng-model="+'"fetchValue"'+" readonly/>" +
                "</div>" +
                "</form>",
      controller: function($scope,ngservice){
          $scope.gofetch = function(){
              ngservice.filter(ngservice.data(),$scope.fetchValue);
              //https://stackoverflow.com/questions/23720988/how-to-filter-json-data-in-javascript-or-jquery
              //console.log(ngservice.data());
          };
          $scope.fetchValue = "";
      },

  })
  .service('ngservice', function() {
    this.data = function(){
        return [
                 { "make":"Ford", "model": "Mustang"  },
                 { "make":"BMW",  "model": "320"  },
                 { "make":"Fiat", "model": "Stilo"  },
                 { "make":"Ferrari", "model": "Modena" }
                ]
    };

    this.filter = function(ds,f) {
        var fx = '{"make":"'+f+'"}"';
        return ds.filter(function(obj) {
            return Object.keys(fx).every(function(c) {
                return obj[c] == fx[c];
            });
        });
    };

});
