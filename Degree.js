

var degreeApp = angular.module('degreeApp', [])
var terms;
var randomNum = Math.floor((Math.random()*10)+1);
var searchResults;
var selectedSetID;
function start()
{
    alert("started");
}

function SearchController($scope)
{
    var searchURL;
    $scope.$watch('searchTerms', function(newValue){
//        $scope.randomTerm = window.terms[window.randomNum].definition;
        if(newValue !=null)
        {
            var searchURL = 'https://api.quizlet.com/2.0/search/sets?client_id=WhvaFHKCBq&whitespace=1&q='+newValue;
        }



    jQuery.ajax({
        type: 'GET',
        url: searchURL ,
        dataType: 'jsonp',
        success: function(data) {
            window.searchResults = data;
            //alert('success');
            //console.log(window.terms);
            $scope.loadingIsDone = true;
            $scope.results= window.searchResults.sets;
        }
    });
    console.log($scope.setNumber)
    });

    $scope.getSelectedSet = function(){
        console.log($scope.setNumber);
        window.selectedSetID = $scope.setNumber.id;
        console.log(window.selectedSetID);
    }


}

function SimpleController($scope)
{
    //https://api.quizlet.com/2.0/sets/415?client_id=WhvaFHKCBq&whitespace=1

    $scope.clock = new Date();

    var updateClock = function() {
        $scope.clock = new Date();
    };
    var timer = setInterval(function() {
        $scope.$apply(updateClock);
    }, 1000);

    updateClock();

    $scope.terms= window.terms;

    $scope.definition = window.terms;

    $scope.$watch('setNumber', function(theSetID)
    {
    var setURL = 'https://api.quizlet.com/2.0/sets/' + window.selectedSetID + '?client_id=WhvaFHKCBq&whitespace=1';

    jQuery.ajax({
        type: 'GET',
        url: setURL,
        dataType: 'jsonp',
        success: function(data) {
            window.terms = data.terms;
            //alert('success');
            //console.log(window.terms);
            $scope.loadingIsDone = true;
            $scope.terms= window.terms;
        }
    });
    });

    function start()
    {
        alert("started");
    }

    $scope.terms= window.terms;

    $scope.$watch('theterm', function(newValue){
//        $scope.randomTerm = window.terms[window.randomNum].definition;
        if(terms !=null)
        {
            $scope.randomTerm = window.terms[window.randomNum];
                if(angular.lowercase($scope.theterm) == angular.lowercase($scope.randomTerm.term))
                {
                    alert('MATCH!!');
                    if(window.terms != null)
                    {
                        $scope.randomTerm = window.terms[window.randomNum].definition;
                        window.randomNum = Math.floor((Math.random()*window.terms.length)+1)
                    }
                }


        }
    });

    $scope.showAnswer = function()
    {
        console.log("Show answer clicked. ");
        $scope.answer = $scope.randomTerm.term;
    }
    $scope.skipQuestion = function()
    {
        console.log("Skipped ");
        $scope.randomTerm = window.terms[window.randomNum].definition;
    }

    degreeApp.controller('SimpleController', SimpleController)
}

angular.element(document).ready(function() {


});//end document.ready