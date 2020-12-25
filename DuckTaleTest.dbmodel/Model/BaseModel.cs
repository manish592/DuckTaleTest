using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DuckTale.dbmodel.Model
{
    public class BaseModel : BaseModelDate
    {
        public bool IsActive { get; set; } = true;

    }
    public abstract class BaseModelId
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
    }

    public abstract class BaseModelDate : BaseModelId
    {
        public DateTime CreatedOn { get; set; } = DateTime.Now;

        public DateTime ModifyOn { get; set; } = DateTime.Now;
    }

}
