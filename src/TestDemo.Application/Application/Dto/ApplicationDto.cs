using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestDemo.Product;

namespace TestDemo.Application.Dto
{
    [AutoMapFrom(typeof(Applications))]
    public class ApplicationDto : EntityDto
    {
        public virtual string Title { get; set; }
        public virtual string PageName { get; set; }
        public virtual string Discription { get; set; }
    }
}
