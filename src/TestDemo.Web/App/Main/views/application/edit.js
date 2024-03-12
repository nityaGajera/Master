(function () {
    var myApp = angular.module('app');
    myApp.controller('app.views.application.edit', [
        '$scope', '$uibModalInstance', 'abp.services.app.application', 'id',
        function ($scope, $uibModalInstance, applicationService, id) {
            var vm = this;
            vm.application = {};

            function init() {
                debugger;
                if (id == undefined) {

                } else {
                    getApplicationbyid();
                }
            }
            init();

            function getApplicationbyid() {
                applicationService.getApplicationbyid({
                    id: id
                }).then(function (result) {
                    debugger;
                    vm.application = result.data;
                    console.log(vm.application);
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