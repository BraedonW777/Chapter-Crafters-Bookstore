import express from 'express';
import session from 'express-session';


const app = express();

app.use(session({
    secret: 'your_temporary_secret', 
    resave: false,
    saveUninitialized: false,
}));

app.get('/test', (req, res) => {
    console.log('Session ID:', req.session.id);
    res.send('Session Test');
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
