window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.forms[0];
  const firstName = document.getElementById("inputNombre");
  const lastName = document.getElementById("inputApellido");
  const email = document.getElementById("inputEmail");
  const password = document.getElementById("inputPassword");
  const repeatPassword = document.getElementById("inputPasswordRepetida");
  const url = "https://todo-api.ctd.academy/v1";

  // ponemos en true solo cuando estén correctos
  const estadoErroresOK = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    repeatPassword: false,
  };
  //   console.log(estadoErroresOK);

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    estadoErroresOK.firstName = validarTexto(firstName.value);
    estadoErroresOK.lastName = validarTexto(lastName.value);
    estadoErroresOK.email = validarEmail(email.value);
    estadoErroresOK.password = validarContrasenia(password.value);
    estadoErroresOK.repeatPassword = compararContrasenias(
      password.value,
      repeatPassword.value
    );

    if (
      recorrerEstadoErrores(estadoErroresOK) ==
      Object.keys(estadoErroresOK).length
    ) {
      const payload = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      };

      const settings = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      };

      realizarRegister(settings);

      form.reset();
    } else {
      alert(mostrarErrores(estadoErroresOK).join("\n"));
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(settings) {
    fetch(`${url}/users`, settings)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("jwt", JSON.stringify(data.jwt));
          location.replace("./mis-tareas.html");
        }
      })
      .catch((err) => {
        if (err.status == 400) {
          alert(
            "El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto"
          );
        } else {
          alert("Error del servidor");
        }
      });
  }
});
