using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace BaoHiemYTe.Domain
{
    public class BenhVien
    {
        [Key]
        public int MaBV { get; set; }
        public string TenBV { get; set; }
        
    }
}
