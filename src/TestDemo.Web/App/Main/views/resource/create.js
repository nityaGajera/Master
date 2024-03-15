(function () {
    angular.module('app').controller('app.views.resource.create', [
        '$scope', '$uibModalInstance', 'abp.services.app.resource',
        function ($scope, $uibModalInstance, resourceService) {
            var vm = this;
            vm.resource = {};


            vm.save = function () {
                resourceService.createResource(vm.resource).then(function () {
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