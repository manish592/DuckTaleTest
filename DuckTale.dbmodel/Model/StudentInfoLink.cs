using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DuckTale.dbmodel.Model
{
    public class StudentInfoLink
    {
        public Guid StudentInfoFk { get; set; }

        public Guid StudentMarksFk { get; set; }

        public decimal Marks { get; set; }


        [ForeignKey("StudentInfoFk")]
        public virtual Studentinfo Studentinfo { get; set; }

        [ForeignKey("StudentMarksFk")]
        public virtual StudentSubject StudentSubject { get; set; }

    }
}
