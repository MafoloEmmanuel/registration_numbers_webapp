document.addEventListener('DOMContentLoaded', ()=>{
    var errorMessage = document.querySelector('.warning');
    if(errorMessage.innerHTML !== ""){
        setTimeout(()=>{
            errorMessage.innerHTML = " "
        },5000)
    }
})