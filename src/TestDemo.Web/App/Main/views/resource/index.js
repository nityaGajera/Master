(function () {
    angular.module('app').controller('app.views.resource.index', [
        '$scope', '$timeout', '$uibModal', 'abp.services.app.resource',
        function ($scope, $timeout, $uibModal, resourceService) {
            var vm = this;
            vm.resource = [];
            function getresource() {
                resourceService.getResourceData()

                    .then(function (result) {
                        vm.resource = result.data;
                    });
            }
            //vm.permissions = {
            //    productcreate: abp.auth.hasPermission('Pages.ProductCategory.Create'),
            //    productupdate: abp.auth.hasPermission('Pages.ProductCategory.Update'),
            //    productdelete: abp.auth.hasPermission('Pages.ProductCategory.Delete'),
            //}

            //vm.productcreatepermission = function () {
            //    if (vm.permissions.productcreate) {
            //        return true;
            //    } else {
            //        return false;
            //    }
            //}
            //vm.productupdatepermission = function () {
            //    if (vm.permissions.productupdate) {
            //        return true;
            //    } else {
            //        return false;
            //    }
            //}
            //vm.productdeletepermission = function () {
            //    if (vm.permissions.productdelete) {
            //        return true;
            //    } else {
            //        return false;
            //    }
            //}

            vm.openresourcecreate = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/Main/views/resource/create.cshtml',
                    controller: 'app.views.resource.create as vm',
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
                            return resource.id;
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
                    "delete test '" + item.name + "'?",
                    "delete?",
                    function (result) {
                        if (result) {

                            resourceService.deleteResource({ id: item.id })
                                .then(function () {
                                    abp.notify.info("deleted resource is: " + item.name);
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