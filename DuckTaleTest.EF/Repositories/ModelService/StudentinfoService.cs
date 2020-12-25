using DuckTale.dbmodel.Model;
using DuckTaleTest.EF.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace DuckTaleTest.EF.Repositories.ModelService
{
    public class StudentinfoService : Repository<Studentinfo>, IStudentinfo
    {
        private dbmodel.dbcontext _appContext;
        public StudentinfoService(dbmodel.dbcontext db) : base(db)
        {
            _appContext = (dbmodel.dbcontext)db;
        }
    }
}
