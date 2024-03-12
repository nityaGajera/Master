using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TestDemo.Product.Dto;
using TestDemo.Product;
using TestDemo.Sensor;
using TestDemo.Sensorapplication.Dto;
using Abp.AutoMapper;
using TestDemo.FileUploadByDirective;
using Abp.Runtime.Session;
using Abp.Collections.Extensions;
using Abp.Authorization.Users;
using TestDemo.Authorization.Roles;

namespace TestDemo.Sensorapplication
{
    public class SensorAppService : TestDemoApplicationModule, ISensorAppService
    {
        private readonly IRepository<Sensors> _sensorRepository;
        private readonly IRepository<SensorChild> _sensorchildRepository;
        private readonly IAbpSession _session;
        private readonly IRepository<UserRole, long> _userRoleRepository;
        private readonly IRepository<Role> _roleRepository;


        public SensorAppService(IRepository<Sensors> sensorRepository, IAbpSession session, IRepository<Role> roleRepository, IRepository<UserRole, long> userRoleRepository)
        {
            _sensorRepository = sensorRepository;
            _session = session;
            _userRoleRepository = userRoleRepository;
            _roleRepository = roleRepository;
        }
        public List<SensorDto> GetSensorData()
        {
            int curId = (int)_session.UserId;

            var getRole = (from ur in _userRoleRepository.GetAll().Where(x => x.UserId == curId)
                           join r in _roleRepository.GetAll()
                           on ur.RoleId equals r.Id
                           select new
                           {
                               RoleName = r.Name,
                           }).FirstOrDefault();

            var sensor = (from a in _sensorRepository.GetAll().WhereIf(getRole.RoleName == "employee", x => x.CreatorUserId == curId)
                          select new SensorDto
                          {
                              Id = a.Id,
                              Title = a.Title,
                              Attachment = a.Attachment,
                            }).ToList();
            return sensor;
        }

        public async Task CreateSensor(CreateSensorDto input)
        {
            var sensor = input.MapTo<Sensors>();
            await _sensorRepository.InsertAsync(sensor);
        }

        public async Task<SensorDto> getSensorbyid(EntityDto input)
        {
            await _sensorRepository.GetAsync(input.Id);
            var sensor = (from a in _sensorRepository.GetAll()
                          where a.Id == input.Id
                          select new SensorDto
                          {
                              Id = a.Id,
                              Title = a.Title,
                              Attachment = a.Attachment,
                          }).FirstOrDefault();
            return sensor;
        }
        public async Task UpdateSensor(CreateSensorDto input)
        {
            var sensor = await _sensorRepository.GetAsync(input.Id);
            sensor.Title = input.Title;
            sensor.Attachment = input.Attachment;

            await _sensorRepository.UpdateAsync(sensor);
        }
        public async Task DeleteSensor(EntityDto input)
        {
            await _sensorRepository.DeleteAsync(input.Id);
        }

        public bool SensorExsistence(SensorDto input)
        {
            return _sensorRepository.GetAll().Where(e => e.Attachment == input.Attachment).Any();
        }
        public bool SensorExsistenceById(SensorDto input)
        {
            return _sensorRepository.GetAll().Where(e => e.Attachment == input.Attachment && e.Id != input.Id).Any();
        }

        //public async Task<int> CreateFileUploadProduct(CreateFileUploadDto input)
        //{
        //    var Products = input.MapTo<Productmaster>();
        //    int Id = await _productmasterRepository.InsertAndGetIdAsync(Products);
        //    return Id;
        //}
        public async Task FileUploadProduct(FileUploadDto input)
        {
            if (input.Attachment != null && input.Attachment.Count() != 0)
            {
                for (int i = 0; i < input.Attachment.Count(); i++)
                {
                    SensorChild doc = new SensorChild();
                    doc.Attachment = input.Attachment[i];
                    doc.SensorId = input.Id;
                    await _sensorchildRepository.InsertAsync(doc);
                }
            }
        }
    }
}

