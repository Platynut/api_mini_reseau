const checkPassword = (req, res, next) =>{

    const { password } = req.body;

    if (!password) {
        res.status(400).json({error : "Le mot de passe est manquant."});
    }
    if (password.length < 8) {
        res.status(400).json({error : "Le mot de passe doit comporter plus de 8 caractères."});
    }
    if (!/[A-Z]/.test(password)) {
        res.status(400).json({error : "Le mot de passe doit comporter au moins une majuscule."});
    }
    if (!/[a-z]/.test(password)) {
        res.status(400).json({error : "Le mot de passe doit comporter au moins une minuscule."});
    }
    if (!/[0-9]/.test(password)) {
        res.status(400).json({error : "Le mot de passe doit comporter au moins un chiffre."});
    }
    if (!/[!@#$%^&*(),.?:{}|<>]/.test(password)) {
        res.status(400).json({ error: "Le mot de passe doit contenir au moins un caractère spécial."});
    }

    next();
}
module.exports = checkPassword;