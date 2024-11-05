export class Validation {
    required(value, messageError, errorId){

        const element = document.getElementById(errorId)
        // TH value lỗi
        if(value.trim() === ''){
            element.innerHTML = messageError
            element.style.display = 'block'
            return false
        }

        element.innerHTML = ''
        element.style.display = 'none'
        return true
    }

    minLength(value,minLength,messageError,errorId){
        const element = document.getElementById(errorId)
        if(value.length < minLength){
            element.innerHTML = messageError
            element.style.display = 'block'
            return false
        }
        element.innerHTML = ''
        element.style.display = 'none'
        return true
    }

    maxLength(value, maxLength, messageError, errorId){
        const element = document.getElementById(errorId)

        if(value.length > maxLength){
            element.innerHTML = messageError
            element.style.display = 'block'
            return false
        }

        element.innerHTML = ''
        element.style.display = 'none'
        return true
    }

    isNumber(value,messageError,errorId){
        const regex = /^[0-9]*$/
        const element = document.getElementById(errorId)

        if(regex.test(value)){ // value thỏa mãn đk của regex
            element.innerHTML = ''
            element.style.display = 'none'
            return true
        }

        element.innerHTML = messageError
        element.style.display = 'block'
        return false
    }

    isUrl(value,messageError,errorId){
        const regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig
        const element = document.getElementById(errorId)

        if(regex.test(value)){ // value thỏa mãn đk của regex
            element.innerHTML = ''
            element.style.display = 'none'
            return true
        }

        element.innerHTML = messageError
        element.style.display = 'block'
        return false
    }
}