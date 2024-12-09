let rejestracjaNazwa = document.getElementById('rejestracja')
let punkty = document.querySelectorAll('li')
const btn = document.getElementById('btn')

function randomProperty(obj) {
    const keys = Object.keys(obj)
    const randomIndex = Math.floor(Math.random() * keys.length)
    const randomKey = keys[randomIndex]
    return { key: randomKey, value: obj[randomKey] }
}

function getWrongProperties(obj, rightObj) {
    let arr = []
    while (arr.length != 3) {
        const keys = Object.keys(obj)
        const randomIndex = Math.floor(Math.random() * keys.length)
        const randomKey = keys[randomIndex]
        if (randomKey != rightObj.key) {
            arr.push({ key: randomKey, value: obj[randomKey] })
        }
    }
    return arr
}

function wylosujRejestrace() {
    fetch('rejestracje.json')
        .then(response => response.json())
        .then(data => {
            const dane = data
            rightObj = randomProperty(dane)
            wrongObj = getWrongProperties(dane, rightObj)
            rejestracjaNazwa.innerHTML = rightObj.key

            const prawidlowyIndex = Math.floor(Math.random() * 4)
            punkty[prawidlowyIndex].innerHTML = rightObj.value

            const emptyListItems = Array.from(document.querySelectorAll('li')).filter(li => !li.textContent.trim());

            for (let i = 0; i < emptyListItems.length; i++) {
                const element = emptyListItems[i];
                element.innerHTML = wrongObj[i].value
            }
        })
}


punkty.forEach(element => {
    element.addEventListener('click', () => {
        if (element.innerHTML == rightObj.value) {
            element.classList.remove('border-primary')
            element.classList.add('dobry')
            element.classList.add('border-success')
        } else {
            element.classList.remove('border-primary')
            element.classList.add('zly')
            element.classList.add('border-danger')
        }
    })
});
wylosujRejestrace()


btn.addEventListener('click', () => {
    punkty.forEach(element => {
        element.classList.remove('dobry')
        element.classList.remove('border-success')
        element.classList.remove('zly')
        element.classList.remove('border-danger')
        element.classList.add('border-primary')
        element.innerHTML = ""
    });
    wylosujRejestrace()
})

