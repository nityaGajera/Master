using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestDemo.FileUploadByDirective;

namespace TestDemo.Sensorapplication.Dto
{
    [AutoMapTo(typeof(SensorChild))]
    public class FileUploadDto : EntityDto
    {
        public virtual int SensorId { get; set; }
        public virtual List<string> Attachment { get; set; }

    }
}
