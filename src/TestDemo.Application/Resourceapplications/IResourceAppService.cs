using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestDemo.Resourceapplications.Dto;

namespace TestDemo.Resourceapplications
{
    public interface IResourceAppService : IApplicationService
    {
        List<ResourceDto> GetResourceData();
        Task CreateResource(CreateResourceDto input);
        Task<ResourceDto> getResourcebyid(EntityDto input);
        Task UpdateResource(CreateResourceDto input);
        Task DeleteResource(EntityDto input);

    }
}
