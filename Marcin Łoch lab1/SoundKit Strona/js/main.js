document.addEventListener('DOMContentLoaded', appStart)

const sounds = {
    55: "boom",
    56: "clap",
    57: "hihat",
    52: "kick",
    53: "openhat",
    54: "ride",
    49: "snare",
    50: "tink",
    51: "tom",
}
const chanel1 = []
const chanel2 = []
const chanel3 = []
const chanel4 = []

let isRec1 = false;
let isRec2 = false;
let isRec3 = false;
let isRec4 = false;

let recstartTime = 0;

function appStart() {
    window.addEventListener('keypress', playSound)
}

function playAudio(ktory) {
    switch (ktory){
        case 1:  
            chanel1.forEach(sound => {
                setTimeout(() => {
                    const audioDOM = document.querySelector(`#${sound.name}`)
                    audioDOM.currentTime = 0
                    audioDOM.play()
                }, sound.time);
            })
        break
        case 2:  
            chanel2.forEach(sound => {
                setTimeout(() => {
                    const audioDOM = document.querySelector(`#${sound.name}`)
                    audioDOM.currentTime = 0
                    audioDOM.play()
                }, sound.time);
            })
        break
        case 3:  
            chanel3.forEach(sound => {
                setTimeout(() => {
                    const audioDOM = document.querySelector(`#${sound.name}`)
                    audioDOM.currentTime = 0
                    audioDOM.play()
                }, sound.time);
            })
        break
        case 4:  
            chanel4.forEach(sound => {
                setTimeout(() => {
                    const audioDOM = document.querySelector(`#${sound.name}`)
                    audioDOM.currentTime = 0
                    audioDOM.play()
                }, sound.time);
            })
        break

    }
    
}

function recAudio(whitch) {
    switch(whitch){
        case '#img_record1':
            isRec1 = !isRec1
            break
        case '#img_record2':
            isRec2 = !isRec2
            break
        case '#img_record3':
            isRec3 = !isRec3
            break
        case '#img_record4':
            isRec4 = !isRec4
            break
    }
    recstartTime = Date.now()
    document.querySelector(`#img_record1`).src= isRec1?"svg/Record-STOP.svg" : "svg/Record.svg"
    document.querySelector(`#img_record2`).src = isRec2? "svg/Record-STOP.svg" : "svg/Record.svg"
    document.querySelector(`#img_record3`).src = isRec3? "svg/Record-STOP.svg" : "svg/Record.svg"
    document.querySelector(`#img_record4`).src = isRec4? "svg/Record-STOP.svg" : "svg/Record.svg"

}


function playSound(e) {
    if (!sounds[e.charCode]) {
        return
    }
    const soundName = sounds[e.charCode]
    const audioDOM = document.querySelector(`#${soundName}`)
    audioDOM.play()

    if (isRec1) {
        chanel1.push({
            name: soundName,
            time: Date.now() - recstartTime
        })
    }
    if (isRec2){
        chanel2.push({
            name: soundName,
            time: Date.now() - recstartTime
        })
    }
    if (isRec3){
        chanel3.push({
            name: soundName,
            time: Date.now() - recstartTime
        })
    }
    if (isRec4){
        chanel4.push({
            name: soundName,
            time: Date.now() - recstartTime
        })
    }
}