using System;
using System.Collections.Generic;
using System.Text;

namespace DuckTale.dbmodel.Model
{
    public class Studentinfo : BaseModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Class { get; set; }

        public virtual List<StudentInfoLink> SubjectNamelinks { get; set; }

    }
}
