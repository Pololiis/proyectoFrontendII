/* ---------------------------------- texto --------------------------------- */
function validarTexto(texto) {
  let textoNormalizado = normalizarTexto(texto);
  let regExp = new RegExp("^[a-zA-Z]+$");
  return (
    regExp.test(textoNormalizado) &&
    textoNormalizado.length >= 3 &&
    isNaN(textoNormalizado)
  );
}

function normalizarTexto(texto) {
  return texto.trim().toLowerCase();
}

/* ---------------------------------- email --------------------------------- */
function normalizarEmail(email) {
  return email.toLowerCase();
}
function validarEmail(email) {
  let emailNormalizado = normalizarEmail(email);
  let regExp = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}");
  return regExp.test(emailNormalizado);
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
  let regExp = new RegExp(
    "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,10}$"
  );
  return regExp.test(contrasenia);
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
  return contrasenia_1 === contrasenia_2;
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

function mostrarErrores(objeto) {
  let errores = [];

  if (!objeto.firstName) {
    errores.push(
      `- El nombre debe tener al menos 3 caracteres y no tener valores numéricos.`
    );
  }

  if (!objeto.lastName) {
    errores.push(
      `- El apellido debe tener al menos 3 caracteres y no tener valores numéricos.`
    );
  }

  if (!objeto.email) {
    errores.push(`- Debe ingresar un email válido.`);
  }

  if (!objeto.password) {
    errores.push(
      `- Contraseña inválida. Tu contraseña debe contener entre 8 y 10 caracteres, incluyendo al menos un número y al menos un carácter especial (!@#$%^&*).`
    );
  }

  if (!objeto.repeatPassword) {
    errores.push(`- Las contraseñas no coinciden.`);
  }

  return errores;
}
