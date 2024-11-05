// Dùng để khai báo lớp đối tượng Food
export class Food{
    constructor(_maMon, _tenMon, _loaiMon, _giaMon, _khuyenMai, _tinhTrang, _hinhAnh, _moTa){
        this.maMon = _maMon
        this.tenMon = _tenMon
        this.loaiMon = _loaiMon
        this.giaMon = _giaMon
        this.khuyenMai = _khuyenMai
        this.tinhTrang = _tinhTrang
        this.hinhAnh = _hinhAnh
        this.moTa = _moTa

    }

     // Tính giá khuyến mãi
     tinhGiaKhuyenMai(){
        return this.giaMon * (1 - this.khuyenMai/100)
     }

     // Mapping loại món
     mappingLoaiMon(){
        if(this.loaiMon === 'loai1') return 'Chay'
        if(this.loaiMon === 'loai2') return 'Mặn'

        return 'Vui lòng chọn loại món'
     }

     // if(this.loaiMon === 'loai1'){
        //     return 'Chay'
        // }else if(){
        // }else{
        //     return
        // }
     
     // mapping tình trạng
    mappingTinhTrang(){
        if(this.tinhTrang === '0') return 'Hết'
        if(this.tinhTrang === '1') return 'Còn'

        return 'Vui lòng chọn tình trạng'
    }
}


// 10000
// 10%
// 1000 - 0.1*1000
//1000(1- 10/100)

