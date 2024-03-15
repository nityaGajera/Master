(function () {
    angular.module('app').controller('app.views.resource.indexresource', [
        '$scope', '$timeout', '$uibModal', 'abp.services.app.resource',
        function ($scope, $timeout, $uibModal, resourceService) {
            var vm = this;
            vm.resources = [];
            function getresource() {
                resourceService.getResourceData()

                    .then(function (result) {
                        vm.resources = result.data;
                    });
            }
          

            vm.openresourcecreate = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/Main/views/resource/createresource.cshtml',
                    controller: 'app.views.resource.createresource as vm',
                    backdrop: 'static'
                });

                modalInstance.rendered.then(function () {

                    $.AdminBSB.input.activate();

                });

                modalInstance.result.then(function () {
                    getresource();
                });

            };
            vm.openresourceEdit = function (resource) {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/Main/views/resource/edit.cshtml',
                    controller: 'app.views.resource.edit as vm',
                    backdrop: 'static',
                    resolve: {
                        id: function () {
                            return resources.id;
                        }
                    }
                });

                modalInstance.rendered.then(function () {
                    $timeout(function () {
                        $.AdminBSB.input.activate();
                    }, 0);
                });

                modalInstance.result.then(function () {
                    getresource();
                });
            };
            vm.deletedata = function (item) {

                abp.message.confirm(
                    "delete test '" + item.title + "'?",
                    "delete?",
                    function (result) {
                        if (result) {

                            resourceService.deleteResource({ id: item.id })
                                .then(function () {
                                    abp.notify.info("deleted resource is: " + item.title);
                                    getresource();
                                });
                        }
                    });
            };

            function init() {
                getresource();
            }
            init();
        }
    ]);
})();