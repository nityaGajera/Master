using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestDemo.Product;
using TestDemo.Sensor;

namespace TestDemo.Sensorapplication.Dto
{
    [AutoMapFrom(typeof(Sensors))]
    public class SensorDto : EntityDto
    {
        public virtual string Title { get; set; }
        public virtual string Attachment { get; set; }
    }
}
