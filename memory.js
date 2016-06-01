var app = angular.module("MemoryGame", []);
app.controller('MemoryGameController', function ($scope, $timeout){

     //Array of all monsters images
     monsters = [
          'monsters-01.png',
          'monsters-02.png',
          'monsters-03.png',
          'monsters-04.png',
          'monsters-05.png',
          'monsters-06.png',
          'monsters-07.png',
          'monsters-08.png',
          'monsters-09.png',
          'monsters-10.png',
          'monsters-11.png',
          'monsters-12.png',
          'monsters-13.png',
          'monsters-14.png',
          'monsters-15.png',
          'monsters-16.png',
     ];

     //tile object
     var Tile = function(url){
          this.imgUrl = url;
          this.visible = false;
          // this.match = false;
     }

     var rows = 2;
     var cols = 4;
     var clickedTiles = [];
     $scope.tiles = [];


     $scope.flipTile = function(myTile){
          // debugger
          myTile.visible = true;
          clickedTiles.push(myTile);

          //array of the last two tiles that were clicked
          if(clickedTiles.length === 2){
               //debugger
               if(isThereAMatch(clickedTiles)){
                    clickedTiles[0].visible = true;
                    clickedTiles[1].visible = true;
                    clickedTiles = [];
               }else{
                    //debugger
                    $timeout(function () {
                         clickedTiles[0].visible = false;
                         clickedTiles[1].visible = false;
                         clickedTiles = [];
                    }, 1000);
               }
          }
     }

     //function to check if tiles match
     function isThereAMatch(clickedArr){
          if(clickedArr[0].imgUrl === clickedArr[1].imgUrl){
               return true;
          }else{
               return false;
          }
     }


     $scope.buildGrid = function(rows,cols){
          //loop that creates a new Tile object and  pushes that object to the tiles array
          for (var i = 0; i < cols * rows / 2; i++){
               $scope.tiles.push(new Tile(monsters[i]));
               $scope.tiles.push(new Tile(monsters[i]));
               //debugger;
          }

          //shuffle the tiles array
          $scope.shuffledTile = shuffle($scope.tiles);
     }

     function shuffle(monsterArr){
          //makes a copy of the tiles array, so that the original array is not changed
          var shuffledTiles = [];

          while(monsterArr.length > 0){
               var idx = Math.floor(Math.random() * monsterArr.length);
               shuffledTiles.push(monsterArr[idx]);
               monsterArr.splice(idx,1);
          }
          return shuffledTiles;
     }
});
