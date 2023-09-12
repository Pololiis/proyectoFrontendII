window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.forms[0];
  const firstName = document.getElementById("inputNombre");
  const lastName = document.getElementById("inputApellido");
  const email = document.getElementById("inputEmail");
  const password = document.getElementById("inputPassword");
  const repeatPassword = document.getElementById("inputPasswordRepetida");
  const url = "https://todo-api.ctd.academy/v1";
  const btn = document.querySelector('[type = "submit"]');

  // ponemos en true solo cuando estén correctos
  const estadoErroresOK = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    repeatPassword: false,
  };
  // console.log(estadoErroresOK);

  // Se validan los inputs cumplan los requerimientos
  firstName.addEventListener("input", (e) => {
    validarTexto(e);
    estadoErroresOK.firstName = validarTexto(e);
  });
  lastName.addEventListener("input", (e) => {
    validarTexto(e);
    estadoErroresOK.lastName = validarTexto(e);
  });
  email.addEventListener("input", (e) => {
    validarEmail(e);
    estadoErroresOK.email = validarEmail(e);
  });
  password.addEventListener("input", (e) => {
    validarContrasenia(e);
    estadoErroresOK.password = validarContrasenia(e);
  });
  repeatPassword.addEventListener("input", (e) => {
    compararContrasenias(e, password.value);
    estadoErroresOK.repeatPassword = compararContrasenias(e, password.value);
  });

  // Valido que los campos no esté vacío
  firstName.addEventListener("blur", (e) =>
    isEmpty(`⚠️Ingrese su ${firstName.name}`, e)
  );

  lastName.addEventListener("blur", (e) =>
    isEmpty(`⚠️Ingrese su ${lastName.name}`, e)
  );

  email.addEventListener("blur", (e) =>
    isEmpty(`⚠️Ingrese su ${email.name}`, e)
  );

  password.addEventListener("blur", (e) =>
    isEmpty(`⚠️Ingrese su ${password.name}`, e)
  );

  repeatPassword.addEventListener("blur", (e) =>
    isEmpty(`⚠️Repita su ${repeatPassword.name}`, e)
  );

  /* -------------------------------------------------------------------------- */

  btn.addEventListener("mouseover", (e) => {
    if (
      recorrerEstadoErrores(estadoErroresOK) ==
      Object.keys(estadoErroresOK).length
    ) {
      btn.disabled = false;
      enviarRegistro();
    } else {
      btn.disabled = true;
      btn.style.backgroundColor = "grey";
    }
  });

  btn.addEventListener("mouseleave", (e) => {
    btn.style.backgroundColor = "#3333ffff";
  });
  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */

  enviarRegistro = () => {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // console.log(estadoErroresOK);

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
    });
  };

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
          const message = "El usuario ya se encuentra registrado";
          console.warn(message);
          repeatPassword.nextElementSibling.classList.add("error");
          repeatPassword.nextElementSibling.textContent = message;
          // alert(
          //   "El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto"
          // );
        } else {
          alert("Error del servidor");
        }
      });
  }
});
