namespace TestDemo.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Attchedd : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.sensor", "Attachment", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.sensor", "Attachment");
        }
    }
}
