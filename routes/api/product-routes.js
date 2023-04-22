const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Tag, attributes: ['id', 'tag_name'], through: { attributes: [] } },
      ],
    });
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single product by its `id`
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, attributes: ['id', 'category_name'] },
        { model: Tag, attributes: ['id', 'tag_name'], through: { attributes: [] } },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: 'No product found with this id' });
    }

    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST: create a new product
router.post('/', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT: update a product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedProduct[0]) {
      return res.status(404).json({ message: 'No product found with this id' });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE: delete a product by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: { id: req.params.id },
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: 'No product found with this id' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;