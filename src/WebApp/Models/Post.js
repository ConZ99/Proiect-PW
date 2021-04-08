const ServerError = require('./ServerError.js');

class PostPostBody {
    constructor (body) {
        this.poster = body.poster
        this.time_posted = body.time_posted
        this.time_modified = body.time_modified
        this.content = body.content
        this.views = body.views
    }

    get Poster () {
        return this.poster;
    }

    get Time_posted () {
        return this.time_posted;
    }

    get Time_modified () {
        return this.time_modified;
    }

    get Content () {
        return this.content;
    }

    get Views () {
        return this.views;
    }
}

class PostPutBody extends PostPostBody {
    constructor (body, id) {
        super(body);
        this.id = parseInt(id);

        if (!this.id || this.id < 1) {
            throw new ServerError("Id should be a positive integer", 400);
        }
    }

    get Id () {
        return this.id;
    }
}

class PostResponse {
    constructor(post) {
        this.poster = post.poster;
        this.time_modified = post.time_modified;
        this.id = post.id;
    }
}

module.exports =  {
    PostPostBody,
    PostPutBody,
    PostResponse
}