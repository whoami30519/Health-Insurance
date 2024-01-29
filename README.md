# bartender_BHYT

## Hướng Dẫn Cài Đặt và Sử Dụng

### Cài Đặt

1. **Clone Repository:**
    ```bash
    git clone https://github.com/VOHUUANHTUAN/bartender_BHYT.git
    cd bartender_BHYT/frontend/bhtruongtho
    ```

2. **Cài Đặt Dependencies:**
    ```bash
    npm install
    ```

### Thư Viện

Để cài đặt các thư viện cần thiết, bạn có thể chạy lệnh sau:

```bash
npm install @mui/material @emotion/react @emotion/styled react-router-dom axios
```


### **Cài Đặt Dữ Liệu Mẫu:**

1. Mở Visual Studio 2022 với bản cài đặt hỗ trợ ASP.NET API.
2. Mở Package Manager Console (PMC) thông qua `View -> Other Windows -> Package Manager Console`.
3. Trong PMC, chạy lệnh `update-database` để áp dụng các thay đổi cơ sở dữ liệu.
4. Sau khi quá trình cập nhật cơ sở dữ liệu hoàn tất, mở Microsoft SQL Server Management Studio (SSMS).
5. Mở tệp `backend/data.sql` trong SSMS và chạy để thêm dữ liệu mẫu vào cơ sở dữ liệu.

Quá trình này sẽ đảm bảo rằng cơ sở dữ liệu của bạn được cập nhật và đã có dữ liệu mẫu sẵn sàng để sử dụng trong ứng dụng.

### **Khởi Chạy API và Frontend:**
Để chạy ứng dụng, bạn cần khởi động API trước, sau đó khởi động frontend.

1. **Khởi Chạy API:**
    - Mở solution trong Visual Studio 2022.
    - Chọn project `bartender_BHYT\backend\BaoHiemYTe.sln` và nhấn F5 để khởi động API.

2. **Khởi Chạy Frontend:**
    - Mở cửa sổ terminal trong thư mục `bartender_BHYT\frontend\bhtruongtho`.
    - Chạy lệnh `npm start` để khởi động frontend.

Sau khi hoàn tất các bước trên, ứng dụng của bạn sẽ khởi chạy và sẵn sàng sử dụng.
