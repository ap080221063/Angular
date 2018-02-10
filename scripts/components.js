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
                                            "<input class="+'"form-check-input"'+" type="+'"checkbox"'+" id="+'"makeCheckbox"'+">"+
                                            "<label class="+'"form-check-label"'+" for="+'"makeCheckbox"'+"> Make</label>"+
                                        "</div>"+
                                    "</div>"+
                                    "<div class="+'"input-group-append"'+">"+
                                        "<div class="+'"input-group-text checkboxadjust"'+">"+
                                            "<input class="+'"form-check-input"'+" type="+'"checkbox"'+" id="+'"modelCheckbox"'+">"+
                                            "<label class="+'"form-check-label"'+" for="+'"modelCheckbox"'+"> Model</label>"+
                                        "</div>"+
                                    "</div>"+
                            "</div>"+
                        "</div>" +
                    "</div>" +
                    "<table class="+"table table-dark"+">" +
                        "<thead><tr>" +
                        "<th scope="+"col"+">Make</th>"+
                        "<th scope="+"col"+">Model</th>"+
                        "</tr></thead>"+
                        "<tr ng-repeat='x in datasource track by $index '>"+
                          "<td>{{x.make}}</td>"+
                          "<td>{{x.model}}</td>"+
                        "</tr>"+
                    "</table>"+
                  "</div>",
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


                            //  "<div class="+'"input-group-append"'+">"+
                            //      "<form class="+'"form-inline"'+">"+
                            //          "<div class="+'form-check form-check-inline'+">"+
                            //              "<input class="+'"form-check-input"'+" type="+'"checkbox"'+" id="+'"makeCheckbox"'+">"+
                            //              "<label class="+'"form-check-label checkboxadjust"'+" for="+'"makeCheckbox"'+"> Make</label>"+
                            //              "<input class="+'"form-check-input"'+" type="+'"checkbox"'+" id="+'"modelCheckbox"'+">"+
                            //              "<label class="+'"form-check-label checkboxadjust"'+" for="+'"modelCheckbox"'+"> Model</label>"+
                            //          "</div>"+
                            //      "</form>"+
                            //  "</div>"+
