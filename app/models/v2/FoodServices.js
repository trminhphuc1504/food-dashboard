export class FoodServices {
    arrFoods = []
    
    constructor(){}

    // Dùng để thêm món ăn vào trong arrFoods
    addFood(food){
        this.arrFoods.push(food)
    }

    // findIndex
    // Nếu tìm thấy phần tử thỏa mãn đk => trả về index
    // Nếu ko tìm thấy => -1

    // Xóa món ăn
    deleteFood(maMon){
        const index = this.arrFoods.findIndex((item)=> item.maMon === maMon)
        // console.log('index: ', index);

        if(index !== -1){
            // Xóa
            this.arrFoods.splice(index, 1)
        }
    }

    // update Food
    updateFood(food){
        // C1:
        // Tìm kiếm index của  món ăn cần đc cập nhập
        const index = this.arrFoods.findIndex((item)=> item.maMon === food.maMon)
        if(index !== -1){
            this.arrFoods[index] = food
        }
    }
}
