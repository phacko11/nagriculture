import os
import csv
import requests
from urllib.parse import urlparse

# Mảng dữ liệu bạn đã cung cấp
REPORTS_DATA = [{
    "actor": "Ngo Chien Thang",
    "date": "1 Aug 2025",
    "title": "Factor Report: Low Volatility",
    "content": "Report on the Low Volatility factor for third quarter of 2025, covering VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/08.2025/low_volatility_08.2025.png",
    "link": "https://static.miquant.vn/factors/08.2025/LOW_VOLATILITY_FACTOR_08.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Aug 2025",
    "title": "Factor Report: Quality",
    "content": "Report on the Quality factor for third quarter of 2025, analyzing profitability, earnings stability and financial strength across VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/08.2025/quality_08.2025.png",
    "link": "https://static.miquant.vn/factors/08.2025/QUALITY_FACTOR_08.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Aug 2025",
    "title": "Factor Report: Value",
    "content": "Report on the Value factor for third quarter of 2025, focusing on valuation metrics such as P/E, P/B, and EV/EBITDA across major Vietnamese indices.",
    "image": "https://static.miquant.vn/factors/08.2025/value_08.2025.png",
    "link": "https://static.miquant.vn/factors/08.2025/VALUE_FACTOR_08.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Aug 2025",
    "title": "Factor Report: Momentum",
    "content": "Report on the Momentum factor for third quarter of 2025, tracking price trends and relative strength indicators across VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/08.2025/momentum_08.2025.png",
    "link": "https://static.miquant.vn/factors/08.2025/MOMENTUM_FACTOR_08.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Aug 2025",
    "title": "Factor Report: Low Beta",
    "content": "Report on the Low Beta factor for third quarter of 2025, identifying stocks with lower sensitivity to market movements in the Vietnamese equity market.",
    "image": "https://static.miquant.vn/factors/08.2025/low_beta_08.2025.png",
    "link": "https://static.miquant.vn/factors/08.2025/LOW_BETA_FACTOR_08.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Jul 2025",
    "title": "Factor Report: Low Volatility",
    "content": "Report on the Low Volatility factor for second quarter of 2025, covering VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/07.2025/low_volatility_07.2025.png",
    "link": "https://static.miquant.vn/factors/07.2025/LOW_VOLATILITY_FACTOR_07.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Jul 2025",
    "title": "Factor Report: Quality",
    "content": "Report on the Quality factor for second quarter of 2025, analyzing profitability, earnings stability and financial strength across VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/07.2025/quality_07.2025.png",
    "link": "https://static.miquant.vn/factors/07.2025/QUALITY_FACTOR_07.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Jul 2025",
    "title": "Factor Report: Value",
    "content": "Report on the Value factor for second quarter of 2025, focusing on valuation metrics such as P/E, P/B, and EV/EBITDA across major Vietnamese indices.",
    "image": "https://static.miquant.vn/factors/07.2025/value_07.2025.png",
    "link": "https://static.miquant.vn/factors/07.2025/VALUE_FACTOR_07.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Jul 2025",
    "title": "Factor Report: Momentum",
    "content": "Report on the Momentum factor for second quarter of 2025, tracking price trends and relative strength indicators across VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/07.2025/momentum_07.2025.png",
    "link": "https://static.miquant.vn/factors/07.2025/MOMENTUM_FACTOR_07.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Jul 2025",
    "title": "Factor Report: Low Beta",
    "content": "Report on the Low Beta factor for second quarter of 2025, identifying stocks with lower sensitivity to market movements in the Vietnamese equity market.",
    "image": "https://static.miquant.vn/factors/07.2025/low_beta_07.2025.png",
    "link": "https://static.miquant.vn/factors/07.2025/LOW_BETA_FACTOR_07.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Jun 2025",
    "title": "Factor Report: Low Volatility",
    "content": "Report on the Low Volatility factor for second quarter of 2025, covering VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/06.2025/low_volatility_06.2025.png",
    "link": "https://static.miquant.vn/factors/06.2025/LOW_VOLATILITY_FACTOR_06.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Jun 2025",
    "title": "Factor Report: Quality",
    "content": "Report on the Quality factor for second quarter of 2025, analyzing profitability, earnings stability and financial strength across VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/06.2025/quality_06.2025.png",
    "link": "https://static.miquant.vn/factors/06.2025/QUALITY_FACTOR_06.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Jun 2025",
    "title": "Factor Report: Value",
    "content": "Report on the Value factor for second quarter of 2025, focusing on valuation metrics such as P/E, P/B, and EV/EBITDA across major Vietnamese indices.",
    "image": "https://static.miquant.vn/factors/06.2025/value_06.2025.png",
    "link": "https://static.miquant.vn/factors/06.2025/VALUE_FACTOR_06.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Jun 2025",
    "title": "Factor Report: Momentum",
    "content": "Report on the Momentum factor for second quarter of 2025, tracking price trends and relative strength indicators across VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/06.2025/momentum_06.2025.png",
    "link": "https://static.miquant.vn/factors/06.2025/MOMENTUM_FACTOR_06.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Jun 2025",
    "title": "Factor Report: Low Beta",
    "content": "Report on the Low Beta factor for second quarter of 2025, identifying stocks with lower sensitivity to market movements in the Vietnamese equity market.",
    "image": "https://static.miquant.vn/factors/06.2025/low_beta_06.2025.png",
    "link": "https://static.miquant.vn/factors/06.2025/LOW_BETA_FACTOR_06.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 May 2025",
    "title": "Factor Report: Low Volatility",
    "content": "Report on the Low Volatility factor for first quarter of 2025, covering VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/05.2025/low_volatility_05.2025.png",
    "link": "https://static.miquant.vn/factors/05.2025/LOW_VOLATILITY_FACTOR_05.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 May 2025",
    "title": "Factor Report: Quality",
    "content": "Report on the Quality factor for the first quarter of 2025, analyzing profitability, earnings stability and financial strength across VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/05.2025/quality_05.2025.png",
    "link": "https://static.miquant.vn/factors/05.2025/QUALITY_FACTOR_05.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 May 2025",
    "title": "Factor Report: Value",
    "content": "Report on the Value factor for the first quarter of 2025, focusing on valuation metrics such as P/E, P/B, and EV/EBITDA across major Vietnamese indices.",
    "image": "https://static.miquant.vn/factors/05.2025/value_05.2025.png",
    "link": "https://static.miquant.vn/factors/05.2025/VALUE_FACTOR_05.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 May 2025",
    "title": "Factor Report: Momentum",
    "content": "Report on the Momentum factor for the first quarter of 2025, tracking price trends and relative strength indicators across VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/05.2025/momentum_05.2025.png",
    "link": "https://static.miquant.vn/factors/05.2025/MOMENTUM_FACTOR_05.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 May 2025",
    "title": "Factor Report: Low Beta",
    "content": "Report on the Low Beta factor for the first quarter of 2025, identifying stocks with lower sensitivity to market movements in the Vietnamese equity market.",
    "image": "https://static.miquant.vn/factors/05.2025/low_beta_05.2025.png",
    "link": "https://static.miquant.vn/factors/05.2025/LOW_BETA_FACTOR_05.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Apr 2025",
    "title": "Factor Report: Quality",
    "content": "Report on the Quality factor for first quarter of 2025, covering VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/cover/factor-report-quality.png",
    "link": "https://static.miquant.vn/factors/QUALITY_FACTOR_04.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Apr 2025",
    "title": "Factor Report: Low Beta",
    "content": "Report on the Low Beta factor for first quarter of 2025, covering VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/cover/factor-report-low-beta.png",
    "link": "https://static.miquant.vn/factors/LOW_BETA_FACTOR_04.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Apr 2025",
    "title": "Factor Report: Low Volatility",
    "content": "Report on the Low Volatility factor for first quarter of 2025, covering VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/cover/factor-report-low-volatility.png",
    "link": "https://static.miquant.vn/factors/LOW_VOLATILITY_FACTOR_04.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Ngo Chien Thang",
    "date": "1 Apr 2025",
    "title": "Factor Report: Momentum",
    "content": "Report on the Momentum factor for first quarter of 2025, covering VN30, VN100 and HOSE.",
    "image": "https://static.miquant.vn/factors/cover/factor-report-momentum.png",
    "link": "https://static.miquant.vn/factors/MOMENTUM_FACTOR_04.2025.pdf",
    "tags": ["Factor", "Research"]
}, {
    "actor": "Vo Pham Anh Khoa",
    "date": "1 Mar 2025",
    "title": "Fama-French 5 Factor Model",
    "content": "Providing Vietnam’s first universal and free dataset on the Fama-French 5 factor model.",
    "image": "https://static.miquant.vn/academic-research/fama-french/cover/fama-french-5-factors.png",
    "link": "https://static.miquant.vn/academic-research/fama-french/Miquant_Fama_French_Research_Note_5F_update.pdf",
    "tags": ["Academic", "Research"]
}, {
    "actor": "Vo Pham Anh Khoa",
    "date": "1 Mar 2025 ",
    "title": "Fama-French 3 Factor Model",
    "content": "Providing Vietnam’s first universal and free dataset on the Fama-French 3 factor model.",
    "image": "https://static.miquant.vn/academic-research/fama-french/cover/fama-french-3-factors.png",
    "link": "https://static.miquant.vn/academic-research/fama-french/Miquant_Fama_French_Research_Note_3F_update.pdf",
    "tags": ["Academic", "Research"]
}, {
    "actor": "Nguyen Minh Tri",
    "date": "1 Mar 2025",
    "title": "Vietnam GDP Nowcasting (Part 2)",
    "content": "Provide GDP Nowcasting model with construction and applications in Vietnam.",
    "image": "https://static.miquant.vn/academic-research/nowcast/cover/GDP-nowcast-p2.png",
    "link": "https://static.miquant.vn/academic-research/nowcast/Nowcast - Research Note 2.pdf",
    "tags": ["Academic", "Research"]
}, {
    "actor": "Nguyen Minh Tri",
    "date": "1 Mar 2025",
    "title": "Vietnam GDP Nowcasting (Part 1)",
    "content": "Provide GDP Nowcasting model with construction and applications in Vietnam.",
    "image": "https://static.miquant.vn/academic-research/nowcast/cover/GDP-nowcast-p1.png",
    "link": "https://static.miquant.vn/academic-research/nowcast/Nowcast - Research Note 1.pdf",
    "tags": ["Academic", "Research"]
}]


def save_to_csv(data, filename="factor_reports.csv"):
    """Lưu dữ liệu vào một tệp CSV."""
    headers = ["actor", "date", "title", "content", "image", "link", "tags"]
    
    # Chuyển đổi danh sách tags thành chuỗi
    processed_data = []
    for row in data:
        new_row = row.copy()
        if isinstance(new_row.get('tags'), list):
            new_row['tags'] = ", ".join(new_row['tags'])
        processed_data.append(new_row)

    with open(filename, mode='w', encoding='utf-8', newline='') as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=headers)
        writer.writeheader()
        writer.writerows(processed_data)
    print(f"Dữ liệu đã được lưu thành công vào tệp '{filename}'")

def download_file(url, folder_path):
    """Tải một tệp từ URL và lưu vào thư mục được chỉ định."""
    if not url:
        return

    # Tạo thư mục nếu nó chưa tồn tại
    os.makedirs(folder_path, exist_ok=True)
    
    try:
        # Lấy tên tệp từ URL
        filename = os.path.basename(urlparse(url).path)
        local_filepath = os.path.join(folder_path, filename)

        # Gửi yêu cầu GET để tải tệp
        print(f"Đang tải xuống: {url}...")
        response = requests.get(url, stream=True, timeout=30)
        response.raise_for_status()  # Báo lỗi nếu yêu cầu không thành công

        # Ghi nội dung vào tệp
        with open(local_filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        print(f"Đã lưu thành công vào: {local_filepath}")

    except requests.exceptions.RequestException as e:
        print(f"Lỗi khi tải {url}: {e}")

def main():
    """Hàm chính để thực hiện tất cả các tác vụ."""
    # 1. Lưu dữ liệu vào CSV
    save_to_csv(REPORTS_DATA)

    # 2. Tải tất cả các hình ảnh và tệp PDF
    images_folder = 'images'
    pdfs_folder = 'pdfs'
    
    for report in REPORTS_DATA:
        download_file(report.get('image'), images_folder)
        download_file(report.get('link'), pdfs_folder)
        
    print("\nHoàn tất tất cả các tác vụ!")

if __name__ == "__main__":
    main()
