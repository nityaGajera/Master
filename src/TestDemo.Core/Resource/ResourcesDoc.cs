using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestDemo.Resource
{
    [Table("resourcedocument")]

    public class ResourcesDoc : FullAuditedEntity
    {
        public virtual string Title { get; set; }
        public virtual string Resource_Category { get; set; }
    }
}
