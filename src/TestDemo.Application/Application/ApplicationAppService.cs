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
using Abp.Runtime.Session;
using Abp.Collections.Extensions;
using Abp.Authorization.Users;
using TestDemo.Authorization.Roles;
using static System.Collections.Specialized.BitVector32;



namespace TestDemo.Application
{
    public class ApplicationAppService : TestDemoApplicationModule, IApplicationAppService
    {
        private readonly IRepository<Applications> _applicationRepository;
        private readonly IAbpSession _session;
        private readonly IRepository<UserRole, long> _userRoleRepository;
        private readonly IRepository<Role> _roleRepository;

        public ApplicationAppService(IRepository<Applications> applicationRepository, IAbpSession session, IRepository<Role> roleRepository, IRepository<UserRole, long> userRoleRepository)
        {
            _applicationRepository = applicationRepository;
            _session = session;
            _userRoleRepository = userRoleRepository;
            _roleRepository = roleRepository;
        }
        public List<ApplicationDto> GetApplicationData()
        {

            int curId = (int)_session.UserId;

            var getRole = (from ur in _userRoleRepository.GetAll().Where(x => x.UserId == curId)
                           join r in _roleRepository.GetAll()
                           on ur.RoleId equals r.Id
                           select new
                           {
                               RoleName = r.Name,
                           }).FirstOrDefault();

            var application = (from a in _applicationRepository.GetAll().WhereIf(getRole.RoleName == "Employe", x => x.CreatorUserId == curId)
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
