/* ---------------------------------- texto --------------------------------- */
const setErrors = (message, field, isError = true) => {
  // console.log(field);
  const btn = document.querySelector('[type = "submit"]');
  if (isError) {
    field.classList.add("invalid");
    field.nextElementSibling.classList.add("error");
    field.nextElementSibling.textContent = message;
    return false;
  } else {
    field.classList.remove("invalid");
    field.nextElementSibling.classList.remove("error");
    field.nextElementSibling.textContent = "";
    return true;
  }
};

const isEmpty = (message, e) => {
  // console.log(e.target);

  const field = e.target;
  const fieldValue = field.value;

  if (fieldValue.length == 0) {
    setErrors(message, field);
  }
};

function normalizar(texto) {
  return texto.trim().toLowerCase();
}

function validarTexto(e) {
  // console.log(e.target);
  const field = e.target;
  const fieldValue = normalizar(field.value);
  const regex = new RegExp("^[a-z]+$");

  if (fieldValue.length < 4 || !regex.test(fieldValue) || !isNaN(fieldValue)) {
    return setErrors(`🚨 Por favor ingrese un ${field.name} válido`, field);
    // console.log(setErrors(`🚨 Por favor ingrese un ${field.name} válido`, field));
  } else {
    return setErrors("", field, false);
    // console.log(setErrors("", field, false));
  }
}

/* ---------------------------------- email --------------------------------- */

function validarEmail(e) {
  // console.log(e.target);
  const field = e.target;
  const fieldValue = normalizar(field.value);
  const regex = new RegExp("^[a-z0-9._-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
  // console.log(!regex.test(fieldValue));

  if (fieldValue.length < 4 || !regex.test(fieldValue)) {
    return setErrors(`🚨 Por favor ingrese un ${field.name} válido`, field);
  } else {
    return setErrors("", field, false);
  }
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(e) {
  // console.log(e.target);
  const field = e.target;
  const fieldValue = field.value;
  const regex = new RegExp(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/
  );
  // console.log(!regex.test(fieldValue));

  if (!regex.test(fieldValue)) {
    return setErrors(
      `🚨 Por favor ingrese una ${field.name} válida. Debe contener mínimo 6 caracteres, incluyendo al menos un número y al menos un carácter especial (!@#$%^&*).`,
      field
    );
  } else {
    return setErrors("", field, false);
  }
}

function compararContrasenias(e, contrasenia) {
  const field = e.target;
  const fieldValue = field.value;

  if (!(fieldValue == contrasenia)) {
    return setErrors(`🚨 Por favor repita su ${field.name}.`, field);
  } else {
    return setErrors("", field, false);
  }
}

/* -------------------------------- agregadas -------------------------------- */

function recorrerEstadoErrores(objeto) {
  let resultado = 0;
  for (let estado in objeto) {
    if (objeto[estado]) {
      resultado++;
    }
  }
  return resultado;
}
