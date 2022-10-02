let number
const counter = document.querySelector("#counter")
const minus = document.querySelector("#minus")
const plus = document.querySelector("#plus")
const heart = document.querySelector("#heart")
const likeList = document.querySelector("body > ul")
let paused = false
const pause = document.querySelector("#pause")
const reset = document.querySelector("#reset")
const form = document.getElementById("comment-form")
const list = document.getElementById("list")

minus.addEventListener("click", minuser)
plus.addEventListener("click", counting)
heart.addEventListener("click", liker)
pause.addEventListener("click", pauser)
reset.addEventListener("click", reseter)
form.addEventListener("submit", e => submitter(e))

let interval = setInterval(counting, 1000)

function counting() {
    number = parseInt(counter.innerText, 10)
    number++
    counter.innerText = number
}

function minuser() {
    number--
    counter.innerText = number
}

function liker() {
    // get the number liked
    const likedNumber = document.getElementById(`${number}`)
    if (likedNumber) {
        let spanNumber = parseInt(likedNumber.querySelector("span").innerText, 10)
        spanNumber++
        likedNumber.innerHTML = `${number} has been liked <span>${spanNumber}</span> times!`
    }
    else {
    const li = document.createElement("li")
    li.id = number
    li.innerHTML = `${number} has been liked <span>1</span> time!`
    likeList.append(li)
    }
    // append number liked into list, providing an id for each liked number
}

function pauser(){
    if (!paused) {
        paused = !paused
        clearInterval(interval)
        disabler()
        pause.innerText = "resume"

    }
    else {
        paused = !paused
        interval = setInterval(counting, 1000)
        disabler()
        pause.innerText = "pause"
    }
}

function disabler() {
    minus.disabled = paused
    plus.disabled = paused
    heart.disabled = paused
}

function reseter() {
    paused = true
    clearInterval(interval)
    pauser()
    counter.innerText = "0"
    number = 0
}

function submitter(e) {
    e.preventDefault()
    const comment = e.target.comment.value
    appendComment(comment)
        
    form.reset()
}

function appendComment(comment) {
    const p = document.createElement("p")
    p.innerText = comment
    list.append(p)
}