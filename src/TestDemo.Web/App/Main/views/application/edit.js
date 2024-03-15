(function () {
    var myApp = angular.module('app');
    myApp.controller('app.views.application.edit', [
        '$scope', '$uibModalInstance', 'abp.services.app.application', 'id',
        function ($scope, $uibModalInstance, applicationService, id) {
            var vm = this;
            vm.application = {};

            function init() {       
                getApplicationbyid();
            }
            init();

            function getApplicationbyid() {
                applicationService.getApplicationbyid({
                    id: id
                }).then(function (result) {
                   
                    vm.application = result.data;
                });
            }

            vm.cancel = function () {
                $uibModalInstance.close();
            }
            vm.save = function () {

                applicationService.updateApplication(vm.application)
                    .then(function () {
                        abp.notify.info(App.localize('SavedSuccessfully'));
                        $uibModalInstance.close();
                    });

            };

        }
    ]);
})();