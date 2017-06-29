angular.module('app').controller('mainCtrl', function ($scope, mainSrv) {

    $scope.userFavorites;
    // $scope.user;

    function getUser() {
        mainSrv.getUser().then(function (user) {
            $scope.userFavorites = user;
            // $scope.userFavorites = user.favorites;
            console.log(user)
            if (user) $scope.user = user.username;
            else $scope.user = 'NOT LOGGED IN';
        })
    }


    getUser();


    $scope.addFavs = (favorite) => {
        var favFound = false
        for (var i = 0; i < $scope.userFavorites.favorites.length; i++) {
            if ($scope.userFavorites.favorites[i].favorite == favorite) {
                favFound = true
                break
            }
        }
        if (!favFound) {
            var favoriteThing = {
                "authid": $scope.userFavorites.authid,
                "favorite": favorite
            }
            mainSrv.postFavs(favoriteThing).then((response) => {
                getUser()
            })
        }
    }

    $scope.deleteFav = (favorite) => {
        var notFavoriteThing = {
            "notFav": favorite
        }
        console.log(notFavoriteThing)
        mainSrv.deleteFav(notFavoriteThing).then((response) => {
            getUser()
        })
    }



})