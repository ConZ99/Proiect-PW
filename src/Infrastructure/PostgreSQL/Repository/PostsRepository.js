const {
    queryAsync
} = require('..');

const getAllAsync = async() => {
    console.info ('Getting all posts from database');
    
    return await queryAsync('SELECT * FROM posts');
};

const addAsync = async (title, content, poster) => {
    console.info(`Adding post ${title}`);

    const posts = await queryAsync('INSERT INTO posts (poster, time_posted, time_modified, title, content, views) VALUES ($1, NOW(), NOW(), $2, $3, 0) RETURNING id, title, poster', [poster, title, content]);
    return posts[0];
};

const getByTitle = async (title) => {
    console.info(`Getting post with title ${title}`);
    
    const posts = await queryAsync(`SELECT * FROM posts WHERE title = $1`, [title]);
    return posts[0];
};

const getByIdAsync = async (id) => {
    console.info(`Getting post with title ${id}`)

    const posts = await queryAsync(`SELECT * FROM posts WHERE id = $1`, [id]);
    return posts[0];
}

const updateByIdAsync = async (id, title, content) => {
    console.info(`Updating post with title ${id}`)

    const posts = await queryAsync('UPDATE posts SET title = $1, content = $2, time_modified = NOW() WHERE id = $3 RETURNING *', [title, content, id]);
    return posts[0];
}

const viewAsync = async (id) => {
    console.info(`Viewing post with title ${id}`)

    const posts = await queryAsync('UPDATE posts SET views = ((SELECT views FROM posts)+1) WHERE id = $1 RETURNING *', [id]);
    return posts[0];
}

const deleteByIdAsync = async (id) => {
    console.info(`Deleting the post with id ${id} from database async...`);

    const authors = await queryAsync('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    return authors[0];
    
};

module.exports = {
    getAllAsync,
    addAsync,
    getByTitle,
    getByIdAsync,
    updateByIdAsync,
    deleteByIdAsync,
    viewAsync
}