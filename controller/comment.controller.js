const Comment = require('./../model/comment.model');


exports.getAllById = async (req, res) => {
    try {
        let commentList = await Comment.findAll({
            where: {
                idPost: req.params.id 
            }
        });
        res.status(200).json(commentList);
    } catch (e) {
        res.status(400).json({ error: "Impossible de récupérer les commentaires", fe: req.params.id  })
    }
}

exports.create = async (req, res) => {
    try {
        let comment = await Comment.create({
            idPost: req.params.id,
            userId: req.token.id,
            comment: req.body.comment
        });
        res.status(201).json(comment);
    } catch (e) {
        res.status(400).json({ error: "Impossible de créer le commentaire!" })
    }
}

exports.update = async (req, res) => {
    try {
        let comment = await Comment.findOne({
            where: {
                id: req.params.id
            }
        });
        if(req.token.id !== comment.userId){
            return res.status(403).json('Vous n\'avez pas les droits pour modifier ce commentaire');
        }
        if(req.body.comment){
            comment.comment = req.body.comment;
        }
        comment.save();
        res.status(201).json(comment);
    } catch (e) {
        res.status(400).json({ error: "Impossible de modifier ce commentaire" })
    }
}

exports.delete = async (req, res) => {
    try {
        let comment = await Comment.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!comment) {
            return res.status(404).json({ error: "Commentaire introuvable" });
        }
        if(req.token.id !== comment.userId){
            return res.status(403).json('Vous n\'avez pas les droits pour supprimer ce commentaire');
        }
        await comment.destroy();
        res.status(200).json({ message: "Commentaire supprimé avec succès" });
    } catch (e) {
        res.status(400).json({ error: "Impossible de supprimer ce commentaire" })
    }
}

