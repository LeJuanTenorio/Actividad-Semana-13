const USUARIOS = "usuarios";
const container = document.querySelector(".container")

const buscarUsuario = (nombre) => {
    const usuarios = localStorage.getItem(USUARIOS);

    if (usuarios === null) {
        return null;
    }

    const usuariosJSON = JSON.parse(usuarios);

    for (const usuario of usuariosJSON) {
        if (usuario.nombre === nombre) {
            return usuario;
        }
    }

    return null;
}

const guardarUsuario = (nombreUsuario, apellidoUsuario) => {
    const usuarios = localStorage.getItem(USUARIOS);

    if (usuarios === null) {
        const nuevosUsuarios = [
            { nombre: nombreUsuario, apellido: apellidoUsuario }
        ];

        localStorage.setItem(USUARIOS, JSON.stringify(nuevosUsuarios));
    } else {
        const usuariosJSON = JSON.parse(usuarios);

        usuariosJSON.push({
            nombre: nombreUsuario, apellido: apellidoUsuario 
        });

        localStorage.setItem(USUARIOS, JSON.stringify(usuariosJSON));
    }
}

const render = async () => {
    const form = document.querySelector("#registro");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombre = event.target.nombre.value;
        const apellido = event.target.apellido.value;

        const usuarioEncontrado = buscarUsuario(nombre);
        if (usuarioEncontrado === null) {
            guardarUsuario(nombre, apellido);
        } else {
            guardarUsuario(nombre, apellido)
        }
        showMe();
    })
}

const showMe = () => {
    container.innerHTML = ""; // clear previous content
    const usuarios = JSON.parse(localStorage.getItem(USUARIOS));

    for (const usuario of usuarios) {
        const nombre = document.createElement("p");
        nombre.textContent = `Nombre: ${usuario.nombre}`;


        const apellido = document.createElement("p");
        apellido.textContent = `Apellido: ${usuario.apellido}`;


        const div = document.createElement("div");
        div.appendChild(nombre);
        div.appendChild(apellido);
        container.appendChild(div);
    }
};

window.onload = render;