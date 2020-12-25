using DuckTaleTest.EF.Repositories.Interfaces;
using DuckTaleTest.EF.Repositories.ModelService;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DuckTaleTest.EF.UnitsOfWork
{
    public interface IUnitOfWork
    {
        //IStudentinfo Studentinfo { get; }
        //IStudentInfoLink StudentInfoLink { get; }
        //IStudentSubject StudentSubject { get; }

        StudentSubjectService studentSubjectService { get; }

        StudentInfoLinkService studentInfoLinkService { get; }


        StudentinfoService studentinfoService { get; }


        Task<int> SaveChanges();



    }
}
