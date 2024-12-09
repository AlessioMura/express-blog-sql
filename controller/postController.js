const { error } = require('console');
const posts = require('../db/db.js')
const fs = require('fs')
const connection = require('../db/sql_db.js')




const index = (req, res) => {

    const sql = 'SELECT * FROM posts'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'database query failed' });

        const responseData = {
            data: results,
            counter: results.length
        }

        res.status(200).json(responseData)
    })


}

const show = (req, res) => {
    const id = req.params.id

    const sql = 'SELECT * FROM posts WHERE id = ?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (!results[0]) return res.status(404).json({ error: `404! Not Found` })


        const responseData = {
            data: results[0]
        }

        res.status(200).json(responseData)

    })
}

const create = (req, res) => {
    const post = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    };

    posts.push(post);
    fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)

    return res.status(201).json({
        status: 201,
        data: posts,
        count: posts.length
    })

}

const update = (req, res) => {
    // find the post by slug
    const singlePost = posts.find(post => post.slug === req.params.slug);


    // check if the user is updating the correct post
    if (!singlePost) {
        return res.status(404).json({ error: 'Post not found' })
    }


    // update the post object
    posts.title = req.body.title;
    posts.slug = req.body.slug;
    posts.content = req.body.content;
    posts.image = req.body.image;
    posts.tags = req.body.tags;


    // update the js file
    fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)


    // return the updated postList item
    res.status(201).json({
        status: 201,
        data: posts,
        counter: posts.length
    })
}

const destroy = (req, res) => {

    const id = req.params.id

    const sql = 'DELETE FROM posts WHERE id = ?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.affectedRows === 0) return res.status(404).json({ error: `404! no post found with this id: ${id}` });

        return res.json({ status: 204, affectedRows: results.affectedRows })
    })

}



module.exports = {
    index,
    show,
    create,
    update,
    destroy
}