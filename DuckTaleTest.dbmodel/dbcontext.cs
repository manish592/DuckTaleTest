using DuckTale.dbmodel.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DuckTaleTest.dbmodel
{
    public class dbcontext  : DbContext
    {

        public dbcontext(DbContextOptions<dbcontext> options) : base(options)
        {

        }

        public DbSet<Studentinfo> Studentinfos { get; set; }
        public DbSet<StudentInfoLink> StudentInfoLink { get; set; }
        public DbSet<StudentSubject> StudentSubject { get; set; }


    }
}
