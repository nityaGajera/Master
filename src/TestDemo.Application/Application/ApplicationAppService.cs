using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestDemo.Product.Dto;
using TestDemo.Product;
using TestDemo.Application.Dto;
using Abp.AutoMapper;



namespace TestDemo.Application
{
    public class ApplicationAppService : TestDemoApplicationModule, IApplicationAppService
    {
        private readonly IRepository<Applications> _applicationRepository;

        public ApplicationAppService(IRepository<Applications> applicationRepository)
        {
            _applicationRepository = applicationRepository;
        }
        public List<ApplicationDto> GetApplicationData()
        {
            var application = (from a in _applicationRepository.GetAll()
                           select new ApplicationDto
                           {
                               Id = a.Id,
                               Title = a.Title,
                               PageName = a.PageName,
                               Discription = a.Discription,
                           }).ToList();
            return application;
        }

        public async Task CreateApplication(CreateApplicationDto input)
        {
            var application = input.MapTo<Applications>();
            await _applicationRepository.InsertAsync(application);
        }

        public async Task<ApplicationDto> getApplicationbyid(EntityDto input)
        {
            await _applicationRepository.GetAsync(input.Id);
            var application = (from a in _applicationRepository.GetAll()
                            where a.Id == input.Id
                            select new ApplicationDto
                            {
                                Id = a.Id,
                                Title = a.Title,
                                PageName = a.PageName,
                                Discription = a.Discription,
                            }).FirstOrDefault();
            return application;
        }
        public async Task UpdateApplication(CreateApplicationDto input)
        {
            var application = await _applicationRepository.GetAsync(input.Id);
            application.Title = input.Title;
            application.PageName = input.PageName;
            application.Discription = input.Discription;

            await _applicationRepository.UpdateAsync(application);
        }
        public async Task DeleteApplication(EntityDto input)
        {
            await _applicationRepository.DeleteAsync(input.Id);
        }
    }
}
