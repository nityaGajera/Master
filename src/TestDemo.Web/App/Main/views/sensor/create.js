(function () {
    angular.module('app').controller('app.views.sensor.create', [
        '$scope', '$uibModalInstance', 'abp.services.app.sensor', '$http',
        function ($scope, $uibModalInstance, sensorService, $http) {
            var vm = this;
            vm.saving = false;
            vm.loading = false;
            var maxsize = 2048000;
            vm.sensor = {};


            vm.save = function () {
                sensorService.createSensor(vm.sensor).then(function () {
                    abp.notify.info(App.localize('SavedSuccessfully'));
                    $uibModalInstance.close();

                }).finally(function () {
                    vm.saving = false;
                });
            };

            vm.getAll = function () {
                vm.loading = true;
                // debugger;
                sensorService.GetSensorData($.extend({}, vm.requestParams)).then(function (result) {
                    //  debugger;
                    vm.sensor = result.data.items;
                    vm.userGridOptions.totalItems = result.data.totalCount;
                    vm.userGridOptions.data = result.data.items;
                    if (result.data.totalCount == 0) {
                        //vm.norecord = true;
                        abp.notify.info(app.localize('NoRecordFound'));
                    }
                    else { vm.norecord = false; }
                }).finally(function () {
                    vm.loading = false;
                });

            }
            vm.uploadFile = function (file) {
               
                vm.saving = true;
                var files = $('#filetoupload')[0].files[0];
                /*//console.log(files);*/
                if ($('#filetoupload')[0].files.length == 0) {

                    abp.notify.error(App.localize('pleaseuploaddoc'));

                    return;
                }

                var uploadUrl = "../FileUpload/UploadProductAttachments";
                
                var fd = new FormData();
                fd.append('file', $('#filetoupload')[0].files[0]);

                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                }).then(function (data, status) {
                    console.log(data);
                    if (data.statusText == "OK") {

                        vm.sensor.attachment = data.data.Result.fileName;
                        //vm.saveAs();
                        //console.log(data);
                    }


                    else {
                        alert("somethingsiswrong");
                    }

                }).finally(function () {
                    vm.saving = false;
                    vm.saveAs();

                })


            };
            vm.saveAs = function () {
                vm.loading = true;
                vm.saving = true;
                sensorService.createSensor(vm.sensor).then(function (result) {
                    vm.sensor = result.data;
                    abp.notify.success(App.localize('SensorSavedSuccessfully'));

                    $uibModalInstance.close();
                    vm.getAll();

                }).finally(function () {
                    vm.saving = false;
                });
            };
            vm.save = function () {
                
                vm.loading = true;
                var files = $('#filetoupload')[0].files[0];


                if ($('#filetoupload')[0].files.length != 0) {
                    vm.sensor.attachment = files.name;
                    var ext = vm.sensor.attachment.split('.').pop();
                    if (ext == 'pdf' || ext == 'jpg' || ext == 'jpeg' || ext == 'doc' || ext == 'docx' || ext == 'txt' || ext == 'xls' || ext == 'xlsx') {
                        //var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
                        //var i = parseInt(Math.floor(Math.log(files.size) / Math.log(1024)));
                        //var sz = Math.round(files.size / Math.pow(1024, i), 2) + ' ' + sizes[i];
                        if (files.size <= maxsize) {
                            vm.uploadFile();
                        }
                        else {
                            abp.notify.error(App.localize('FilesizeexceedsmaximumlimitMB'));
                        }
                    }

                    else {
                        abp.notify.error(App.localize('pleaseuploadcorrectfile'));

                        // return;
                    }

                }
                else {
                    abp.notify.error(App.localize('pleaseuploaddoc'));
                    //return;
                    vm.loading = false;
                }
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





