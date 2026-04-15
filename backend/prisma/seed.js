const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fetchExternalData() {
  console.log('  → Fetching from FakeStore API...');
  const response = await fetch('https://fakestoreapi.com/products');
  const data = await response.json();
  
  const menProducts = data.filter(p => p.category === "men's clothing");
  const womenProducts = data.filter(p => p.category === "women's clothing");

  const mapped = [];

  // Map Men's clothing → category: 'men'
  for (const p of menProducts) {
    mapped.push({
      name: p.title.length > 80 ? p.title.slice(0, 80) : p.title,
      price: Math.round(p.price * 100) / 100,
      category: 'men',
      brand: 'Maison Homme',
      rating: p.rating.rate,
      reviews: p.rating.count,
      stock: Math.floor(Math.random() * 40) + 10,
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['Black', 'White', 'Charcoal']),
      description: p.description,
      image: p.image,
      featured: Math.random() > 0.5,
      isNew: Math.random() > 0.5,
    });
  }

  // Map Women's clothing → category: 'women'
  for (const p of womenProducts) {
    mapped.push({
      name: p.title.length > 80 ? p.title.slice(0, 80) : p.title,
      price: Math.round(p.price * 100) / 100,
      category: 'women',
      brand: 'Maison Femme',
      rating: p.rating.rate,
      reviews: p.rating.count,
      stock: Math.floor(Math.random() * 40) + 10,
      sizes: JSON.stringify(['XS', 'S', 'M', 'L']),
      colors: JSON.stringify(['Beige', 'Ivory', 'Blush']),
      description: p.description,
      image: p.image,
      featured: Math.random() > 0.5,
      isNew: Math.random() > 0.5,
    });
  }

  return mapped;
}

function generateKidsData() {
  return [
    {
      name: "Cashmere Blend Cardigan",
      price: 85.0,
      category: 'kids',
      brand: "Petit Maison",
      rating: 4.8,
      reviews: 42,
      stock: 20,
      sizes: JSON.stringify(['2Y', '4Y', '6Y', '8Y']),
      colors: JSON.stringify(['Cream', 'Oatmeal']),
      description: "A beautifully soft cashmere blend cardigan for the little ones. Quiet luxury starts early.",
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
      featured: true,
      isNew: true,
    },
    {
      name: "Linen Wide-Leg Trousers",
      price: 65.0,
      category: 'kids',
      brand: "Petit Maison",
      rating: 4.6,
      reviews: 28,
      stock: 35,
      sizes: JSON.stringify(['2Y', '4Y', '6Y', '8Y']),
      colors: JSON.stringify(['Sand', 'Navy']),
      description: "Breathable, lightweight linen trousers designed for comfort and effortless style.",
      image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80",
      featured: false,
      isNew: false,
    },
    {
      name: "Cotton Knit Sweater",
      price: 75.0,
      category: 'kids',
      brand: "Petit Maison",
      rating: 4.9,
      reviews: 64,
      stock: 15,
      sizes: JSON.stringify(['2Y', '4Y', '6Y', '8Y']),
      colors: JSON.stringify(['Navy', 'Grey Marl']),
      description: "Classic cotton knit sweater perfect for layering during transitional seasons.",
      image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
      featured: true,
      isNew: false,
    },
    {
      name: "Pinafore Dress",
      price: 55.0,
      category: 'kids',
      brand: "Petit Maison",
      rating: 4.7,
      reviews: 31,
      stock: 25,
      sizes: JSON.stringify(['2Y', '4Y', '6Y']),
      colors: JSON.stringify(['Sage', 'Dusty Rose']),
      description: "An elegant pinafore dress crafted from soft organic cotton. Timeless styling for the little fashion forward.",
      image: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80",
      featured: false,
      isNew: true,
    },
  ];
}

async function main() {
  console.log('Clearing existing products from database...');
  await prisma.product.deleteMany();

  console.log('Fetching live product data from FakeStore API...');
  const adultClothing = await fetchExternalData();
  
  console.log('Generating Kids collection...');
  const kidsClothing = generateKidsData();
  
  const allProducts = [...adultClothing, ...kidsClothing];

  console.log(`Inserting ${allProducts.length} products into database...`);
  for (const product of allProducts) {
    await prisma.product.create({ data: product });
  }
  
  console.log(`\n✅ Database seeded with ${allProducts.length} products!`);
  console.log(`   → Men: ${adultClothing.filter(p => p.category === 'men').length} items`);
  console.log(`   → Women: ${adultClothing.filter(p => p.category === 'women').length} items`);
  console.log(`   → Kids: ${kidsClothing.length} items`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
