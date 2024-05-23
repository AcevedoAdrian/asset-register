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
    .isNumeric().withMessage('Ingrese un Serial valido'),

  body('invoiceNumber')
    .isNumeric().withMessage('Ingrese un Numero de Factura valido'),

  body('typeAsset')
    .isNumeric().withMessage('Tipo de Bien invalido')
    .notEmpty().withMessage('El Tipo de Bien es obligatorio'),

  body('surveyDate')
    .isDate(
      {
        format: 'DD/MM/YYYY',
        strictMode: true
      }).withMessage('La Fecha de Encuesta debe tener el formato YYYY-MM-DD')
    .notEmpty().withMessage('El Tipo de Bien es obligatorio'),

  body('typeAsset')
    .isNumeric().withMessage('Selecciona un Tipo de Bien')
    .notEmpty().withMessage('El Tipo de Bien es obligatorio'),

  body('area')
    .isNumeric().withMessage('Selecciona un Area de pertenencia')
    .notEmpty().withMessage('El Area es obligatoria'),

  body('state')
    .isNumeric().withMessage('Selecciona un Area de pertenencia')
    .notEmpty().withMessage('El Area es obligatoria'),

  body('building')
    .isNumeric().withMessage('Selecciona un Edificio')
    .notEmpty().withMessage('El Edificio es obligatorio'),

  body('weighting')
    .isNumeric().withMessage('Selecciona un Area de pertenencia')
    .notEmpty().withMessage('El Area es obligatoria'),
  body('situation')
    .isNumeric().withMessage('Selecciona un Area de pertenencia')
    .notEmpty().withMessage('El Area es obligatoria'),

  body('situation')
    .isNumeric().withMessage('Selecciona un Edificio')
    .notEmpty().withMessage('El Edificio es obligatorio'),

  body('serial')
    .isNumeric().withMessage('El Serial debe ser un numero')
    .notEmpty().withMessage('El Serial es obligatorio'),

  body('description')
    .isLength({ max: 100 }).withMessage('La Descripcion debe tener como maximo 100 caracteres')

];

export default validateAsset;
