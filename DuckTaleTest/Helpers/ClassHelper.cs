using DuckTale.dbmodel.Model;
using DuckTaleTest.EF.UnitsOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DuckTaleTest.Helpers
{
     public class ClassHelper
    {
        private readonly IUnitOfWork repository;


        public ClassHelper(IUnitOfWork _repository)
        {
            repository = _repository;
        }

        public List<StudentSubject> GetSubjectLink(Guid? ItemFK)
        {
            List<StudentSubject> list = new List<StudentSubject>();
            list = repository.studentSubjectService.GetSubjectLink(ItemFK);
            return list;
        }

        public List<StudentInfoLink> GetinfoLink(Guid? ItemFK)
        {
            List<StudentInfoLink> list = new List<StudentInfoLink>();
            list = repository.studentInfoLinkService.GetinfoLink(ItemFK);
            return list;
        }



    }
}
