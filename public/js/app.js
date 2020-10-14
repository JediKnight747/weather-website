const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector("#message-1")
const messageTwo   = document.querySelector("#message-2")
messageOne.textContent = ""
messageTwo.textContent = ""


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'  
    messageTwo.textContent =""
    const location = search.value

    fetch('http://localhost:3000/weather?location='+location).then((response)=>{
        response.json().then((data) => {
                console.log(data)
                if(data.error){
                    messageOne.textContent = data.error
                }
                else{
                    messageOne.textContent=data.location
                    messageTwo.textContent=data.forecast
                }
            })           
        
    })
})