(function () {
    var myApp = angular.module('app');
    myApp.controller('app.views.resource.edit', [
        '$scope', '$uibModalInstance', 'abp.services.app.resource', 'id',
        function ($scope, $uibModalInstance, resourceService, id) {


            var vm = this;
            vm.resource = {};
            //debugger;
            //alert(1);

            function init() {
                if (id == undefined) {

                } else {
                    getResourcebyid();
                }
            }
            init();

            function getResourcebyid() {
                resourceService.getResourcebyid({
                    id: id
                }).then(function (result) {

                    vm.resource = result.data;
                    console.log(vm.resource);
                });
            }

            vm.cancel = function () {
                $uibModalInstance.close();
            }
            vm.save = function () {

                resourceService.updateResource(vm.resource)
                    .then(function () {
                        abp.notify.info(App.localize('SavedSuccessfully'));
                        $uibModalInstance.close();
                    });

            };

        }
    ]);
})();