window.addEventListener("load", function () {
	/* ---------------------- obtenemos variables globales ---------------------- */
    const form = document.forms[0];
    const firstName = document.getElementById("inputNombre");
    const lastName= document.getElementById("inputApellido");
    const email = document.getElementById("inputEmail");
    const password = document.getElementById("inputPassword");
    const repeatPassword = document.getElementById("inputPasswordRepetida");
    const url = "https://todo-api.ctd.academy/v1";

	/* -------------------------------------------------------------------------- */
	/*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
	/* -------------------------------------------------------------------------- */
	form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (compararContrasenias(password.value, repeatPassword.value) &&
            validarContrasenia(password.value) &&
            validarEmail(email.value)) {

            const payload = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value
            }
    
            const settings = {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
    
            realizarRegister(settings);
    
            form.reset();
        
        }
    });

	/* -------------------------------------------------------------------------- */
	/*                    FUNCIÓN 2: Realizar el signup [POST]                    */
	/* -------------------------------------------------------------------------- */
	function realizarRegister(settings) {

        fetch(`${url}/users`, settings)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        })
        .then(data => {
            if (data.jwt) {
                localStorage.setItem("jwt", JSON.stringify(data.jwt));
                location.replace("./mis-tareas.html");
            }
        })
        .catch(err => {
            if (err.status == 400) {
                alert("El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto");
            } else {
                alert("Error del servidor");
            }
        })
    }
});
