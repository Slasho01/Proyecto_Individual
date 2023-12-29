export default function validation(inputs) {
    let errors = {};
    const contra = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    const mail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!inputs.email) errors.email = "Email is required.";
    if (inputs.email.length > 35) errors.email = "Excede el maximo de caracteres";
    if (!mail.test(inputs.email)) errors.email = "formato incorrecto";
    if (!contra.test(inputs.password)) errors.password = "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula.";
    return errors;
  }
  