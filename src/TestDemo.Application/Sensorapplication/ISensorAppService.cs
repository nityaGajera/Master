using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestDemo.Sensorapplication.Dto;

namespace TestDemo.Sensorapplication
{
   public interface ISensorAppService : IApplicationService
    {
        List<SensorDto> GetSensorData();
        Task CreateSensor(CreateSensorDto input);
        Task<SensorDto> getSensorbyid(EntityDto input);
        Task UpdateSensor(CreateSensorDto input);
        Task DeleteSensor(EntityDto input);
        bool SensorExsistence(SensorDto input);
       bool  SensorExsistenceById(SensorDto input);
       Task FileUploadProduct(FileUploadDto input);



    }
}
