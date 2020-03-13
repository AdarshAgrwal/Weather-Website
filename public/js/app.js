const search = document.querySelector('input')
const message1 = document.querySelector('#error')
const message2 = document.querySelector('#data')


document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault()

    message1.textContent= 'Loading.....'
    message2.textContent= ''

    fetch('/weather?address='+search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            return ( message1.innerHTML=data.error)
        }
        message1.innerHTML='The Desired location was '+data.location
        message2.innerHTML=data.forecast
    })
})
})