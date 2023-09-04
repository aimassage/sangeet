console.log("Namaskaram Sangeet Lover")
// intializig the song variables
let index = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gifsongname = document.getElementById('gifsongname');
let gif = document.getElementById('gif');
let SongItem = Array.from(document.getElementsByClassName('SongItem'));
let songs=[
    {songName: "Maiyya Mori Mai Nahi", filepath: "songs/1.mp3", coverpath:"covers/1.jpg"},
    {songName: "Shri Krishna Govind", filepath: "songs/2.mp3", coverpath:"covers/2.jpg"},
    {songName: "Mai Balak Tu Mata", filepath: "songs/3.mp3", coverpath:"covers/3.jpg"},
    {songName: "Rabba Janada", filepath: "songs/4.mp3", coverpath:"covers/4.jpg"},
    {songName: "Kinna Sona", filepath: "songs/5.mp3", coverpath:"covers/5.jpg"},
]
SongItem.forEach((element,i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
// audioElement.play();
// handling play button
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();

        // masterplay.classList.remove('fa-play');
    //     //<i class="fa-solid fa-pause fa-xl"></i> taken refrence
        // masterplay.classList.add('fa-pause');
        
    // Split the class names into an array
        const classNamesToRemove = ['fa-solid', 'fa-play', 'fa-xl'];

    // Remove each class one by one
        classNamesToRemove.forEach(className => {
        masterplay.classList.remove(className);
    });
    
    // Add the new classes
    masterplay.classList.add('fa-solid', 'fa-pause', 'fa-xl');
    gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        const classNamesToRemove = ['fa-solid', 'fa-pause', 'fa-xl'];

        // Remove each class one by one
        classNamesToRemove.forEach(className => {
            masterplay.classList.remove(className);
        });
        
        // Add the new classes
        masterplay.classList.add('fa-solid', 'fa-play', 'fa-xl');
        gif.style.opacity=0;
    }
})
// listen event 
audioElement.addEventListener('timeupdate', ()=>{
    // seekbar update
    progress=parseFloat((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value= progress;

})

myprogressbar.addEventListener('change', ()=>{
    audioElement.currentTime=myprogressbar.value*audioElement.duration/100;
 })
 const oneafteroneplay=()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
       element.classList.remove('fa-pause');
       element.classList.add('fa-play');
    //    masterplay.classList.remove('fa-pause');
    //    masterplay.classList.add('fa-play');
    })    
 }
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        oneafteroneplay();
        index = parseInt(e.target.id);    
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`songs/${index + 1}.mp3`;
        gifsongname.innerText = songs[index].songName;  
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
    })
})
document.getElementById('next').addEventListener('click',()=>{
    if(index>=4){
        index=0;
    }
    else{
        index+=1;
    }
    audioElement.src=`songs/${index + 1}.mp3`;
    gifsongname.innerText = songs[index].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})
document.getElementById('previous').addEventListener('click',()=>{
    if(index<=0){
        index=4;
    }
    else{
        index-=1;
    }
    audioElement.src=`songs/${index + 1}.mp3`;
    audioElement.currentTime=0;
    gifsongname.innerText = songs[index].songName;
    audioElement.play();
    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})