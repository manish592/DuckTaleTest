using DuckTale.dbmodel.Model;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static DuckTaleTest.Helpers.EnumHelper;

namespace DuckTaleTest.ViewModels
{
    public class StudentInfoViewModel :BaseModel
    {
        [Required]
        [Display(Name = "First Name")]

        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Last Name")]

        public string LastName { get; set; }

        [Required]
        [Display(Name = "Class")]

        public string Class { get; set; }

        public Guid StudentFk { get; set; }

        public List<StudentSubject> Subjects { get; set; }

        public List<StudentInfoLink> Studentinfolink { get; set; }


        public List<SelectListItem> GetClassName()
        {
            List<SelectListItem> listmasterkey = Enum.GetValues(typeof(EnumClassName)).Cast<EnumClassName>().Select(x => new SelectListItem()
            {
                Text = x.ToString(),
                Value = ((int)x).ToString()
            }).ToList();
            return listmasterkey;
        }



    }
}
