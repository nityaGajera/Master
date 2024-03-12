(function () {
    angular.module('app').controller('app.views.application.index', [
        '$scope', '$timeout', '$uibModal', 'abp.services.app.application',
        function ($scope, $timeout, $uibModal, applicationService) {
            var vm = this;
            vm.application = [];
            function getApplication() {
                applicationService.getApplicationData()

                    .then(function (result) {
                        vm.application = result.data;
                    });
            }

            vm.openApplicationCreate = function () {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/Main/views/application/create.cshtml',
                    controller: 'app.views.application.create as vm',
                    backdrop: 'static'
                });

                modalInstance.rendered.then(function () {

                    $.AdminBSB.input.activate();

                });

                modalInstance.result.then(function () {
                    getApplication();
                });

            };
            vm.openApplicationEdit = function (application) {
                var modalInstance = $uibModal.open({
                    templateUrl: '/App/Main/views/application/edit.cshtml',
                    controller: 'app.views.application.edit as vm',
                    backdrop: 'static',
                    resolve: {
                        id: function () {
                            return application.id;
                        }
                    }
                });

                modalInstance.rendered.then(function () {
                    $timeout(function () {
                        $.AdminBSB.input.activate();
                    }, 0);
                });

                modalInstance.result.then(function () {
                    getApplication();
                });
            };
            vm.deletedata = function (item) {
                debugger;

                abp.message.confirm(
                    "delete test '" + item.title + "'?",
                    "delete?",
                    function (result) {
                        if (result) {

                            applicationService.deleteApplication({ id: item.id })
                                .then(function () {
                                    abp.notify.info("deleted application is: " + item.title);
                                    getApplication();
                                });
                        }
                    });
            };

            function init() {
                getApplication();
            }
            init();
        }
    ]);
})();