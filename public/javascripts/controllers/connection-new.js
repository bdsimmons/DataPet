function NewConnectionCtrl($scope, $filter, $http) {
  $scope.message = '';
  $scope.messageClass = '';

  // example JSON
  $scope.jsonData = {
      name: "SampleDB",
      adapter: "jdbc", 
      username: "dataPet",
      password: "dataPet", 
      driver: "com.ddtek.jdbc.openedge.OpenEdgeDriver",
      url: "jdbc:datadirect:openedge://example.com:7910;databaseName=test",
      db_type: "progress"
  };

  $scope.jsonDataString = JSON.stringify($scope.jsonData, null, '\t');

  $scope.editorOptions = {
    lineWrapping : true,
    lineNumbers: true,
    mode: {name: "javascript", json: true},
    smartIndent: true,
    tabSize: 2
  };

  $scope.sendData = function(){
    $scope.jsonData = JSON.parse($scope.jsonDataString);
    $http.post('/connections', {'connection': $scope.jsonData}).success(function(){
      $scope.messageClass = 'bg-success';
      $scope.message = "The connection was successfully created."
    });
  };

  $scope.testConnection = function(){
      $scope.jsonData = JSON.parse($scope.jsonDataString);
      $http.post('/connections/test', {'connection': $scope.jsonData}).success(function(data){
          $scope.messageClass = data['message_class'];
          $scope.message = data['message'];
      });
  };

}