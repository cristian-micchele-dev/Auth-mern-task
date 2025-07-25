
export const validatorSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body); //parse lo que hace es validar
        next();
    } catch (error) {
        return res.status(400).json( error.issues.map((issue) => issue.message) ); //issues es un array de errores}
}
}