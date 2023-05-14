const key = 'AIzaSyC0rHPdF_ZU-A0EjBj6GMlJGGv7dOLRMQ0'
let listName = 'Дмитрий'
const sheetId = '1Xd6Vt39JaOKj50kvqk5qSiVMH-zSxRSY47qOvLsGTYg'

let url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${listName}?key=${key}`

let main = document.querySelector('main')

async function GetData(){
    let data = await fetch(url)
    let json = await data.json()
    // console.log(json);
    let convertedData =  CovertToObject(json.values)
    console.log(convertedData);
    CreateCard(convertedData[0])
}

GetData()

function CovertToObject(jsonData){
    let formatedList = []

    for(let i = 1; i < jsonData.length; i++){
        let row = jsonData[i]
        let object = {}
        for(let j = 0; j < row.length; j++){
            object[jsonData[0][j]] = row[j]
        }
        formatedList.push(object)
    }
    return formatedList
}

function CreateCard(product){
    let card = `<div class="card">
    <img src="${product.изображение}" alt="">
    <h1>${product.название}</h1>
    <p>${product.описание}</p>
    <p> <span>${product.цена}</span> рублей</p>
    <button>Добавить в корзину</button>
</div>`
    main.innerHTML += card
}
