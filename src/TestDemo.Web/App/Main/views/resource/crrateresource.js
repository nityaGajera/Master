(function () {
    angular.module('app').controller('app.views.resource.createresource', [
        '$scope', '$uibModalInstance', 'abp.services.app.resource',
        function ($scope, $uibModalInstance, resourceService) {
            var vm = this;
            vm.resources = {};
          

            vm.save = function () {
                debugger;
                alert(1);
                resourceService.createResource(vm.resources).then(function () {
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