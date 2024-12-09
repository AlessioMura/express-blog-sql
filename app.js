const express = require('express');
const app = express();
const cors = require('cors')
const postsRouter = require('./router/posts.js');
const notFoundMiddleware = require('./middlewares/notFound.js');
const loggerMiddleware =require('./middlewares/loggerMiddleware.js');





app.use(express.json());

app.use(cors())

app.use(express.static('public'));

app.listen(3000, () => {
    console.log(`server started on HTTP://LOCALHOST:3000/posts`);

})

app.use('/posts', postsRouter);
app.use('/posts', loggerMiddleware);


app.use(notFoundMiddleware);

app.use((err, req, res, next) => {
    console.log('Error: ', err.message);

    console.error(err.stack);
    res.status(500).send({
        message:'Something went wrong!',
        error: err.message
    });
 });