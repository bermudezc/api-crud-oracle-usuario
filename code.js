c = document.querySelector("tbody")

modal = new bootstrap.Modal( document.getElementById("usuario"))


c.innerHTML = "<tr> <td>1</td> <td>juan</td>  <td>234</td> </tr>"



btncrear.addEventListener("click", () => {
    id.value = ""
    nombre.value = ""
    pass.value = ""
    boton.innerHTML = "crear"
    usuario.show()

})




const mostrar = (users) => {

    lista = ""
    users.forEach((usr) => {
        lista = lista + `<tr>
            <td>${usr.ID}</td> 
            <td>${usr.NOMBRE}</td>
            <td>${usr.PASS}</td> 
            <td>
                <a class="btneditar btn btn-primary" >editar</a>
                <a class="btnborrar btn btn-danger" >borrar</a>
            </td>
        </tr>`
    })
    c.innerHTML = lista
}

url = 'http://localhost:3000/usuarios/'
url2 = 'http://localhost:3000/usuario/'
var headers = {}
fetch(url, {
    method: "GET",
    mode: 'cors',
    headers: headers
})
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console(log));


const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) handler(e)
    })

}

on(document, 'click', '.btnborrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.",
        function () {
            fetch(url2 + id, { method: 'DELETE' })
                .then(() => location.reload())
        },
        function () {
            alertify.error('Cancel');
        });
})

on(document, `click`, `.btneditar`, e => {
    const fila = e.target.parentNode.parentNode
     id.value = fila.firstElementChild.innerHTML
     nombre.value = fila.children[1].innerHTML
     pass.value = fila.children[2].innerHTML
     boton.innerHTML = "Modificar"
     modal.show()
    
    

})