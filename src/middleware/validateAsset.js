import { body } from 'express-validator';

const validateAsset = [
  body('inventory')
    .isNumeric().withMessage('El Numero de Inventario debe ser un numero')
    .withMessage('El Numero de Inventario es obligatorio'),

  body('typeAsset')
    .isNumeric().withMessage('Selecciona un Tipo de Bien')
    .notEmpty().withMessage('El Tipo de Bien es obligatorio'),

  body('area')
    .isNumeric().withMessage('Selecciona un Area de pertenencia')
    .notEmpty().withMessage('El Area es obligatoria'),

  body('building')
    .isNumeric().withMessage('Selecciona un Edificio')
    .notEmpty().withMessage('El Edificio es obligatorio'),

  body('serial')
    .isNumeric().withMessage('El Serial debe ser un numero')
    .notEmpty().withMessage('El Serial es obligatorio'),

  body('status')
    .notEmpty().withMessage('El Estado es obligatorio'),

  body('description')
    .isLength({ max: 100 }).withMessage('La Descripcion debe tener como maximo 100 caracteres')

];

export default validateAsset;
