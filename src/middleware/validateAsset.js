import { body } from 'express-validator';
import { Asset } from '../models/index.js';
const validateAsset = [
  body('inventory')
    .isNumeric().withMessage('El Numero de Inventario debe ser un numero')
    .withMessage('El Numero de Inventario es obligatorio')
    .custom(async value => {
      const inventory = await Asset.findOne({ where: { inventory: value } });
      if (inventory) {
        // Will use the below as the error message
        throw new Error('El Numero de Inventario ya existe');
      }
    }),
  body('serial')
    .optional()
    .isNumeric().withMessage('Ingrese un Serial valido'),
  body('invoiceNumber')
    .optional()
    .isNumeric().withMessage('Ingrese un Numero de Factura valido'),

  body('surveyDate')
    .isISO8601().withMessage('Date must be in the format yyyy-mm-dd')
    .notEmpty().withMessage('La fecha es obligatoria'),

  body('typeAsset')
    .isNumeric().withMessage('Selecciona un Tipo de Bien')
    .notEmpty().withMessage('El Tipo de Bien es obligatorio'),

  body('area')
    .isNumeric().withMessage('Selecciona un Area de pertenencia')
    .notEmpty().withMessage('El Area es obligatoria'),

  body('state')
    .optional()
    .isNumeric().withMessage('Selecciona un Estado de pertenencia'),

  body('building')
    .isNumeric().withMessage('Selecciona un Edificio')
    .notEmpty().withMessage('El Edificio es obligatorio'),

  body('weighting')
    .isNumeric().withMessage('Selecciona un Ponderacion de pertenencia'),

  body('situation')
    .isNumeric().withMessage('Selecciona un Situacion de pertenencia'),

  body('description')
    .optional()
    .isLength({ max: 100 }).withMessage('La Descripcion debe tener como maximo 100 caracteres')

];

export default validateAsset;
