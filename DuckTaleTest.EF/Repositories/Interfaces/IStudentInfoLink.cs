using DuckTale.dbmodel.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace DuckTaleTest.EF.Repositories.Interfaces
{
   public interface IStudentInfoLink : IRepository<StudentInfoLink>

    {
        List<StudentSubject> GetSubjectLink(Guid? ItemFK);
    }
}
