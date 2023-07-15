$(document).ready(function() {
    headerSlider();
    showListSong();
    showAddPlaylist();
    showSidebar();
    handleChart();

    const pause = $('.pause');
    const playing = $('.btn-play');
    const audio = $('#audio')[0];
    const progress = $('.progress')[0]; 
    const cd = $('.img-song-playing')[0];
    const nextBtn = $('.song-right')[0];
    const backBtn = document.querySelector('.song-left');
    const repeatBtn = document.querySelector('.repeat');
    const randomBtn = document.querySelector('.song-random');

    pause.hide();
    const app = {
        currentIndex: 0, 
        songs: [
            {
                name: 'Có hẹn với thanh xuân',
                singer: 'monstar',
                path: './music/Co-Hen-Voi-Thanh-Xuan-Remix-Monstar-ft-AnhVu-1967-Remix.mp3',
                image: 'https://photo-resize-zmp3.zadn.vn/w320_r1x1_jpeg/cover/e/2/3/f/e23ff2faaa64eebfc57e0acde247f0db.jpg'
            },
            {
                name: 'Yêu 5',
                singer: 'Rhy-mastic',
                path: './music/yeu-5.mp3',
                image: '	https://file.tinnhac.com/resize/600x-/music/2017/06/09/video-lyrics-loi-bai-984d.jpg'
            },
            {
                name: 'For get me now',
                singer: 'Trí dũng',
                path: './music/for-get-me-now.mp3',
                image: '	https://i1.sndcdn.com/artworks-xQQSNq3r7AlMFq3L-Y2QL6A-t500x500.jpg'
            },
            {
                name: 'Cưới thôi',
                singer: 'Masiu',
                path: './music/cuoi-thoi.mp3',
                image: 'https://data.chiasenhac.com/data/cover/145/144624.jpg'
            },
            {
                name: 'Lần hẹn hò đầu tiên',
                singer: 'Huyền tâm môn',
                path: './music/lan-hen-ho-dau-tien.mp3',
                image: '	https://images.shazam.com/coverart/t576676675_s400.jpg'
            },

        ],
        render: function( ) {
            const listSong = this.songs.map( song => {
                return `
                <div class="song-item">
                    <div class="song-detail">
                        <img src="${song.image}" alt="">
                        <div class="song">
                            <span class="song-name">${song.name}</span>
                            <span class="singer-name">${song.singer}</span>
                        </div>
                    </div>
                    <div class="icon">
                        <i class="far fa-heart hover-icon"></i>
                        <i class="fas fa-ellipsis-h hover-icon"></i>
                    </div>
                    <audio src="${song.path}"></audio>
                </div>
                `
            });

            $(".list-song-main").html(listSong.join("\n"));
        },
        defineProperties: function() {
            Object.defineProperty( app, 'currentSong', {
                get: function() {
                    return this.songs[0];
                }
            })
        },
        getCurrentSong: function() {
            return this.songs[this.currentIndex];
        },
        loadCurrentSong: function() {
            $('.control .song-detail img').attr( "src", this.songs[this.currentIndex].image);
            $('.control .song-name').text(this.songs[this.currentIndex].name);
            $('.control .singer-name').text(this.songs[this.currentIndex].singer);
            $('.control audio').attr( "src", this.songs[this.currentIndex].path);
        },
        nextSong: function() {
            let $currentPlaylist = $('.song-item');
            $($currentPlaylist[this.currentIndex]).removeClass("song-playing");
            this.currentIndex ++;
            if ( this.currentIndex >= this.songs.length)
                this.currentIndex = 0;
            $($currentPlaylist[this.currentIndex]).addClass("song-playing");  
            this.loadCurrentSong();
        },
        backSong: function() {
            let $currentPlaylist = $('.song-item');
            $($currentPlaylist[this.currentIndex]).removeClass("song-playing");
            this.currentIndex --;
            if ( this.currentIndex < 0 )
                this.currentIndex = this.songs.length - 1;
            $($currentPlaylist[this.currentIndex]).addClass("song-playing");
            this.loadCurrentSong();
        },
        loadSelectedSong: function() {
            let _this = this;
            let $currentPlaylist = $('.song-item');
            $currentPlaylist.click( function() {
                let __this = this;
                $($currentPlaylist[_this.currentIndex]).removeClass("song-playing");
                $(this).addClass("song-playing");
                $currentPlaylist.each(function (index, value) {
                    if ( value == __this) {
                        _this.currentIndex = index;
                        _this.loadCurrentSong();
                        audio.play();
                    }
                });
            });

        },
        handle: function() {
            const _this = this;
            // xử lí CD quay
            const cdTwirl = cd.animate([
                { transform: 'rotate(360deg'}
            ],
            {
                duration: 10000,
                iterations: Infinity
            });
            cdTwirl.pause();

            // xử lí bật tắt nhạc
            playing.click( function(){
                audio.play();
                pause.show();
                $(this).hide(); 
                cdTwirl.play();
            });
            pause.click( function(){
                audio.pause();
                $(this).hide(); 
                playing.show();
                cdTwirl.pause();
            });

            // xử lí thời gian vào thanh input 
            audio.ontimeupdate = function() {
                if ( audio.duration ) {
                    const progressPercent = Math.floor( 100 *audio.currentTime/ audio.duration);
                    progress.value = progressPercent;
                }
            }
            // xử lí tua
            progress.onchange = function(e) {
                const currentProgress = Math.floor( e.target.value * audio.duration/100);
                audio.currentTime = currentProgress;
            };

            // next song 
            nextBtn.onclick = function(){
                let check = 0;
                if ( ! audio.paused )
                    check = 1;
                _this.nextSong();
                progress.value = 0;
                if ( check)
                    audio.play();
            };

            // back song
            backBtn.onclick = function(){
                let check = 0;
                if ( ! audio.paused )
                    check = 1;
                _this.backSong();
                progress.value = 0;
                if ( check)
                    audio.play();
            };

            // xử lí khi hết bài
            audio.onended = function() {
                _this.nextSong();
                progress.value = 0;
                audio.play();
            }
            // xử lí volume
            $volumeInput = $("#volume-input")[0];
            $volumeInput.value = 100;
            $volumeInput.onchange = function(e){
                audio.volume = ( e.target.value / 100);
            };
            
        },
        handleOnListSong: function() {
            let $currentPlaylist = $('.song-item');
            $($currentPlaylist[this.currentIndex]).addClass("song-playing");
        },
        start: function() {
            this.handle();
            this.loadCurrentSong();
            this.render();
            this.handleOnListSong();
            this.loadSelectedSong();
        },
    }
    app.start();

});

function headerSlider() {
    $('.gallery-container').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    });
}

function showListSong() {
    $('.list-song-btn').click( function() {
        $('.list-song').hasClass("show-list-song") ?
        $('.list-song').removeClass("show-list-song") :
        $('.list-song').addClass("show-list-song");
    });
}

function showAddPlaylist() {
    $('.add-playlist-sidebar').click( function() {
        $('.modal').addClass('show-add-playlist')
    });

    $('.modal').click( function() {
        $('.modal').removeClass('show-add-playlist')
    });
}

function showSidebar() {
    $('.btn-navigation i').click( function() {
        $('.sidebar').toggleClass('on-tab-mob');
    });
}
