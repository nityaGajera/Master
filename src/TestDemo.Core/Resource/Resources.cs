using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestDemo.Resource
{
    [Table("resource")]
    public class Resources : FullAuditedEntity
    {
        public virtual string Name { get; set; }

    }
}
