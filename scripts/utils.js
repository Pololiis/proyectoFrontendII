/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {}

function normalizarTexto(texto) {}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
  let regExp = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}");
  if (regExp.test(email)) {
    return true;
  } else {
    alert("El correo es inválido.");
    return false;
  }
}

function normalizarEmail(email) {}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
  let regExp = new RegExp(
    "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,10}$"
  );
  if (regExp.test(contrasenia)) {
    return true;
  } else {
    // alert(
    //   "La contraseña debe tener entre 8 y 10 caracteres, al menos una mayúscula, un número y un caracter especial"
    // );
    return false;
  }
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
  if (contrasenia_1 === contrasenia_2) {
    return true;
  } else {
    //alert("Las contraseñas no coinciden.");
    return false;
  }
}
