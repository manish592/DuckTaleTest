using DuckTale.dbmodel.Model;
using DuckTaleTest.EF.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DuckTaleTest.EF.Repositories.ModelService
{
    public class StudentInfoLinkService : Repository<StudentInfoLink>, IStudentInfoLink
    {
        private dbmodel.dbcontext _appContext;
        public StudentInfoLinkService(dbmodel.dbcontext db) : base(db)
        {
            _appContext = (dbmodel.dbcontext)db;
        }

        public List<StudentSubject> GetSubjectLink(Guid? ItemFK)
        {
            var list = _appContext.StudentSubject.Where(d => d.IsActive == true).ToList();
            return list;
        }

        public List<StudentInfoLink> GetinfoLink(Guid? ItemFK)
        {
            var list = _appContext.StudentInfoLink.Where(d => d.IsActive == true && d.Id==ItemFK).ToList();
            return list;
        }
    }
}
