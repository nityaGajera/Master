using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestDemo.Product;
using TestDemo.Resource;

namespace TestDemo.Resourceapplications.Dto
{
    [AutoMapTo(typeof(Resources))]

    public class CreateResourceDto : EntityDto
    {
        public virtual string Name { get; set; }

    }
}
