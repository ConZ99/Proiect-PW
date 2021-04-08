const express = require('express');

const PostsRepository = require('../../Infrastructure/PostgreSQL/Repository/PostsRepository.js');
const ServerError = require('../Models/ServerError.js');
const { PostPostBody, PostPutBody, PostResponse } = require('../Models/Post.js');

const ResponseFilter = require('../Filters/ResponseFilter.js');

const Router = express.Router();

Router.post('/', async (req, res) => {
    
    const postBody = new PostPostBody(req.body);

    const post = await PostsRepository.addAsync(postBody.title, postBody.content, postBody.poster);

    ResponseFilter.setResponseDetails(res, 201, new PostResponse(post), req.originalUrl);
});

Router.get('/', async (req, res) => {

    const posts = await PostsRepository.getAllAsync();

    ResponseFilter.setResponseDetails(res, 200, posts.map(post => new PostResponse(post)));
});

Router.get('/:id', async (req, res) => {
    let {
        id
    } = req.params;

    id = parseInt(id);

    if (!id || id < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }
       
    const post = await PostsRepository.getByIdAsync(id);
    
    if (!post) {
        throw new ServerError(`Post with id ${id} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new PostResponse(post));
});

Router.put('/:id', async (req, res) => {

    const postBody = new PostPutBody(req.body, req.params.id);

    const post = await PostsRepository.updateByIdAsync(postBody.id, postBody.title, postBody.content);
        
    if (!post) {
        throw new ServerError(`Post with id ${id} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 200, new PostResponse(post));
});

Router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;

    if (!id || id < 1) {
        throw new ServerError("Id should be a positive integer", 400);
    }
    
    const post = await PostsRepository.deleteByIdAsync(parseInt(id));
    
    if (!post) {
        throw new ServerError(`Post with id ${id} does not exist!`, 404);
    }

    ResponseFilter.setResponseDetails(res, 204, "Entity deleted succesfully");
});

module.exports = Router;