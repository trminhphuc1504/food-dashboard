import {Food} from '../../models/v2/Food.js'
import {FoodServices} from '../../models/v2/FoodServices.js'
import { Validation } from '../../models/v2/Validation.js';


// Tạo 1 đối tượng foodServices
const foodServices = new FoodServices()

// Tạo 1 đối tượng validation
const validation = new Validation()


console.log('foodServices: ', foodServices);

// Chức năng thêm món ăn

// Lấy thông tin từ form
const layThongTinMonAn = () => {
    // DOM tới nhiều element
    const elements = document.querySelectorAll('#foodForm input, #foodForm select, #foodForm textarea')
    // console.log('elements: ', elements);

    let monAn = {}
    // duyệt elements
    elements.forEach((element)=>{
        const {id, value} = element
        monAn[id] = value
    })
    
    console.log('monAn: ', monAn);

    // Khởi tạo 1 đối tượng food từ Food
    return new Food(monAn.maMon, monAn.tenMon, monAn.loai, monAn.giaMon, monAn.khuyenMai, monAn.tinhTrang, monAn.hinhMon, monAn.moTa )
}

const renderFoods = (arrFoods = foodServices.arrFoods) => {
    let contentHtml = ''
    arrFoods.forEach((food)=>{
        contentHtml += `
            <tr>
                <td>${food.maMon}</td>
                <td>${food.tenMon}</td>
                <td>${food.mappingLoaiMon()}</td>
                <td>${food.giaMon}</td>
                <td>${food.khuyenMai}</td>
                <td>${food.tinhGiaKhuyenMai()}</td>
                <td>${food.mappingTinhTrang()}</td>
                <td>
                    <button
                        class="btn btn-success"
                        data-toggle="modal" 
                        data-target="#exampleModal"
                        onclick="editFood('${food.maMon}')"
                    >
                        Edit
                    </button>

                    <button 
                        class="btn btn-danger" 
                        onclick="deleteFood('${food.maMon}')"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        `
    })
    document.getElementById('tbodyFood').innerHTML = contentHtml
}


// Lưu local storage
const setLocalStorage = ()=>{
    localStorage.setItem('arrFoods', JSON.stringify(foodServices.arrFoods))
}

// render local storage
const renderLocaleStorage = ()=>{
    let arrFoods = localStorage.getItem('arrFoods')
    if(!arrFoods) return

    arrFoods = JSON.parse(arrFoods)

    // khởi tạo lại đối tượng food để lấy lại phương thức ban đầu
    const newArrFoods = arrFoods.map((monAn)=>{
        return new Food(monAn.maMon, monAn.tenMon, monAn.loaiMon, monAn.giaMon, monAn.khuyenMai, monAn.tinhTrang, monAn.hinhAnh, monAn.moTa )
    })
    
    // Đưa món ăn từ local storage vào trong danh sách món ăn của foodService
    foodServices.arrFoods = newArrFoods

    // Hiển thị danh sách món ăn ra UI
    renderFoods(newArrFoods)
}
renderLocaleStorage()

// Xử lý logic khi user click bnt Thêm
document.getElementById('btnThem').onclick = ()=>{
    const formElement = document.getElementById('foodForm')
    formElement.reset()

     // Ẩn btn Cập nhật
     document.getElementById('btnCapNhat').style.display = 'none'

    // Hiện btn Thêm
    document.getElementById('btnThemMon').style.display = 'inline-block'

     // mở lại ô input mã món
     document.getElementById('maMon').disabled = false

    // Thay đổi title
    document.getElementById('exampleModalLabel').innerHTML = 'Thêm món ăn'
}


document.getElementById('foodForm').onsubmit = (ev)=>{
    // chặn trình duyệt reload
    ev.preventDefault()

    const formElement = document.getElementById('foodForm')

    // Kiểm tra xem action là thêm mới hay chỉnh sửa
    const action = formElement.getAttribute('data-action')

    // Lấy thông tin món ăn
    const food  = layThongTinMonAn()
    console.log('food: ', food);

    // Validation (Kiểm tra dữ liệu đầu vào)
    // if(food.maMon ===''){
    //     document.getElementById('invalidID').innerHTML = 'Vui lòng nhập mã món!'
    // }

    let isValid = true
    // isValid = isValid && false
    isValid &= validation.required(food.maMon,"Vui lòng nhập mã món!",'invalidID') && validation.minLength(food.maMon,4,"Mã món phải từ 4 ký tự!",'invalidID') && validation.maxLength(food.maMon, 10, 'Mã món chỉ tối đa 10 ký tự','invalidID') && validation.isNumber(food.maMon,'Mã món phải là số!', 'invalidID')
    isValid &= validation.required(food.tenMon,"Vui lòng nhập tên món!",'invalidTen')
    isValid &= validation.isUrl(food.hinhAnh,'Hình ảnh ko đúng định dạng','invalidHinhAnh')
    if(!isValid) return

    if(action !== 'edit'){
        // Thêm food vào trong arrFoods
        foodServices.addFood(food)
    }

    if(action === 'edit'){
        // Cập nhập món ăn
        foodServices.updateFood(food)
    }

    // Xóa thuộc tính data-action của thẻ form
    formElement.removeAttribute('data-action')

    // reset form (Xóa toàn bộ giá trị của input, select ở trong form)
    formElement.reset()

    // Đóng modal
    // document.getElementById('btnClose').click()

    // Lưu món ăn vào local storage
    setLocalStorage()

    // Hiển thị danh sách món ăn ra UI
    renderFoods()
}

// Xóa món ăn
window.deleteFood = (maMon)=>{
    console.log('maMon: ', maMon);

    // Xóa món ăn khỏi arrFoods
    foodServices.deleteFood(maMon)

    console.log(foodServices.arrFoods)

    // Cập nhật lại UI sau khi xóa món ăn
    renderFoods()

    // Lưu lại danh sách món ăn sau khi xóa
    setLocalStorage()
}

// Chức năng edit
window.editFood = (maMon)=>{

    // Tìm kiếm món ăn đang cần edit
    const foodEdit = foodServices.arrFoods.find(item => item.maMon === maMon)

    // Thêm 1 thuộc tính data-action vào thẻ form để phân biệt giữa thêm mới và cập nhât
    document.getElementById('foodForm').setAttribute('data-action', 'edit')

    // disbaled ô input mã món
    document.getElementById('maMon').disabled = true

    // Hiển thị btn Cập nhật
    document.getElementById('btnCapNhat').style.display = 'inline-block'

    // Ẩn btn Thêm
    document.getElementById('btnThemMon').style.display = 'none'

    // Thay đổi title
    document.getElementById('exampleModalLabel').innerHTML = 'Cập nhập món ăn'

    // Đẩy thông tin món ăn cần edit vào form
    const elements = document.querySelectorAll('#foodForm input, #foodForm select, #foodForm textarea')

    elements.forEach(element => {
        const {id} = element
        
        if(id === 'loai'){
            element.value = foodEdit.loaiMon
            return
        }

        if(id === 'hinhMon'){
            element.value = foodEdit.hinhAnh
            return
        }

        element.value = foodEdit[id]
    })
}




// LocaleStorage

// Lưu 
// Ko lưu đc phương thức
localStorage.setItem('Name', 'Nguyen Van A')

// lưu object, array
localStorage.setItem('foods', JSON.stringify([{name: 1, age: 20}]))

// Xóa 
localStorage.removeItem('Name')
// localStorage.removeItem('arrFoods')

// Đọc giá trị từ locale storage
// Nếu cái key ko đúng => trả về null
const foods = JSON.parse(localStorage.getItem("arrFoods"))
