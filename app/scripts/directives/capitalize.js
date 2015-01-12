//For capitalizing first letter even written with caps lock

angular.module('sampleApp')
.directive('capitalizeFirst', function(uppercaseFilter) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {

            var capitalize = function (inputValue) {
                if (inputValue) {
                   var input = inputValue.toLowerCase();
                    var capitalized = input.substring(0, 1).toUpperCase() + input.substring(1);
                    if (capitalized !== inputValue) {
                        modelCtrl.$setViewValue(capitalized);
                        modelCtrl.$render();
                    }
                    return capitalized;
                }
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize(scope[attrs.ngModel]);
        }
    };
});