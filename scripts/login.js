window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.forms[0];
  const email = document.querySelector("#inputEmail");
  const password = document.getElementById("inputPassword");
  const url = "https://todo-api.ctd.academy/v1";
  const btn = document.querySelector('[type = "submit"]');

  // console.log(form);

  const estadoErroresOK = {
    email: false,
    password: false,
  };
  //   console.log(estadoErroresOK);

  // Aquí en este punto yo me encargo de mandar un a llamar la función normalizar Texto y las
  //   email.addEventListener("blur", (e) => {
  //     console.log(e.target);
  //     const field = e.target;
  //     const fieldValue = field.value;
  //     console.log(fieldValue);

  //     if (fieldValue == 0) {
  //       field.classList.add("invalid");
  //       field.nextElementSibling.classList.add("error");
  //       field.nextElementSibling.textContent = `${field.name} es requerido`;
  //     } else {
  //       field.classList.add("invalid");
  //       field.nextElementSibling.classList.remove("error");
  //       field.nextElementSibling.textContent = "";
  //     }
  //   });

  // Esto es para cuenado yo salgo del input
  email.addEventListener("input", (e) => {
    validarEmail(e);
    estadoErroresOK.email = validarEmail(e);
  });
  password.addEventListener("input", (e) => {
    validarContrasenia(e);
    estadoErroresOK.password = validarContrasenia(e);
  });

  // Valido que los campos tengan los requerimientos necesarios
  email.addEventListener("blur", (e) =>
    isEmpty(`⚠️Ingrese su ${email.name}`, e)
  );
  password.addEventListener("blur", (e) =>
    isEmpty(`⚠️Ingrese su ${password.name}`, e)
  );

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

      if (!email.classList.contains("invalid") && email.value != "") {
        //Creamos el cuerpo de la request (petición al servidor)
        const payload = {
          email: email.value,
          password: password.value,
        };
        // vemos el objeto que recibimos del formulario
        //   console.log(payload);

        //configuramos la request del Fetch
        const settings = {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        };

        // Lanzamos la consulta del login a la API
        realizarLogin(settings);

        // Limpiamos el formulario
        form.reset();
      } else {
        btn.disable = true;
      }
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 2: Realizar el login [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarLogin(settings) {
    // console.log(settings);
    // console.log("Lanzar la consulta a la API...");

    fetch(`${url}/users/login`, settings)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(response);
        }
      })
      .then((data) => {
        // console.log("Promesa cumplida💍");
        // console.log(data);

        if (data.jwt) {
          // Guardamos el dato jwt en el local storage (este token de autenticación)
          localStorage.setItem("jwt", JSON.stringify(data.jwt));
          // redireccionamos a nuestro dashboard de tareas
          location.replace("./mis-tareas.html");
        }
      })
      .catch((err) => {
        console.warn("Promesa rechazada ");
        // console.log(err);
        if (err.status == 400) {
          const message = "Contraseña incorrecta";
          console.warn(message);
          password.nextElementSibling.classList.add("error");
          password.nextElementSibling.textContent = message;
          //   alert("Contraseña incorrecta");
        } else if (err.status == 404) {
          const message = "El usuario no existe";
          console.warn(message);
          email.nextElementSibling.classList.add("error");
          email.nextElementSibling.textContent = message;
          //   alert("El usuario no existe");
        } else {
          const message = "Error del servidor | url no existe";
          console.error(message);
          alert(message);
        }
      });
  }
});
