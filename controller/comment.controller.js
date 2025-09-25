const Comment = require('./../model/comment.model');


exports.getAllById = async (req, res) => {
    try {
        let commentList = await Comment.findAll({
            where: {
                postId: req.params.postId 
            }
        });
        res.status(200).json(commentList);
    } catch (e) {
        res.status(400).json({ error: "Impossible de récupérer les produits" })
    }
}

exports.create = async (req, res) => {
    try {
        let body = JSON.parse(req.body);
        let comment = await Comment.create({
            idPost: body.id,
            userId: body.userId,
            comment: body.comment
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
        let comment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if(req.token.id !== comment.userId){
            return res.status(403).json('Vous n\'avez pas les droits pour supprimer ce commentaire');
        }
        res.status(200).json(comment);
    } catch (e) {
        res.status(400).json({ error: "Impossible de supprimer ce commentaire" })
    }
}

