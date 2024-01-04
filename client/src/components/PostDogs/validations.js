export default function validation(inputs) {
    let errors = {};
    const WeiHei = /^\d+ - \d+$/
    if (!inputs.name) errors.name = "El nombre o raza es requerido";
    if (inputs.name.length > 35) errors.name = "Excede el maximo de caracteres";
    if (!inputs.life_span) errors.life_span = "El nombre o raza es requerido";
    if (!inputs.heigthI) errors.heigthI = "El nombre o raza es requerido";
    if(!WeiHei.test(inputs.life_span)) errors.life_span = "formato incorrecto";
    if (!inputs.image) errors.image = "debes ingresar la imagen del dog 'URL'";
    return errors;
  }
  