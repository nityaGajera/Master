using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestDemo.Application
{
    [Table("application")]
    public class Applications : FullAuditedEntity
    {
        public virtual string Title { get; set; }   
        public virtual string PageName { get; set; }
        public virtual string Discription { get; set;}
    }
}
