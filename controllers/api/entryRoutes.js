const router = require('express').Router();
const { Entry } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newEntry = await Entry.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newEntry);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    if(!req.session.logged_in) {
        return res.status(401).json({ message: 'You need to login first.'})
    }
    try {
        const foundEntry = await Entry.findByPk(req.params.id);
        if(!foundEntry) {
            return res.status(404).json({ message: "No entry found with that id."})
        }
        if(foundEntry.user_id !== req.session.user_id) {
            return res.status(403).json({ message: "This entry is not yours to delete."})
        }
        const entryData = await Entry.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(entryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;