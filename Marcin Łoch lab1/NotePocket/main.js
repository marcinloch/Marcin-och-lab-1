let title
let content
let date
let color
let note
let pinned
let tag_notes
let first_time = true;
let kolejnosc

if (localStorage.getItem(`kolejnosc`) == null) {
    kolejnosc = 0
}
else {
    kolejnosc = parseInt(localStorage.getItem(`kolejnosc`), 10)
    console.log(kolejnosc)
}
let oryginal_order = 0
let pinned_order = 0
let text
let text2
let text3

let sek_note



document.getElementById("add_note").addEventListener("click", Create_note)



class Memo {
    constructor(title, content, color, pinned) {
        this.title = title
        this.content = content
        this.color = color
        this.pinned = pinned
        this.date = Date.now()
        this.oryginal_order = (this.date) * (-1) + 1553000000000
        this.pinned_order = this.oryginal_order * 2;
    }
}

load_notes()

function Create_note() {
    title = document.getElementById("add_title")
    content = document.getElementById("add_contenet")
    color = document.getElementById("note_color")
    if (document.getElementById("pinned").checked == true)
        pinned = true
    else
        pinned = false

    note = new Memo(title, content, color, pinned)

    View()
}

function View() {

    console.log(kolejnosc)
    kiedy = new Date(note.date)
    if (first_time && kolejnosc == 0) {

        kolejnosc++
        localStorage.setItem(`kolejnosc`, kolejnosc)
        first_time = false
        text2 =
            `
        <div id="div${localStorage.getItem(`kolejnosc`)}" style="order:${note.pinned ? note.pinned_order : note.oryginal_order};background-color: ${note.color.value}; 
        ${note.pinned ? `border:  10px solid 	#FF0000; border-radius: 6px;` : ``}">
                <p id="date">${kiedy.toLocaleDateString()}  ${kiedy.toLocaleTimeString()}</p>
                <p id="view_title">${note.title.value}</p>
                <p id="view_content">${note.content.value}</p>
                <div id="view_bottom_menu" style="background-color: ${note.color.value};">
                    <div style="padding: 0;margin: 0;background-color: ${note.color.value};"><span>Pinned:</span><input type="checkbox" id="view_pinned" ${note.pinned ? `checked` : ``} disabled></div>
                    <button id="view_delete" onclick="delete_note(${localStorage.getItem(`kolejnosc`)})">Delete</button>
                </div>
        </div>   
        `
        console.log(text2)
        document.getElementById("notes").innerHTML = text2

        localStorage.setItem(`${'notatki' + localStorage.getItem(`kolejnosc`)}`, text2)
    }
    else {
        kolejnosc++
        localStorage.setItem(`kolejnosc`, kolejnosc)
        let min = document.getElementById(`${"div" + oryginal_order + 1}`)
        sek_note = document.createElement('div');
        sek_note.id = `div${localStorage.getItem(`kolejnosc`)}`
        localStorage.setItem(`${'id' + localStorage.getItem(`kolejnosc`)}`, sek_note.id)

        sek_note.style = `order:${note.pinned ? note.pinned_order : note.oryginal_order};background-color: ${note.color.value}; ${note.pinned ? `border:  10px solid 	#FF0000; border-radius: 6px;` : ``}`
        localStorage.setItem(`${'style' + localStorage.getItem(`kolejnosc`)}`, `order:${note.pinned ? note.pinned_order : note.oryginal_order};background-color: ${note.color.value};${note.pinned ? `border:10px solid #FF0000; border-radius: 6px;` : ``}`)

        text =
            `
            <p id="date">${kiedy.toLocaleDateString()}  ${kiedy.toLocaleTimeString()}</p>
            <p id="view_title">${note.title.value}</p>
            <p id="view_content">${note.content.value}</p>
            <div id="view_bottom_menu" style="background-color: ${note.color.value};">
                <div style="padding: 0;margin: 0;background-color: ${note.color.value};"><span>Pinned:</span><input type="checkbox" id="view_pinned"  ${note.pinned ? `checked` : ``} disabled > </div>
                <button id="view_delete" onclick="delete_note(${localStorage.getItem(`kolejnosc`)})">Delete</button>
            </div>
        </div>
        `
        text2 += text
        sek_note.innerHTML = text
        localStorage.setItem(`${'notatki' + localStorage.getItem(`kolejnosc`)}`, text)

        document.getElementById('notes').insertBefore(sek_note, min)
    }
}

function load_notes() {
        for (let i = 1; i <= localStorage.getItem(`kolejnosc`); i++) {
            if (localStorage.getItem(`${'notatki' + i}`) != null) {
                if (i == 1)
                    document.getElementById("notes").innerHTML = localStorage.getItem(`${'notatki' + i}`)
                else {
                    text3 = document.createElement(`div`);
                    text3.id = localStorage.getItem(`${'id' + i}`)
                    text3.style = localStorage.getItem(`${'style' + i}`)
                    text3.innerHTML = localStorage.getItem(`${'notatki' + i}`)
                    document.getElementById('notes').insertBefore(text3, document.getElementById(`${'notatki' + i}`))
                }
            }
        }
    
}

function delete_note(kolejnosc) {
    console.log(kolejnosc.toString())
    let div = document.querySelector(`${'#div' + kolejnosc}`)
    div.remove()
    localStorage.removeItem(`${'notatki' + kolejnosc}`)
    localStorage.removeItem(`${'id' + kolejnosc}`)
    localStorage.removeItem(`${'style' + kolejnosc}`)

}
