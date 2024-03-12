using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestDemo.Sensor
{
    [Table("sensor")]
    public class Sensors : FullAuditedEntity
    {
        public virtual string Title { get; set; }
        public virtual string Attachment {  get; set; }
    }
}
