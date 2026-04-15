const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper: parse stringified JSON arrays from SQLite back to real arrays
function parseProduct(p) {
  return {
    ...p,
    sizes: JSON.parse(p.sizes || '[]'),
    colors: JSON.parse(p.colors || '[]'),
    new: p.isNew,
  };
}

// GET /api/products - list with filter/sort/search/price range
router.get('/', async (req, res) => {
  try {
    const { category, search, sort, minPrice, maxPrice } = req.query;

    // Build Prisma WHERE clause
    const where = {};
    if (category && category !== 'all') {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { category: { contains: search } },
      ];
    }
    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = Number(minPrice);
      if (maxPrice) where.price.lte = Number(maxPrice);
    }

    // Build Prisma ORDER BY clause
    let orderBy = {};
    if (sort === 'price-asc') orderBy = { price: 'asc' };
    else if (sort === 'price-desc') orderBy = { price: 'desc' };
    else if (sort === 'rating') orderBy = { rating: 'desc' };
    else if (sort === 'newest') orderBy = { createdAt: 'desc' };
    else orderBy = { createdAt: 'asc' };

    const [products, total] = await prisma.$transaction([
      prisma.product.findMany({ where, orderBy }),
      prisma.product.count({ where }),
    ]);

    res.json({
      products: products.map(parseProduct),
      total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - single product
router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(parseProduct(product));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
