app.controller('chart-ctrl', function ($scope, $http, $window, $location, $interval, config) {

  $scope.baseurl = config.baseurl;


  const urlParams = new URLSearchParams($window.location.search);
  const stock = urlParams.get('stock');
  console.log(stock);
  var stockdata = stock.toUpperCase();


  $scope.myportfolioId = urlParams.get('myportfolioId');
  console.log( $scope.modelportfolioId );


  console.log(stockdata);
  $scope.charturl = $scope.baseurl + "backtesting/supertrendchart?name=" + stockdata;
  $scope.buysellsignalsurl = $scope.baseurl + "backtesting/buysellsignals?name=" + stockdata;
  $scope.profitlosssurl = $scope.baseurl + "backtesting/profitloss?name=" + stockdata;
  $scope.signalsurl = $scope.baseurl + "/sendstocksignal?name=" + stockdata;

  console.log($scope.charturl);
  console.log($scope.profitlosssurl);
  console.log($scope.signalsurl);

  $scope.logout = function (req, res) {
    localStorage.clear();
    location.href = "index.html";
  };

  $scope.init = function (req, res) {
    console.log("brokerCtrl");
    console.log(config.baseurl);
    var islogin = localStorage.getItem("islogin");

    if (islogin != "1") {
      location.href = "index.html";
    } else {
      $scope.customerId = localStorage.getItem("customerId");
      if( $scope.customerId == 1){
          $("#menu").load("menu-admin.html"); 
      }else{
          $("#menu").load("menu-demo.html"); 
      }

      // $("#menu").load("menu.html"); 
      $("#general").addClass("active"); 
      $("#modelcategory").addClass("active"); 



      $scope.name = localStorage.getItem("name");
      $scope.isdebug = 1 ;
      $scope.profitlossdata();
      $scope.getsignalsdata();

    }

  }

  $scope.backtest = function (myportfolioId) {

      
    $scope.startbacktest = $scope.baseurl + "backtesting/webbacktest" ;
    $scope.data = {}
    $scope.data.myportfolioId = myportfolioId

    $http.post($scope.startbacktest ,$scope.data)
      .success(function (response, status) {
          console.log(response)
          // $("#success").modal("show");
      })
      .error(function (erroresponse, status) {
        console.log(erroresponse)
        return NaN ;
      }); 
   

  };

  
  $scope.profitlossdata = function () {
    
    $http.get($scope.profitlosssurl)
      .success(function (response) {
        if (response.status == 'error') { } else {
          $scope.dataset2 = response.data;
          $scope.labelsx = response.data.map(function (e) { return e.id; });
          $scope.datax1 = response.data.map(function (e) { return e.profit_loss; });
          $scope.graphdatax = [$scope.datax1];
          $scope.stats = response.stats ;
          console.log($scope.stats)
        }
      }).error(function () { });
  }

  $scope.getsignalsdata = function(){
    var data = {}
    var urlconfig = {
        headers: {
          "Content-Type": "application/json;"
        },
      };
      
     
      console.log( $scope.signalsurl)
      $http
        .get( $scope.signalsurl , data, urlconfig)
        .success(function (response, status, headers, config) {
          $scope.signaldata = response.signaldata ;
        
        })
        .error(function (data, status, header, config) {
          console.log("error in getting the data");
        });

  }


  Highcharts.getJSON($scope.charturl, function (response) {

    // split the data set into ohlc and volume
    var ohlc = [],
        volume = [],
        buydata = [],
        buyclosedata = [],
        selldata = [],
        sellclosedata = [],
        ema1data = [],
        ema1dataset =[]
        ema2data = [],
        ema2dataset =[],
        c2data = [],
        c2dataset =[]

        data = response.data,
        ema2dataset = response.data,
        buydataset = response.buydataset,
        buyclosedataset = response.buyclosedataset,
        selldataset = response.selldataset,
        sellclosedataset = response.sellclosedataset,


        dataLength = response.data.length,
        // set the allowed units for data grouping
        groupingUnits = [[
            'minute',                         // unit name
            [1]                             // allowed multiples
        ], [
            'month',
            [1, 2, 3, 4, 6]
        ]],
        

        i = 0; a = 0; b = 0; c = 0; d = 0;e = 0;

    for (a; a < buydataset.length; a += 1) {
    
      buydata.push([ 
        buydataset[a][0], // the date
        buydataset[a][1] // the buy
      ]);
    }

    for (b; b < buyclosedataset.length; b += 1) {
      
      buyclosedata.push([ 
        buyclosedataset[b][0], // the date
        buyclosedataset[b][1] // the buy
      ]);
    }
    for (c; c < selldataset.length; c += 1) {
     
      selldata.push([ 
        selldataset[c][0], // the date
        selldataset[c][1] // the buy
      ]);
    }
    for (d; d < sellclosedataset.length; d += 1) {
      sellclosedata.push([ 
        sellclosedataset[d][0], // the date
        sellclosedataset[d][1] // the buy
      ]);
    }

    console.log(ema2dataset.length);

    // for (e; e < ema2dataset.length ; e += 1) {
    //   ema2data.push([ 
        
    //     ema2dataset[i][0], // the date
    //     ema2dataset[i][5]  // the ema1
    //   ]);
    //   // console.log(ema2dataset[e][0])
    //   // console.log(ema2dataset[e][5])
    // }
   
    for (i; i < dataLength; i += 1) {
        ohlc.push([
            data[i][0], // the date
            data[i][7], // open
            data[i][8], // high
            data[i][9], // low
            data[i][10] // close
        ]);
       
        volume.push([
            data[i][0], // the date
            data[i][8] // the volume
        ]);
        ema1data.push([
          data[i][0], // the date
          data[i][5] // the volume
        ]);
        ema2data.push([
          data[i][0], // the date
          data[i][6] // the volume
        ]);
        c2data.push([
          data[i][0], // the date
          data[i][7] // the volume
        ]);
    }

    console.log(ema1data)
    console.log(ohlc)
    // create the chart
    Highcharts.stockChart('container', {

        rangeSelector: {
            selected: 1
        },

        title: {
            text: stockdata
        },

        yAxis: [{
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'OHLC'
            },
            height: '70%',
            lineWidth: 2,
            resize: {
                enabled: true
            }
        }, {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Volume'
            },
            top: '65%',
            height: '35%',
            offset: 0,
            lineWidth: 2
        }],

        tooltip: {
            split: true
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          x: 120,
          verticalAlign: 'top',
          y: 80,
          floating: true
       },
         rangeSelector: {
             selected: 5,
             buttons: [{
                 type: 'minute',
                 count: 60,
                 text: '1h'
             }, {
                 type: 'minute',
                 count: 720,
                 text: '12h'
             }, {
                 type: 'day',
                 count: 1,
                 text: '1d'
             }, {
                 type: 'day',
                 count: 7,
                 text: '1w'
             }, {
                 type: 'month',
                 count: 1,
                 text: '1m'
             }, {            
                 type: 'all',
                 text: 'All'
             }]
         },

        series: [
        {
            type: 'candlestick',
            name: stockdata,
            data: ohlc,
            dataGrouping: {
                units: groupingUnits
            }
        }, 
        {
          type: 'line',
          name: 'ema1',
          color: '#0066FF',
          data: ema2data,
          tooltip: {
                valueDecimals: 2
          }
      }, 
        {
          type: 'line',
          name: 'ema2',
          color: '#FF0000',
          data: c2data,
          tooltip: {
                valueDecimals: 2
          }
      }, 
        {
          type: 'scatter',
          name: 'buy',
          data: buydata,
          color: "#00FF00",
          marker: {
            radius: 3,
            symbol: 'circle',
            fillcolor: "#00FF00",
            states: {
                hover: {
                    enabled: true,
                }
            }
          },
          dataGrouping: {
            units: groupingUnits
           }
        },
        {
          type: 'scatter',
          name: 'buyclose',
          data: buyclosedata,
          color: "#00008B",
          marker: {
            radius: 3,
            symbol: 'circle',
            fillcolor: "#00008B",
            states: {
                hover: {
                    enabled: true,
                }
            }
          },
          dataGrouping: {
            units: groupingUnits
           }
        },
        {
          type: 'scatter',
          name: 'sell',
          data: selldata,
          color: "#FF0000",
          marker: {
            radius: 3,
            symbol: 'circle',
            fillcolor: "#FF0000",
            states: {
                hover: {
                    enabled: true,
                }
            }
          },
          dataGrouping: {
            units: groupingUnits
           }
        },
        {
          type: 'scatter',
          name: 'sellclose',
          data: sellclosedata,
          color: "#653508",
          marker: {
            radius: 3,
            symbol: 'circle',
            fillcolor: "#653508",
            states: {
                hover: {
                    enabled: true,
                }
            }
          },
          dataGrouping: {
            units: groupingUnits
           }
        },
        {
            type: 'column',
            name: 'Volume',
            data: volume,
            yAxis: 1,
            dataGrouping: {
                units: groupingUnits
            }
        }
      ]
    });
  }); 
     
  
      



});