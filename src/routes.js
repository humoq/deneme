import express from 'express';
import ApiService from './services';

const router = express.Router();

router.get('/summary', async (req, res) => {
    const data = await ApiService.getSummary();

    res.json(data);
})

router.get('/detail/:slug', async (req, res) => {
    const slug = req?.params?.slug;
    const data = await ApiService.getDetail(slug);

    res.json({detail: data?.data, categories: data?.category});
})

router.get('/category/:category', async(req, res) => {
    const category = req?.params?.category;
    const data = await ApiService.getCategory(category);

    res.json(data);
})

router.get('/search/:search', async(req, res) => {
    const search = req?.params?.search;
    const data = await ApiService.search(search);

    res.json(data);
})

router.get('/categories', async (req, res) => {
    const categories = await ApiService.getCategories();

    res.json(categories);
})

module.exports =  router;