using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DuckTaleTest.ViewModels
{
    public class StudentInfoLinkViewModel
    {
        public Guid StudentInfoFk { get; set; }

        public Guid StudentMarksFk { get; set; }

        public decimal Marks { get; set; }


    }
}
