using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestDemo.Application.Dto;

namespace TestDemo.Application
{
    public interface IApplicationAppService : IApplicationService
    {
        List<ApplicationDto> GetApplicationData();
        Task CreateApplication(CreateApplicationDto input);
        Task<ApplicationDto> getApplicationbyid(EntityDto input);
        Task UpdateApplication(CreateApplicationDto input);
        Task DeleteApplication(EntityDto input);

    }
}
