using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestDemo.Product.Dto;
using TestDemo.Product;
using TestDemo.Resource;
using TestDemo.Resourceapplications.Dto;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;

namespace TestDemo.Resourceapplications
{
    public class ResourceAppService : TestDemoApplicationModule,IResourceAppService
    {
        private readonly IRepository<Resources> _ResourceRepository;

        public ResourceAppService(IRepository<Resources> ResourceRepository)
        {
            _ResourceRepository = ResourceRepository;
        }
        public List<ResourceDto> GetResourceData()
        {
            var resource = (from a in _ResourceRepository.GetAll()
                           select new ResourceDto
                           {
                               Id = a.Id,
                               Name = a.Name,
                           }).ToList();
            return resource;
        }
        public async Task CreateResource(CreateResourceDto input)
        {
            var resource = input.MapTo<Resources>();
            await _ResourceRepository.InsertAsync(resource);
        }

        public async Task<ResourceDto> getResourcebyid(EntityDto input)
        {
            await _ResourceRepository.GetAsync(input.Id);
            var resource = (from a in _ResourceRepository.GetAll()
                            where a.Id == input.Id
                            select new ResourceDto
                            {
                                Id = a.Id,
                                Name = a.Name,
                            }).FirstOrDefault();
            return resource;
        }
        public async Task UpdateResource(CreateResourceDto input)
        {
            var resource = await _ResourceRepository.GetAsync(input.Id);
            resource.Name = input.Name;
            await _ResourceRepository.UpdateAsync(resource);
        }
        public async Task DeleteResource(EntityDto input)
        {
            await _ResourceRepository.DeleteAsync(input.Id);
        }
    }
}
