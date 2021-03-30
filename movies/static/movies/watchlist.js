document.addEventListener('DOMContentLoaded', function() {
    const deleteList = document.querySelectorAll('.delete');
    deleteList.forEach(element => {
        element.addEventListener('click', () => {
            delete_list(element);
        })
    })

    const deleteItem = document.querySelectorAll('.deletebtn');
    deleteItem.forEach(element => {
        element.addEventListener('click', () => {
            delete_item(element);
        })
    })
})

function delete_item(element) {
    const movieid = element.getAttribute('data-id');
    const listid = element.id;
    const deleteMovie = new FormData()
    deleteMovie.append("movieid", movieid)
    deleteMovie.append("listid", listid)
    fetch("/delete_item/", {
        method: "POST",
        body: deleteMovie,
    })
    .then((res) => {
        document.getElementById(`movie-${movieid}`).style.display = 'none';
    })
}

function delete_list(element) {
    const id = element.getAttribute("data-id");
    const deleteList = new FormData()
    deleteList.append("id", id)
    fetch("/delete_list/", {
        method: "POST",
        body: deleteList,
    })
    .then((res) => {
        window.location.reload();
    })
}