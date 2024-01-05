export default function validation(inputs) {
    let errors = {};
    const WeiHei = /^\d+ - \d+$/
    const nameVal = /^[a-zA-Z\s]+$/
    //const formato = /^[a-zA-Z0-9 -]+$/
    if (!inputs.name) errors.name = "El nombre o raza es requerido";
    if (inputs.name.length > 35) errors.name = "Excede el maximo de caracteres";
    if(!nameVal.test(inputs.name)) errors.name = "No puedes ingresar numeros ni simbolos"
    if (!inputs.life_span) errors.life_span = "El nombre o raza es requerido";
    if (!inputs.heigthI) errors.heigthI = "El nombre o raza es requerido";
    if(!WeiHei.test(inputs.life_span)) errors.life_span = "Solo numeros en el formato indicado";
    if (!inputs.image) errors.image = "debes ingresar la imagen del dog 'URL'";
    return errors;
  }
  