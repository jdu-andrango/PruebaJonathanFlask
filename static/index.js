const form = document.querySelector('#form');

let autores = [];

window.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch("/jonathan/autor");
    const data = await response.json();
    autores = data
    console.log(data)
    renderAutor(autores)

})

form.addEventListener('submit', async e => {
    e.preventDefault()

    const primernombre = form['primernombre'].value;
    const segundonombre = form['segundonombre'].value;
    const apellido = form['apellido'].value;
    const direccion = form['direccion'].value;
    const nacionalidad = form['nacionalidad'].value;
    const editorial = form['editorial'].value;

    console.log(primernombre, segundonombre, apellido, direccion, nacionalidad, editorial);


    const response = await fetch('/jonathan/autor', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            primernombre,
            segundonombre,
            apellido,
            direccion,
            nacionalidad,
            editorial,
        })
    })

    const data = await response.json();
    console.log(data)
    autores.push(data);
    renderAutor(autores);
    form.reset();


})

function renderAutor(autores) {
    const autorList = document.querySelector('#autorList');
    autorList.innerHTML = "";
    autores.forEach(autor => {
        const autorItem = document.createElement('li');
        autorItem.classList = 'list-group'
        autorItem.innerHTML = `
        <header>
        
        </header>
        <br>
        <br>
        <body>
        <p>${autor.primernombre}</p>
        <p>${autor.segundonombre}</p>
        <p>${autor.apellido}</p>
        <p>${autor.direccion}</p>
        <p>${autor.nacionalidad}</p>

        <p>${autor.editorial}</p>   

        </body>
        
        `
        console.log(autorItem);
        autorList.append(autorItem)
    })
}