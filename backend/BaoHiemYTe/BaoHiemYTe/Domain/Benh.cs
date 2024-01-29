using System.ComponentModel.DataAnnotations;
namespace BaoHiemYTe.Domain
{
    public class Benh
    {
        [Key]
        public int MaBenh { get; set; }
        public string TenBenh { get; set; }
        public string MoTa { get; set; }
    }
}