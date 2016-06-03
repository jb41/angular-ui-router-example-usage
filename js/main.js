var myapp = angular.module('myapp', ["ui.router"])

function ProgramsController(hub, params, state) {
  hub.programId = params.programId;
  hub.allPrograms = [30, 31, 32, 33];
  hub.allParts = [1, 2, 3, 4];


  if (state.params.partId == undefined) {
    state.go('programs.parts', {programId: hub.programId, partId: 1})
  }
}

myapp.controller('ProgramsController', function($scope, $stateParams, $state) {
  return ProgramsController($scope, $stateParams, $state); 
});

myapp.config(function($stateProvider, $locationProvider) {
  // $locationProvider.html5Mode({ enabled: true, requireBase: false });
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('programs', {
      url: "/programs/:programId",
      templateUrl: 'partials/programs.tpl.html',
      controller: 'ProgramsController'
    })
    .state('programs.parts', {
      url: "/parts/:partId",
      templateUrl: 'partials/parts.tpl.html',
      controller: function($scope, $stateParams, $state){
        $scope.partId = $stateParams.partId;
        $scope.firstLessonId = 81;
        console.log($scope.allParts);

        if ($state.params.lessonId == undefined) {
          $state.go('programs.parts.lessons', {programId: $scope.programId, partId: $scope.partId, lessonId: $scope.firstLessonId});
        }

        console.log(new Date());
      }
    })
    .state('programs.parts.lessons', {
      url: "/lessons/:lessonId",
      templateUrl: 'partials/lessons.tpl.html',
      controller: function($scope, $stateParams){
        $scope.lessonId = $stateParams.lessonId;
        $scope.allLessons = [81, 82, 83, 84, 85, 86, 87, 88, 89];
      }
    })
    .state('programs.workbook', {
      url: "/workbook",
      templateUrl: 'partials/workbook.tpl.html'
    })
})