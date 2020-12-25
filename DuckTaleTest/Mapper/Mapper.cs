
using DuckTaleTest.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DuckTale.dbmodel.Model;

namespace DuckTaleTest.Mapper
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<StudentSubject, StudentSubjectViewModel>()
                .ReverseMap();

            CreateMap<Studentinfo, StudentInfoViewModel>()
               .ReverseMap();

            CreateMap<StudentInfoLink, StudentInfoLinkViewModel>()
                .ReverseMap();

        }

    }
}
