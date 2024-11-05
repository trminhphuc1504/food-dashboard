import {Food} from '../../models/v1/Food.js'

//import ko default
// import {sum} from './demo.js'

// const total = sum (1,2)
// console.log("total: ", total);

//import default
// import logger from './demo.js'
// abc('hahaahaa')
// const cong = logger.cong(1,2)
// console.log("cong: ", cong);
// const tru = logger.tru(4,3)
// console.log("tru: ", tru);

// MVC 
// Models: Thư mục chứa lớp đối tượng

// Controllers: Thư mục chứa logic làm thay đổi UI

// Views: File hiển thị UI (html)


// Xử lý logic hiển thị thông tin từ user nhập vào form

// thẻ button có thuộc tính type: button, submit, reset
// Tất cả những button nằm trong thẻ form type mặc định sẽ là submit
//  Khi click vào button có type submit => tự động trigger một sự kiện onSubmit ở thẻ form


// B1: Lấy thông tin từ form khi click vào btn thêm món

// Dùng để lấy tất cả những thông tin từ những ô input, select, textarea của form
const layThongTinMonAn = ()=>{
    const maMon = document.getElementById('foodID').value
    const tenMon = document.getElementById('tenMon').value
    const loaiMon = document.getElementById('loai').value
    const giaMon = document.getElementById('giaMon').value
    const khuyenMai = document.getElementById('khuyenMai').value
    const tinhTrang = document.getElementById('tinhTrang').value
    const hinhAnh = document.getElementById('hinhMon').value
    const moTa = document.getElementById('moTa').value

    // const food = {
    //     maMon,
    //     tenMon,
    //     loaiMon,
    //     giaMon,
    //     khuyenMai,
    //     tinhTrang,
    //     hinhAnh,
    //     moTa
    // }
    // console.log("food: ", food);

    // Khởi tạo đối tượng từ lớp đối tượng Food
    const food = new Food(maMon,tenMon,loaiMon,giaMon,khuyenMai,tinhTrang,hinhAnh,moTa)
    console.log("food : ", food );


    return food
}

// Bắt sự kiện submit của form khi user click vào button submit
document.getElementById('foodForm').onsubmit = (event)=>{
    // Ngăn sự kiện reload của trình duyệt
    event.preventDefault()

    // gọi hàm layThongTinMonAn lấy giá trị từ form user đã nhập
    const food = layThongTinMonAn()
    // console.log('Form Submit')


     // Hiển thị thông tin
     document.getElementById('imgMonAn').src = food.hinhAnh
     document.getElementById('spMa').innerHTML = food.maMon
     document.getElementById('spTenMon').innerHTML = food.tenMon
     document.getElementById('spLoaiMon').innerHTML = food.mappingLoaiMon()
     document.getElementById('spGia').innerHTML = food.giaMon
     document.getElementById('spKM').innerHTML = food.khuyenMai
     document.getElementById('spGiaKM').innerHTML = food.tinhGiaKhuyenMai()
     document.getElementById('spTT').innerHTML = food.mappingTinhTrang()
     document.getElementById('pMoTa').innerHTML = food.moTa


}


// document.getElementById('btnThemMon').onclick = ()=>{
    // console.log('THÊM MÓN')
// }

// this context (Ngữ cảnh của từ khóa this)
// 1. Trong 1 phương thức this trả về đối tượng chứa phương thức đó 
// 2. Arrow func ko làm thay đổi ngữ cảnh của this => Phương thức đc khởi tạo = arrow function => this = undefined
// => Khi muốn sử dụng this trong phương thức => Phải khởi tạo phương thức = declaration func
// 3. this trong 1 function trả về đối tượng window (Điều kiện: ko sử dụng strict mode)
// 4. this ở trong 1 function trả về undefined (Điều kiện : sử dụng strict mode)
// 5. this ở trong 1 lớp đối tượng sẽ trả về đối tượng đc khởi tạo từ lớp đối tượng đó


const student = {
    name: 'Nguyen Van A',
    age: 20,
    gender: 'Nam',

    getInfor: function(){
        console.log(this)
        console.log(`${this.name} - ${this.age} tuổi - ${this.gender}`)
    },

    getInfor1: () =>{
        console.log(this)
    }
}

student.getInfor()
student.getInfor1()


const demo = function(){
    console.log(this)
}

demo()

// CRUD 