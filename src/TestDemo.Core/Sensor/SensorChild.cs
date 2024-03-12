using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace TestDemo.FileUploadByDirective
{
    [Table("SensorChild")]
    public class SensorChild : FullAuditedEntity
    {
        public virtual int SensorId { get; set; }
        public virtual string Attachment { get; set; }
    }
}
