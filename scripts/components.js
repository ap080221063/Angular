angular.module("myApp", [])
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
      controller : function(){
        this.datasource =  [
                            { "make":"Ford", "model": "Mustang"  },
                            { "make":"BMW",  "model": "320"  },
                            { "make":"Fiat", "model": "Stilo"  },
                            { "make":"Ferrari", "model": "Modena" }
                           ];
        },
  });
