const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!categoriesData) {
      res.status(404).json({ message: 'There is not a catergory with that id.' });
      return;
    }
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
  });
// be sure to include its associated Products
router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoriesData = await Category.create(req.body);
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoriesData = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    if (!categoriesData) {
      res.status(404).json({ message: 'There is not catergory with that id.' });
      return;
    }
    res.status(200).json({ message: `You have successfully updated the category with the id ${req.params.id}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoriesData = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!categoriesData) {
      res.status(404).json({ message: 'There is not catergory with that id.' });
      return;
    }
    res.status(200).json({ message: `You have successfully deleted the category with the id ${req.params.id}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
