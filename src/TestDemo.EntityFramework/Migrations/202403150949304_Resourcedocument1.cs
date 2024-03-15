namespace TestDemo.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Resourcedocument1 : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.resourcess", newName: "resourcedocument");
        }
        
        public override void Down()
        {
            RenameTable(name: "dbo.resourcedocument", newName: "resourcess");
        }
    }
}
