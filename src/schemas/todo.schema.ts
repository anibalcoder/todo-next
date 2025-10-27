import { boolean, object, string } from 'yup'

export const createTodoSchema = object({
  description: string()
    .required('La descripción es obligatoria.')
    .min(4, 'La descripción debe tener al menos 4 caracteres.'),
  completed: boolean().optional(),
})
  .noUnknown(
    true,
    'Solo se permiten las propiedades description y completed (opcional).',
  )
  .strict(true)

export const updateTodoSchema = object({
  description: string()
    .optional()
    .min(4, 'La descripción debe tener al menos 4 caracteres.'),
  completed: boolean().optional(),
})
  .noUnknown(
    true,
    'Solo se permiten las propiedades description (opcional) y completed (opcional).',
  )
  .strict(true)
