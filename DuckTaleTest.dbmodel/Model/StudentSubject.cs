using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DuckTale.dbmodel.Model
{
    public class StudentSubject :BaseModel
    {
        public string SubjectName { get; set; }
    }
}
