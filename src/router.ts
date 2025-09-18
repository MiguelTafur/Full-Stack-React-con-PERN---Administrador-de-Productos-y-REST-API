import { Router } from "express"
import { createProduct, deleteProduct, getProducts, getProductsById, updateAvailability, updateProduct } from "./handlers/product"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties: 
 *                  id:
 *                      type: integer
 *                      description: The Product ID    
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product Name    
 *                      example: Monitor Curvo 49 Pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product Price    
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product Availability    
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *    get: 
 *      summary: Get a list of products
 *      tags:
 *         - Products
 *      description: Return a list of products
 *      responses:
 *          200:
 *              description: successfull Response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 */

router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get: 
 *      summary: Get a Product by ID 
 *      tags: 
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The Id of the product to retrieve
 *          required: true
 *          schema: 
 *              type: integer
 *      responses: 
 *          200:
 *              description: successfull Response
 *              content:
 *                  application/json:   
 *                      schema: 
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Not found
 *          404:
 *              description: Bad request - Invalid ID
 */             

router.get('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    getProductsById)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name: 
 *                              type: string
 *                              example: "Monitor curvo de 49 pulgadas"
 *                          price: 
 *                              type: number
 *                              example: 300
 *      responses:
 *          201:
 *              description: Product created successfully
 *          400:
 *              description: Bad request - Invalid input data
 */

router.post('/', 
    body('name').notEmpty().withMessage('El nombre del Producto no puede ir vacío'),
    body('price').isNumeric().withMessage('Ingresa un número válido').notEmpty().withMessage('El precio del Producto no puede ir vacío').custom(value => value > 0).withMessage('Precio nó valido'),
    handleInputErrors,
    createProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags: 
 *          - Products
 *      description: Returns the update product
 *      parameters: 
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema: 
 *              type: integer
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 51 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 259
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successfull response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID or Invalid input data
 *          404:
 *              description: Product not found
 */
router.put('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    body('name').notEmpty().withMessage('El nombre del Producto no puede ir vacío'),
    body('price').isNumeric().withMessage('Ingresa un número válido').notEmpty().withMessage('El precio del Producto no puede ir vacío').custom(value => value > 0).withMessage('Precio no válido'),
    body('availability').notEmpty().withMessage('Valor para disponibilidad no válido'),
    handleInputErrors,
    updateProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *     summary: Updates product availability
 *     tags: 
 *         - Products
 *     description: Returns the update availability
 *     parameters: 
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema: 
 *             type: integer
 *     responses:
 *          200:
 *              description: Successfull response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - Invalid ID 
 *          404:
 *              description: Product not found
 */
router.patch('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *     summary: Deletes a product by a given ID
 *     tags: 
 *         - Products
 *     description: Returns a confirmation message 
 *     parameters: 
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema: 
 *             type: integer     
 *     responses:
 *          200:
 *              description: Successfull response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Poducto Eliminado'
 *          400:
 *              description: Bad request - Invalid ID 
 *          404:
 *              description: Product not found 
 */
router.delete('/:id', 
    param('id').isInt().withMessage('ID no válido'),
    handleInputErrors,
    deleteProduct
)

export default router