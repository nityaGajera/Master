(function () {
    angular.module('app').controller('app.views.sensor.index', [
        '$scope', '$timeout', '$uibModal', 'abp.services.app.sensor' ,'$http',
        function ($scope, $timeout, $uibModal, sensorService,$http) {
            var vm = this;
            vm.sensor = [];
            function getSensor() {
                sensorService.getSensorData()

                    .then(function (result) {
                        vm.sensor = result.data;
                    });
            }

            vm.openSensorCreate = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/Main/views/sensor/create.cshtml',
                    controller: 'app.views.sensor.create as vm',
                    backdrop: 'static'
                });

                modalInstance.rendered.then(function () {

                    $.AdminBSB.input.activate();

                });

                modalInstance.result.then(function () {
                    getSensor();
                });

            };
            vm.openSensorEdit = function (sensor) {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/Main/views/sensor/edit.cshtml',
                    controller: 'app.views.sensor.edit as vm',
                    backdrop: 'static',
                    resolve: {
                        id: function () {
                            return sensor.id;
                        }
                    }
                });

                modalInstance.rendered.then(function () {
                    $timeout(function () {
                        $.AdminBSB.input.activate();
                    }, 0);
                });

                modalInstance.result.then(function () {
                    getSensor();
                });
            };
            vm.deletedata = function (item) {

                abp.message.confirm(
                    "delete test '" + item.title + "'?",
                    "delete?",
                    function (result) {
                        if (result) {

                            sensorService.deleteSensor({ id: item.id })
                                .then(function () {
                                    abp.notify.info("deleted sensor is: " + item.title);
                                    getSensor();
                                });
                        }
                    });
            };

            function init() {
                getSensor();
            }
            init();
        }
    ]);
})();