const inputs = document.querySelectorAll(".input");
const submit = document.querySelector("form");
const enviar = document.querySelector("button")
let validDate = document.querySelectorAll(".validate");
let labelDate = document.querySelectorAll(".labelDate");

const dia = document.querySelector(".dias");
const mes = document.querySelector(".meses");
const año = document.querySelector(".años");

inputs.forEach(input => {
    input.addEventListener("focus", () => {
        input.style.border = "1px solid #854dff";
    })
    input.addEventListener("blur", () => {
        input.style.border = "1px solid hsl(0, 0%, 86%)";
    })
})
submit.addEventListener("submit", (e) => {
    e.preventDefault();

    const dayInput = document.getElementById("day");
    const mountInput = document.getElementById("mounth");
    const yearInput = document.getElementById("year");

    const fecha = new Date(yearInput.value, mountInput.value-1, dayInput.value);
    const fechaActual = new Date();

    let diferencia = fechaActual-fecha;

    const msPorDia = 1000 * 60 * 60 * 24;
    const msPorMes = msPorDia * 30.44;
    const msPorAño = msPorDia * 365.25;

    let edad = Math.floor(diferencia / msPorAño);
    let meses = Math.floor(diferencia / msPorMes) % 12;
    let dias = Math.floor((diferencia %(msPorDia*(365.25 / 12)))/msPorDia);

    if(dayInput.value.length === 0 || mountInput.value.length === 0 || yearInput.value.length === 0){
        año.textContent = "- -";
        mes.textContent = "- -";
        dia.textContent = "- -";
        inputs.forEach(borders =>{
            borders.style.borderColor = "#ff5757";
        })
        validDate.forEach(label =>{
            label.innerHTML = "This field is required";
        })
        labelDate.forEach(label =>{
            label.style.color = "hsl(0, 100%, 67%)";
        })
        
    }
    let valid1, valid2, valid3 = false;
    if(!(dayInput.value >= 1 && dayInput.value <= 31) && dayInput.value.length !== 0){
        labelsValid(0, "Must be a valid day", "#ff5757", "#ff5757");
    }else if(dayInput.value.length > 0){
        labelsValid(0, "", "#dbdbdb", "#716f6f");
        valid1 = true;
    }

    if(!(mountInput.value >= 1 && mountInput.value < 13) && mountInput.value.length !== 0){
        labelsValid(1, "Must be a valid month", "#ff5757", "#ff5757");
    }else if(mountInput.value.length > 0){
        labelsValid(1, "", "#dbdbdb", "#716f6f");
        valid2 = true;
    } 

    if(yearInput.value > fechaActual.getFullYear()){
        labelsValid(2, "Must be in the past", "#ff5757", "#ff5757");
    }else if(yearInput.value.length > 0){
        labelsValid(2, "", "#dbdbdb", "#716f6f");
        valid3 = true;
    }
    if(!(fecha.getFullYear() === yearInput.value || fecha.getDate() === dayInput.value || fecha.getMonth() === mountInput.value-1) && dayInput.value.length !== 0 && valid1){
        valid1 = false;
        labelsValid(0, "Must be a valid date", "#ff5757", "#ff5757");
        inputs.forEach(borders =>{
            borders.style.borderColor = "#ff5757";
        })
        labelDate.forEach(label =>{
            label.style.color = "hsl(0, 100%, 67%)";
        })
    }
    if(valid1 && valid2 && valid3){
        año.textContent = edad;
        mes.textContent = meses;
        dia.textContent = dias;
    }
    
})

function labelsValid(index, message, color1, color2){
    validDate[index].innerHTML = message;
    labelDate[index].style.color = color2;
    inputs[index].style.borderColor = color1;
}


