const suggestions = [] //Array vacío
    ///Listamos todos los resultados 
const suggestions_List = db.collection("list").onSnapshot(query_List => {
    query_List.forEach(results => {
        console.log(results.data());
        const clone = template_List.cloneNode(true)
        fragment_List.appendChild(clone)
        fragment_List.querySelector('#media').textContent = results.data().media
        fragment_List.querySelector('#duration').textContent = results.data().duration
        list.appendChild(fragment_List)
        suggestions.push(results.data().media)
    });
})

const result_search = () => {
    search_Input_Box.addEventListener('click', e => {
        const result = db.collection('list').where('media', '==', search_Box.value).onSnapshot((query => {
            search_Box.value = '' //Limpiamos el input de búsqueda una vez encondrado rewsultados
            let value = []
            query.forEach(result => {
                if (result.exists == true) { //Documento existente
                    console.log(result.data());
                    //Llenamos el  array vación con los datos que nos llegan
                    value.push(result.data().media, result.data().duration)
                    console.log(value);
                    results_Box.style.display = 'block'
                    results_Box.innerHTML = /*html*/ `
                     <div class="d-flex bd-highlight">
                         <div class="p-2 flex-grow-1 bd-highlight">${value[0]} </div>
                              <div class="p-2 bd-highlight">Duration: ${value[1]} </div>
                         <div class="p-2 bd-highlight">
                         <button class="btn btn-primary fas fa-play" id="btn_Play"  type="submit" title="Play"></button>
                         <button class="btn btn-danger fas fa-trash-alt" id="btn_Delete" value=""  type="submit" title="delete"></button>
                         </div>
                      </div>
                    `

                    const delete_doc = results_Box.querySelector('#btn_Delete') //Evento para borrar el documento 
                    delete_doc.addEventListener('click', e => {
                        delete_From_List(result.id) //Pasamos el uid del documento
                    })
                }

            });

        }))
        return results_Box.innerHTML = `<label>No result found</label>` //Cuando no hay resultados

    })
}

result_search()

const delete_From_List = async(value) => {

    const id = await value
    db.collection("list").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}