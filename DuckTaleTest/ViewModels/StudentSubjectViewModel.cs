using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DuckTaleTest.ViewModels
{
    public class StudentSubjectViewModel
    {
        [Required]
        [Display(Name = "Subject Name")]

        public string SubjectName { get; set; }

    }
}
