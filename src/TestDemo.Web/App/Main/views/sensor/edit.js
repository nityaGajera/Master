//(function () {
//    var myApp = angular.module('app');
//    myApp.controller('app.views.sensor.edit', [
//        '$scope', '$http', '$uibModalInstance', 'abp.services.app.sensor', 'id',
//        function ($scope, $http, $uibModalInstance, sensorService, id) {
//            var vm = this;
//            vm.loading = false;
//            vm.saving = false;
//            vm.sensor = {};
//            vm.editMode = false; // Flag to indicate edit mode


//            function init() {

//                if (id == undefined) {

//                } else {
//                    sensorExsistenceById();
//                }
//            }


//            function sensorExsistenceById() {
//                sensorService.sensorExsistenceById({
//                    id: id
//                }).then(function (result) {

//                    vm.sensor = result.data;
//                    vm.existingFileName = vm.sensor.attachment; // Store the existing file name for editing

//                    console.log(vm.sensor);
//                });
//            }
//            vm.uploadFile = function (file) {
//                if (!vm.editMode) { // Only upload file if not in edit mode

//                    vm.saving = true;
//                    if ($('#filetoupload')[0].files.length != 0) {
//                        var files = $('#filetoupload')[0].files[0];
//                        if ($('#filetoupload')[0].files.length == 0) {

//                            abp.notify.error(App.localize('pleaseuploaddoc'));
//                            return;
//                        }
//                        var uploadUrl = "../FileUpload/UploadProductAttachments";
//                        var fd = new FormData();
//                        fd.append('file', $('#filetoupload')[0].files[0]);
//                    }
//                    else {
//                        var uploadUrl = "../FileUpload/UploadProductAttachments";
//                        var fd = new FormData();
//                        fd.append('file', vm.sensor.attachment);
//                    }
//                    $http.post(uploadUrl, fd, {
//                        transformRequest: angular.identity,
//                        headers: { 'Content-Type': undefined }
//                    }).then(function (data, status) {
//                        if (data.statusText == "OK") {
//                            vm.sensor.attachment = data.data.Result.fileName;

//                        }



//                        else {
//                            alert("somethingsiswrong");
//                        }

//                    }).finally(function () {
//                        vm.saving = false;
//                        vm.saveAs();
//                    })


//                };



//                function init() {

//                    sensorService.getSensorbyid({
//                        id: id
//                    }).then(function (result) {
//                        debugger;
//                        vm.sensor = result.data;
//                        console.log(vm.sensor);
//                    });


//                }


//                vm.saveAs = function () {
//                    vm.loading = true;
//                    vm.saving = true;
//                    sensorService.sensorExsistenceById(vm.sensor).then(function (result) {
//                        if (!result.data) {
//                            sensorService.updateSensor(vm.sensor)
//                                .then(function () {
//                                    abp.notify.success(App.localize('ProductSavedSuccessfully'));
//                                    $uibModalInstance.close();

//                                });
//                        }

//                        else {
//                            abp.notify.error(App.localize('sensor already Exist '));
//                            vm.loading = false;
//                        }
//                    }).finally(function () {
//                        vm.saving = false;
//                    });
//                };

//                vm.edit = function () {
//                    vm.editMode = true; // Toggle edit mode
//                };

//                vm.save = function () {
//                    vm.loading = true;

//                    if ($('#filetoupload')[0].files.length != 0) {
//                        var files = $('#filetoupload')[0].files[0];
//                        vm.sensor.attachment = files.name;
//                        var ext = vm.sensor.attachment.split('.').pop();


//                        if (ext == 'pdf' || ext == 'jpg' || ext == 'jpeg' || ext == 'doc' || ext == 'docx' || ext == 'txt' || ext == 'xls' || ext == 'xlsx') {

//                            vm.uploadFile();


//                        }

//                        else {
//                            abp.notify.error(App.localize('pleaseuploadcorrectfile'));

//                            vm.loading = false;
//                        }
//                    }
//                    else {

//                        vm.sensor.attachment = vm.sensor.attachment;
//                        vm.uploadFile();
//                    }
//                }


//                function init() {
//                    if (id == undefined) {

//                    } else {
//                        getSensorbyid();
//                    }
//                }

//                function getSensorbyid() {
//                    sensorService.getSensorbyid({
//                        id: id
//                    }).then(function (result) {
//                        debugger;
//                        vm.sensor = result.data;
//                        console.log(vm.sensor);
//                    });
//                }

//                vm.cancel = function () {
//                    $uibModalInstance.close();
//                }
//                vm.save = function () {

//                    sensorService.updateSensor(vm.sensor)
//                        .then(function () {
//                            abp.notify.info(App.localize('SavedSuccessfully'));
//                            $uibModalInstance.close();
//                        });

//                };

//            }
//            init();
//        }
//    ]);
//})();



(function () {
    var myApp = angular.module('app');
    myApp.controller('app.views.sensor.edit', [
        '$scope', '$http', '$uibModalInstance', 'abp.services.app.sensor', 'id',
        function ($scope, $http, $uibModalInstance, sensorService, id) {
            var vm = this;
            vm.loading = false;
            vm.saving = false;
            vm.sensor = {};
          
            function init() {
                debugger;
                if (id == undefined) {

                } else {
                    sensorExsistenceById();
                }
            }
            init();

            function sensorExsistenceById() {
                sensorService.sensorExsistenceById({
                    id: id
                }).then(function (result) {
                    debugger;
                    vm.sensor = result.data;
                    console.log(vm.sensor);
                });
            }

           

            vm.uploadFile = function (file) {
                vm.saving = true;
                if ($('#filetoupload')[0].files.length != 0) {
                    var files = $('#filetoupload')[0].files[0];
                    if ($('#filetoupload')[0].files.length == 0) {

                        abp.notify.error(App.localize('pleaseuploaddoc'));
                        return;
                    }
                    var uploadUrl = "../FileUpload/UploadSensorAttachments";
                    var fd = new FormData();
                    fd.append('file', $('#filetoupload')[0].files[0]);
                }
                else {
                    var uploadUrl = "../FileUpload/UploadSensorAttachments";
                    var fd = new FormData();
                    fd.append('file', vm.sensor.attachment);
                }
                $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                }).then(function (data, status) {
                    if (data.statusText == "OK") {
                        vm.sensor.attachment = data.data.Result.fileName;
                        //vm.saveAs();
                        //console.log(data);
                    }



                    else {
                        alert("somethings iswrong");
                    }

                }).finally(function () {
                    vm.saving = false;
                    vm.saveAs();
                })
                $scope.imagePath = 'D:/Megh_Internship/Working/ADI/7.3.0/src/TestDemo.Web/UserFiles/Sensors';
                $scope.saveChanges = function () {
                    console.log("Image path saved:", $scope.imagePath);
                    debugger;
                };

            };
            //$scope.getImage = function () {
            //    ImageService.getImage(imageId)
            //        .then(function (response) {
            //            $scope.imageData = response.data; 
            //        })
            //        .catch(function (error) {
            //            console.error('Error retrieving image:', error);
            //        }); 
            //};
            //$scope.getImage();


            function init() {

                productService.getSensorbyid({
                    id: id
                }).then(function (result) {
                    debugger;
                    vm.sensor = result.data;
                    console.log(vm.sensor);
                });


            }


            vm.saveAs = function () {
                vm.loading = true;
                vm.saving = true;
                senosrService.sensorExsistenceById(vm.sensor).then(function (result) {
                    if (!result.data) {
                        sensorService.updateSensor(vm.sensor)
                            .then(function () {
                                abp.notify.success(App.localize('SensorSavedSuccessfully'));
                                $uibModalInstance.close();

                            });
                    }

                    else {
                        abp.notify.error(App.localize('sensor already Exist '));
                        vm.loading = false;
                    }
                }).finally(function () {
                    vm.saving = false;
                });
            };

            vm.save = function () {
                vm.loading = true;

                if ($('#filetoupload')[0].files.length != 0) {
                    var files = $('#filetoupload')[0].files[0];
                    vm.sensor.attachment = files.name;
                    var ext = vm.senosr.attachment.split('.').pop();


                    if (ext == 'pdf' || ext == 'jpg' || ext == 'jpeg' || ext == 'doc' || ext == 'docx' || ext == 'txt' || ext == 'xls' || ext == 'xlsx') {

                        vm.uploadFile();


                    }

                    else {
                        abp.notify.error(App.localize('pleaseuploadcorrectfile'));
                        //return;
                        vm.loading = false;
                    }
                }
                else {
                    //abp.notify.error(App.localize('pleaseuploadproduct'));
                    //return;
                    vm.sensor.attachment = vm.sensor.attachment;
                    vm.uploadFile();
                }
            }
            function init() {
                /*debugger;*/
                if (id == undefined) {

                } else {
                    getSensorbyid();
                }
            }
            init();
            function getSensorbyid() {
                sensorService.getSensorbyid({
                    id: id
                }).then(function (result) {
                    
                    vm.sensor = result.data;
                    console.log(vm.sensor);
                });
            }

            vm.cancel = function () {
                $uibModalInstance.close();
            }
            vm.save = function () {

                sensorService.updateSensor(vm.sensor)
                    .then(function () {
                        abp.notify.info(App.localize('SavedSuccessfully'));
                        $uibModalInstance.close();
                    });

            };

        }
    ]);
})();



