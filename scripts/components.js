angular.module("components", [])
  .component("ngtable",{
      template:   "<div class="+'"container-fluid toppadding"'+">"+
                    "<div class="+'"row rowpadding"'+">"+
                        "<div class="+'"col-xs-6"'+">"+
                            "<div class="+'"input-group mb-3"'+">"+
                                "<div class="+'"input-group-prepend"'+">"+
                                    "<span class="+'"input-group-text"'+">search</span>"+
                                    "</div>"+
                                    "<input type="+'"text"'+" class="+'"form-control"'+" id="+'"lookup"'+" aria-describedby="+'"basic-addon1"'+" placeholder="+'"type here.."'+" ng-model="+"fetchValue"+" ng-change="+"gofetch()"+" />" +
                                    "<div class="+'"input-group-append"'+">"+
                                        "<div class="+'"input-group-text checkboxadjust"'+">"+
                                            "<input class="+'"form-check-input"'+" type="+'"checkbox"'+" id="+'"makeCheckbox"'+" ng-checked="+"make"+" ng-click="+"toggle('make')"+">"+
                                            "<label class="+'"form-check-label"'+" for="+'"makeCheckbox"'+"> Make</label>"+
                                        "</div>"+
                                    "</div>"+
                                    "<div class="+'"input-group-append"'+">"+
                                        "<div class="+'"input-group-text checkboxadjust"'+">"+
                                            "<input class="+'"form-check-input"'+" type="+'"checkbox"'+" id="+'"modelCheckbox"'+" ng-checked="+"model"+" ng-click="+"toggle('model')"+">"+
                                            "<label class="+'"form-check-label"'+" for="+'"modelCheckbox"'+"> Model</label>"+
                                        "</div>"+
                                    "</div>"+
                            "</div>"+
                        "</div>" +
                    "</div>" +
                    "<span class="+'"badge badge-dark mb-3"'+">Search results: <span class="+'"badge badge-pill badge-success biggerFontSize"'+">{{totalSearchResults}}</span></span>" +
                    "<table class="+"table table-dark"+">" +
                        "<thead><tr>" +
                        "<th scope="+"col"+">Make <i class="+'"fa fa-chevron-up   fa-1"'+" aria-hidden="+'"true"'+" ng-show="+'"evalSort(mak,asc)"'+"></i> "+
                                                 "<i class="+'"fa fa-chevron-down fa-1"'+" aria-hidden="+'"true"'+" ng-show="+'"evalSort(mak,desc)"'+"></i>"+
                        "</th>"+
                        "<th scope="+"col"+">Model <i class="+'"fa fa-chevron-up   fa-1"'+" aria-hidden="+'"true"'+" ng-show="+'"evalSort(mod,asc)"'+"></i>"+
                                                  "<i class="+'"fa fa-chevron-down fa-1"'+" aria-hidden="+'"true"'+" ng-show="+'"evalSort(mod,desc)"'+"></i>"+
                        "</th>"+
                        "</tr></thead>"+
                        "<tr ng-repeat='x in datasource track by $index '>"+
                          "<td>{{x.make}}</td>"+
                          "<td>{{x.model}}</td>"+
                        "</tr>"+
                    "</table>"+
                  "</div>",
      controller : function($scope,ngservice){
            $scope.datasource         = ngservice.getData();
            $scope.make               = true;
            $scope.model              = true;
            $scope.fetchValue         = "";
            $scope.totalSearchResults = $scope.datasource.length;
            $scope.datasourceSortWay  = "asc";
            $scope.datasourceSortBy   = "make";

            $scope.toggle = function(input){
               if(input=='make'){
                   $scope.make = !$scope.make;
               }else{
                   $scope.model = !$scope.model;
               }
            };

            $scope.gofetch = function(){
               $scope.datasource = ngservice.setFilter(ngservice.getData(), $scope.fetchValue, {"make":$scope.make, "model":$scope.model});
               $scope.totalSearchResults = $scope.datasource.length;
            };

            $scope.setSort = function(prop, way){
               $scope.datasourceSortWay  = way;
               $scope.datasourceSortBy   = prop == "mak"?"make":"model";
               $scope.datasource = ngservice.setSort($scope.datasource, $scope.datasourceSortBy, $scope.datasourceSortWay);
            };

            $scope.evalSort = function(prop, way){
                return ($scope.datasourceSortBy == (prop == "mak"?"make":"model") && $scope.datasourceSortWay == way);
            }

        },
  })

  .service('ngservice', function() {
    this.data = mock_data;

    this.getData = function(){
        return this.data;
    };

    this.setFilter = function(ds,f,options) {
        if(f.length == 0){
            return ds;
        }else{
            var fx = JSON.parse('{"make":"'+f+'", "model":"'+f+'"}');
            return _.filter(ds, function(input){
                                    if(options.make == false && options.model == true){
                                       return input.model.indexOf(fx.model) !== -1;
                                    }else if(options.make == true && options.model == false){
                                       return input.make.indexOf(fx.make) !== -1;
                                    }else{
                                        if(f.indexOf(" ") !== -1){
                                            return (input.make + " " + input.model).indexOf(f) !== -1;
                                        }else{
                                            return input.model.indexOf(fx.model) !== -1 || input.make.indexOf(fx.make) !== -1;
                                        }
                                    }
                                }
                           );
        }
    };

    this.setSort = function(ds,prop,way) {
        if(way=="desc"){
            return (_.sortBy(ds, function(o) { return o.prop; })).reverse();
        }else{
            return _.sortBy(ds, function(o) { return o.prop; });
        }
    };

});
