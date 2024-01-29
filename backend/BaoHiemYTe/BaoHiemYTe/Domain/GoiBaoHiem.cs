using System.ComponentModel.DataAnnotations;

namespace BaoHiemYTe.Domain
{
    public class GoiBaoHiem
    {
        [Key]
        public int MaGoiBH { get; set; }
        public string TenGoiBH { get; set; }
        public string MotaGoiBH { get; set; }
        public string DoTuoi { get; set; }
        public int Gia { get; set; }
        public int TiLeHoanTien { get; set; }
        //Số năm bạn sẽ được bảo vệ khi mua gói bảo hiểm
        public int ThoiHanBaoVe { get; set; }
        public string TinhTrang { get; set; }
    }
}
