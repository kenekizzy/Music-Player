//Declaring the Dom Variables 
const music = document.querySelector("audio")
const title = document.querySelector("#title")
const img = document.querySelector("img")
const progressContainer = document.querySelector("#progress-container")
const progress = document.querySelector("#progress")
const currentTimes = document.querySelector("#current-time")
const durations = document.querySelector("#duration")
const artist = document.querySelector("#artist")
const prevBtn = document.querySelector("#prev")
const playBtn = document.querySelector("#play")
const nextBtn = document.querySelector("#next")
const songs = ["Dionysus", "Make It Right", "nescafe", "your eyes tell"]
let count = 0

//setting the isPlay value to false to prevent the song from playing on load
let isPlaying = false

//Function to change the song
function changeSong(count){
    music.setAttribute("src", `music/${songs[count]}.mp3`)
    title.textContent = `${songs[count]}`
    artist.textContent ="BTS"
    img.setAttribute("src", `images/${songs[count]}.jpg`)
    playSong()
}

//Function to play the Song when the button is clicked
function playSong(){
    isPlaying = true
    playBtn.classList.replace("fa-play", "fa-pause")
    playBtn.setAttribute("title", "pause")
    music.play()
}

//Function to pause the song when the button is clicked
function pauseSong(){
    isPlaying = false
    playBtn.classList.replace("fa-pause", "fa-play")
    playBtn.setAttribute("title", "play")
    music.pause()
}

//Next play function is used to move to the next song when pressed
function nextPlay(){
    count++
    if(count > songs.length -1){
        count = 0
    }
    changeSong(count)
}

//Previous play function is used to move to the previous song the button is clicked
function prevPlay(){
    count--
    if(count < 0){
        count = songs.length - 1
    }
    changeSong(count)
}

//Update time function is used to update the time while the song is being played
function updateTime(e){
    if(isPlaying){
        //Getting the current time and song duration time
        const {currentTime, duration} = e.srcElement
        const progressPercent = (currentTime/duration) * 100
        progress.style.width = `${progressPercent}%`
        
        //Updating thr Duration Time Stamp
         const timeStamp = Math.floor(duration/60)
         let secondStamp = Math.floor(duration%60)
         if(secondStamp < 10){
             secondStamp =`0${secondStamp}` 
         }
         if(secondStamp){
             durations.textContent = `${timeStamp}:${secondStamp}`
         } 

         //Updating the Current Time Stamp
         const currentTimeStamp = Math.floor(currentTime/60)
         let currentMinuteStamp = Math.floor(currentTime%60)
         if(currentMinuteStamp < 10){
             currentMinuteStamp = `0${currentMinuteStamp}`
         }
         if(currentMinuteStamp){
             currentTimes.textContent = `${currentTimeStamp}:${currentMinuteStamp}`
         }
    }
}

//The update progress bar function is used to update the progress bar of the song while it is playing
function updateProgressBar(e){
    const width = this.clientWidth
    const { offsetX }= e
    const { duration } = music
    const updatePercent = (offsetX/width) * 100
    progress.style.width = `${updatePercent}%`
    music.currentTime = (offsetX/width) * duration
}


//Adding event listeners to objects of the music player
window.onload = changeSong(count)
//Play button event listener checks if the song is playing then runs the function required
playBtn.addEventListener("click", () =>(isPlaying ? pauseSong(): playSong()))
nextBtn.addEventListener("click", nextPlay)
prevBtn.addEventListener("click", prevPlay)
music.addEventListener("timeupdate", updateTime)
music.addEventListener("ended", nextPlay)
progressContainer.addEventListener("click", updateProgressBar)