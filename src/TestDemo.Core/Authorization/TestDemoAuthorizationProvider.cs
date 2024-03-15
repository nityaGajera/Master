using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace TestDemo.Authorization
{
    public class TestDemoAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
            var ProductCategory = context.CreatePermission(PermissionNames.Pages_ProductCategory, L("productCategory"));
            ProductCategory.CreateChildPermission(PermissionNames.Pages_ProductCategory_Create, L("Create_Product"));
            ProductCategory.CreateChildPermission(PermissionNames.Pages_ProductCategory_Update, L("Update_Product"));
            ProductCategory.CreateChildPermission(PermissionNames.Pages_ProductCategory_Delete, L("Delete_Product"));

            var sensor = context.CreatePermission(PermissionNames.Pages_Sensor, L("Sensor"));
            sensor.CreateChildPermission(PermissionNames.Pages_Sensor_Create, L("Create_Sensor"));
            sensor.CreateChildPermission(PermissionNames.Pages_Sensor_Update, L("Update_Sensor"));
            sensor.CreateChildPermission(PermissionNames.Pages_Sensor_Delete, L("Delete_Sensor"));

            var application = context.CreatePermission(PermissionNames.Pages_Application, L("Application"));
            application.CreateChildPermission(PermissionNames.Pages_Application_Create, L("Create_Application"));
            application.CreateChildPermission(PermissionNames.Pages_Application_Update, L("Update_Application"));
            application.CreateChildPermission(PermissionNames.Pages_Application_Delete, L("Delete_Application"));

        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, TestDemoConsts.LocalizationSourceName);
        }
    }
}
