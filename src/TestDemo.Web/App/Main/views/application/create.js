(function () {
    angular.module('app').controller('app.views.application.create', [
        '$scope', '$uibModalInstance', 'abp.services.app.application',
        function ($scope, $uibModalInstance, applicationService) {
            var vm = this;
            vm.application = {};


            vm.save = function () {
                applicationService.createApplication(vm.application).then(function () {
                    abp.notify.info(App.localize('SavedSuccessfully'));
                    $uibModalInstance.close();

                }).finally(function () {
                    vm.saving = false;
                });
            };
            vm.cancel = function () {
                $uibModalInstance.dismiss();
            };
            function init() {
            }
            init();
        }
    ]);
})();