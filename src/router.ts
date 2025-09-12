import { Router } from "express"
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()

// Routing
router.get('/', getProducts)

router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductsById)

router.post('/', 
    body('name').notEmpty().withMessage('El nombre del Producto no puede ir vacío'),
    body('price').isNumeric().withMessage('Ingresa un número válido').notEmpty().withMessage('El precio del Producto no puede ir vacío').custom(value => value > 0).withMessage('Precio nó valido'),
    handleInputErrors,
    createProduct)

router.put('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    body('name').notEmpty().withMessage('El nombre del Producto no puede ir vacío'),
    body('price').isNumeric().withMessage('Ingresa un número válido').notEmpty().withMessage('El precio del Producto no puede ir vacío').custom(value => value > 0).withMessage('Precio nó valido'),
    body('availability').notEmpty().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct)

router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)

router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)

export default router