const router = require('express').Router();
const apiRoutes = require('./api');
const { Entry, User } = require('../models');

router.use('./api', apiRoutes);

router.get('/', async (req, res) => {
    const entryData = await Entry.findAll().catch((err) => {
        res.json(err);
    });
    const entries = entryData.map((entry) => entry.get({ plain: true}));

    res.render('index', {
        logged_in:req.session.logged_in,
        projects
    })
});

router.get('/entry/:id', async (req, res) => {
    const entryData = await Entry.findByPk(req.params.id).catch((err) => {
        res.json(err);
    });
    const entries = entryData.get({ plain: true });
    entries.logged_in = req.session.logged_in;
    res.render('viewentry', entries);
});

router.get('/users', async (req, res) => {
    const userData = await User.findAll().catch((err) => {
        res.json(err);
    });
    res.json(userData);
});

router.get('/login', async (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/profile')
    }
    res.render("login", {logged_in:req.session.logged_in});
});

router.get("/profile", async (req, res) => {
    if(!req.session.logged_in) {
        res.redirect('/login')
    } else {
        const me = await User.findByPk(req.session.user_id, {
            attributes: {
                exclude: ['password']
            },
            include: [Entry]
        })
        const meJson = me.get({ plain: true })
        meJson.logged_in = true;
        res.render("profile", meJson);
    }
})

module.exports = router;