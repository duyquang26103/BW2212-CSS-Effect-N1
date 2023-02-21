/**
 * 1. Render songs
 * 2. Scroll top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / Prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'DT_PLAYER'
const heading = $("header h2")
const cdThumb = $(".cd-thumb")
const audio = $("#audio")
const cd = $(".cd")
const playBtn = $(".btn-toggle-play")
const player = $(".player")
const progress = $("#progress")
const nextBtn = $(".btn-next")
const preBtn = $(".btn-prev")
const randomBtn = $(".btn-random")
const repeatBtn = $(".btn-repeat")
const playList = $(".playlist")
const app ={
    currentIndex:0,
    isPlaying:false,
    isRandom:false,
    isRepeat:false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
    {
        name:"For You",
        singer:"EXO",
        path:"./assets/music/song-1.mp3",
        image:"./assets/img/img-1.jpg"
    },
    {
        name:"Say Yes",
        singer:"Punch, Loco",
        path:"./assets/music/song-2.mp3",
        image:"./assets/img/img-2.jpg"
    },
    {
        name:"All With You",
        singer:"Taeyeon",
        path:"./assets/music/song-3.mp3",
        image:"./assets/img/img-3.jpg"
    },
    {
        name:"I Love You, I Remember You",
        singer:"I.O.I",
        path:"./assets/music/song-4.mp3",
        image:"./assets/img/img-4.jpg"
    },
    ],
    setConfig:function(key,value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY,JSON.stringify(this.config))
    },
    render: function() {
        const htmls = this.songs.map((song,index) => {
            return `<div class="song hover ${index === this.currentIndex ? 'active':''}" data-index="${index}" >
                    <div
                        class="thumb"
                        style="
                            background-image: url('${song.image}');
                        "
                    ></div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>`
        })
        playList.innerHTML = htmls.join('')
    },
    defineProperties:function() {
        Object.defineProperty(this, "currentSong", {
            get: function() { return this.songs[this.currentIndex]}
        })
    },
    handleEvents: function() {
        const cdWidth = cd.offsetWidth

        //Xử lý CD quay
        const cdThumbAnimate = cdThumb.animate([
            {
                transform:'rotate(360deg)'
            }
        ], {
            duration:10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        
        // Xử lý phóng to / thu nhỏ CD
        document.onscroll = function () {
          const scrollTop = window.scrollY || document.documentElement.scrollTop
          const newCdWidth = cdWidth - scrollTop
          cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
          cd.style.opacity = newCdWidth / cdWidth
        }

        // Xử lý khi click Play
        playBtn.onclick = function() {
            if(app.isPlaying){
            audio.pause()
            }else {
            audio.play()
            }
        }

        //Khi song được play 
        audio.onplay = function() {
            app.isPlaying = true
            player.classList.add("playing")
            cdThumbAnimate.play()
            
        }
         //Khi song được pause 
        audio.onpause  = function() {
            app.isPlaying = false
            player.classList.remove("playing")
            cdThumbAnimate.pause()
            
        }

        //Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
        }
        
        //Xử lý khi tua
        progress.oninput = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        //Khi next bài 
        nextBtn.onclick = function() {
            if(app.isRandom) {
                app.randomSong()
            }
            else {
                app.nextSong()
            }
            audio.play()
            app.render()
            app.scrollToActiveSong()
        }

        //Khi back bài
        preBtn.onclick = function() {
            if(app.isRandom) {
                app.randomSong()
            }
            else {
                app.preSong()
            }
            audio.play()
            app.render()

        }

        //Khi random được active
        randomBtn.onclick = function() {
           app.isRandom = !app.isRandom
            app.setConfig('isRandom',app.isRandom)
           randomBtn.classList.toggle("active",app.isRandom)
        }
        //Khi repeat được active
        repeatBtn.onclick = function() {
            app.isRepeat = !app.isRepeat
            app.setConfig('isRepeat',app.isRepeat)
           repeatBtn.classList.toggle("active",app.isRepeat)
        }
        
        //Xử lý next song khi audio ended
        audio.onended = function() {
            if(app.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        //Lắng nghe hành vi click vào playlist
        playList.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if( songNode || e.target.closest('.option')) {
                // Xử lý khi click vào song 
               if(songNode) {
                    app.currentIndex = Number(songNode.dataset.index)
                    app.loadCurrentSong()
                    app.render()
                    audio.play()
               }
            }
        }

    },
    scrollToActiveSong:function() {
            setTimeout(function() {
                $('.song.active').scrollIntoView({
                    behavior: 'smooth',
                    block:'nearest',
                })
            })
        },
    loadCurrentSong: function() {       
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    loadConfig:function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },
    nextSong:function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    preSong:function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length -  1
        }
        this.loadCurrentSong()
    },
    randomSong:function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    start: function() {
        //Gán cấu hình từ config vào app
        this.loadConfig()
        // Định nghĩa các thuộc tính cho object
        this.defineProperties()
        // Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents()
        // Tải thông tin bài hát đầu tiên vào UI khi chạy
        this.loadCurrentSong()
        // Render playlist
        this.render()

        randomBtn.classList.toggle("active",app.isRandom)
        repeatBtn.classList.toggle("active",app.isRepeat)

    }

}

app.start()