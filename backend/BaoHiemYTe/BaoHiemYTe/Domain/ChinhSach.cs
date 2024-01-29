using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaoHiemYTe.Domain
{
    public class ChinhSach
    {
        public int MaGoiBH { get; set; }

        public int MaBenh { get; set; }

        // Khai báo quan hệ với GoiBaoHiem và Benh
        [ForeignKey("MaGoiBH")]
        public GoiBaoHiem GoiBaoHiem { get; set; }

        [ForeignKey("MaBenh")]
        public Benh Benh { get; set; }
    }
}
