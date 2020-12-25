using DuckTale.dbmodel.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DuckTale.dbmodel
{
    public class ApplicationDbContext :DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
		{

		}

        public DbSet<Studentinfo> Studentinfos { get; set; }
        public DbSet<StudentInfoLink> StudentInfoLinks { get; set; }
        public DbSet<StudentSubject> StudentSubjects { get; set; }

    }
}
