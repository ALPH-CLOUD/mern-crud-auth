// función para ejecutar la validación de un esquema
export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (err) {
        return  res.status(400).json(err.errors.map(error => error.message) )
    }
}