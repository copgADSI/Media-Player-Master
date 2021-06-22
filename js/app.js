const media_player = async(uid) => {
    const id = await uid
    let counter_click = 0
    let counter_Play = 0
    const list = []
    const results = await db.collection('list').where("uid", "==", id).get()
    results.forEach(item => {
        video.src = item.data().url
        let current_total = (item.data().duration)

    });
    stop_player.addEventListener('click', async(e) => {
        counter_click += 1
        if (counter_click % 2 === 0 && counter_click !== 0) {
            video.pause()
            stop_player.classList = 'fas fa-play'
            stop_player.title = 'play'
        } else {
            video.play()
            stop_player.classList = 'fas fa-stop'
            stop_player.title = 'stop'
        }

    })
    next.addEventListener('click', e => {
        stop_player.title = 'stop'
        stop_player.classList = 'fas fa-stop'
        results.forEach(result => {
            list.push(result) // Llenamos nuestro array con  los datos de fb
        });
        const item = list[counter_Play]._delegate._document.data.value.mapValue.fields
        title.textContent = item.media.stringValue
        video.src = item.url.stringValue //Asignamos la url al video
        video.autoplay = true
        console.log(list[counter_Play]); //Mostramos la sig canción
        counter_Play += 1


    })
    previus.addEventListener('click', e => {
        list.pop()
        list[list.length - 1]
            /*        console.log(list);
             */
    })
    repeat.addEventListener('click', e => {
        if (video.loop == true) {
            video.classList = 'border border-danger'
            repeat.classList += 'border border-danger'
            return video.loop = false
        }

        video.classList = 'border border-primary'
        repeat.classList += 'border border-none'

        video.loop = true
    })
    randmon.addEventListener('timeupdate', e => {})
    video.addEventListener('timeupdate', e => {
        const currentTime = e.target.currentTime // Tiempo actual  de la canción
        const duration = e.target.duration // duración de la canción
        let progress_Width = (currentTime / duration) * 100
        progress_Bar.style.width = `${progress_Width}%`

        video.addEventListener('loadeddata', e => {
            //Actualizamos la duración total de la canción

            let duration_Time = video.duration
            let total_Min = Math.floor(duration_Time / 60)
            let total_Sec = Math.floor(duration_Time % 60)
            if (total_Sec < 10) {
                total_Sec = `0${total_Sec}`
            }
            duration_video.textContent = `${total_Min}:${total_Sec}`

        })

        //Actualizamos el tiempo actual de la cancion
        let current_Min = Math.floor(currentTime / 60)
        let current_Sec = Math.floor(currentTime % 60)
        if (current_Sec < 10) {
            current_Sec = `0${current_Sec}`

        }
        current_video.innerText = `${current_Min}:${current_Sec}`
    })

    /*  progress.addEventListener('click', (e) => {
                 const currentTime = e.target.currentTime
                 const duration = e.target.duration
                 let progress_Width = (currentTime / duration) * 100
                 progress_Bar.style.width = `${progress_Width}%`
     }) */
}


const expand = () => {
    screen.addEventListener('click', e => {

        if (screen.requestFullscreen) {
            return screen.requestFullscreen()
        }
        return screen.exitFullscreen()
    })
}
expand()
const save_media = async(uid) => {
    const id = await uid
    let duration_v
    form_save_media.addEventListener('submit', e => {
        e.preventDefault()
        const duration = new_File.duration
        const file = new_File.files[0]
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function(e) {
            let buffer = e.target.result
            let videoBlob = new Blob([new Uint8Array(buffer)], {
                    type: file.type
                }),
                url = (URL || webkitURL).createObjectURL(videoBlob),
                video = document.createElement("video")
            video.preload = "metadata"
            video.addEventListener("loadedmetadata", e => {
                duration_v = video.duration / 60
                duration_v = duration_v.toFixed(2)
            })
            video.src = url
        }
        const storageRef = firebase.storage().ref(`media/${file.name}`)
        const task = storageRef.put(file) //Subimos el archivo 
        task.on("state_changed", state => {
            let fixed = state.bytesTransferred / state.totalBytes * 100
            progress_bar.style.width = state.bytesTransferred / state.totalBytes * 480 + 'px'
            progress_bar.childNodes[0].nodeValue = parseFloat(fixed.toFixed(2)) + '%'
            if (parseFloat(fixed.toFixed(0)) <= 30) {
                progress_bar.style.background = 'red'
            } else if (parseFloat(fixed.toFixed(0)) <= 50) {
                progress_bar.style.background = 'rgb(0, 46, 145)'
            } else if (parseFloat(fixed.toFixed(0)) >= 70) {
                progress_bar.style.background = 'green'
            }
        })
        task.snapshot.ref.getDownloadURL().then(function(url) {
            console.log(url);
            db.collection('list').add({
                    media: file.name,
                    url: url,
                    duration: parseFloat(duration_v),
                    type: file.type,
                    uid: id,
                    dateAdded: Date(Date.now)
                })
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })

        })


    })
}



search_Box.onkeyup = (e) => {
    const user_Data = e.target.value //Obtenemos el valor ingreso por el usuario
    let empty_Array = []
    if (user_Data) {
        empty_Array = suggestions.filter((data) => {
            return (data.toLocaleLowerCase().startsWith(user_Data.toLocaleLowerCase()));
        })
        empty_Array = empty_Array.map((data) => {
            return `<li >${data}</li>`
        })
        results_Box.style.display = 'block' // Mostramos los resultados de la búsqueda
        show_Suggestions(empty_Array)
    } else {

    }

}

const show_Suggestions = (result) => {

    let list_Data

    if (!result.length) {

        const user_Value = search_Box.value
        list_Data = `<li>${user_Value}</li>` //Si no hay resultados se muestra lo del input 
    } else {
        list_Data = result.join('')

    }

    results_Box.innerHTML = list_Data
    const list_All = results_Box.querySelectorAll('li')
    for (let u = 0; u < list_All.length; u++) {
        //Añadimos el evento click a cada opción y pasamos el elemento como parámetro a la funtion select
        list_All[u].setAttribute("onclick", "select(this)")

    }

}


//Funtion para mostrar el elemento seleccionado
const select = (element) => {
    search_Box.value = element.textContent // El input de búsqueda obtiene el valor del elemento seleccionado
    results_Box.style.display = 'none' //Ocultamos los resultados una vez escogido un li
}