using DuckTale.dbmodel.Model;
using DuckTaleTest.EF.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DuckTaleTest.EF.Repositories.ModelService
{
    public class StudentSubjectService : Repository<StudentSubject>, IStudentSubject
    {
        private dbmodel.dbcontext _appContext;
        public StudentSubjectService(dbmodel.dbcontext db) : base(db)
        {
            _appContext = (dbmodel.dbcontext)db;
        }

        public List<StudentSubject> GetSubjectLink(Guid? ItemFK)
        {
            var list = _appContext.StudentSubject.Where(d => d.IsActive == true).ToList();
            return list;
        }


    }
}
