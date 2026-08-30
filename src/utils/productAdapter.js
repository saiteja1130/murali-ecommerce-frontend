/**
 * Unified Product Adapter & Normalizer for Murari's Glam & Glow
 * Bridges MongoDB database models with Storefront UI contracts
 */

export const resolveImageUrl = (img) => {
  if (!img) return 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900';
  if (img.startsWith('http://') || img.startsWith('https://')) return img;
  if (img.startsWith('/uploads')) return `http://localhost:5000${img}`;
  return img;
};

export const normalizeProduct = (item) => {
  if (!item) return null;

  // 1. Image Resolution (Handles images[], galleryImages[], image, hoverImage, local /uploads)
  const rawImages = Array.isArray(item.images) && item.images.length > 0
    ? item.images
    : (Array.isArray(item.galleryImages) && item.galleryImages.length > 0
      ? item.galleryImages
      : [item.image || item.hoverImage || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900']);

  const images = rawImages.map(resolveImageUrl);
  const primaryImage = images[0] || resolveImageUrl(item.image);
  const hoverImage = images[1] || resolveImageUrl(item.hoverImage) || primaryImage;

  // 2. Variant, Color & Size Matrix Extraction
  let colors = [];
  let sizes = [];
  let totalStock = 0;

  if (Array.isArray(item.variants) && item.variants.length > 0) {
    const colorMap = new Map();
    const sizeSet = new Set();

    item.variants.forEach((v) => {
      totalStock += (v.stock || 0);
      if (v.color) {
        const name = v.color.trim();
        const hex = v.colorHex || '#1D241C';
        if (!colorMap.has(name.toLowerCase())) {
          colorMap.set(name.toLowerCase(), { name, hex });
        }
      }
      if (v.size) {
        sizeSet.add(v.size.trim());
      }
    });

    colors = Array.from(colorMap.values());
    sizes = Array.from(sizeSet);
  } else {
    colors = Array.isArray(item.colors) ? item.colors : [{ name: 'Standard', hex: '#1D241C' }];
    sizes = Array.isArray(item.sizes) ? item.sizes : ['One Size'];
    totalStock = item.totalStock !== undefined ? item.totalStock : (item.isStockAvailable !== false ? 25 : 0);
  }

  if (colors.length === 0) {
    colors = [{ name: 'Standard', hex: '#1D241C' }];
  }
  if (sizes.length === 0) {
    sizes = ['One Size'];
  }

  // 3. Category Resolution (Supports populated ObjectId or string)
  let categoryName = 'All';
  let categorySlug = 'all';
  let categoryId = '';

  if (item.category && typeof item.category === 'object') {
    categoryName = item.category.name || 'All';
    categorySlug = item.category.slug || item.category.name?.toLowerCase().replace(/ /g, '-') || 'all';
    categoryId = item.category._id || item.category.id || '';
  } else if (typeof item.category === 'string') {
    categoryName = item.category;
    categorySlug = item.category.toLowerCase().replace(/ /g, '-');
    categoryId = item.category;
  }

  // 4. Main Category Resolution (Women, Kids, Men, etc.)
  let mainCategoryName = '';
  let mainCategorySlug = '';
  let mainCategoryId = '';

  if (item.mainCategory && typeof item.mainCategory === 'object') {
    mainCategoryName = item.mainCategory.name || '';
    mainCategorySlug = item.mainCategory.slug || '';
    mainCategoryId = item.mainCategory._id || item.mainCategory.id || '';
  } else if (typeof item.mainCategory === 'string') {
    mainCategoryName = item.mainCategory;
    mainCategorySlug = item.mainCategory.toLowerCase();
    mainCategoryId = item.mainCategory;
  }

  // 5. Badge & Promotion derivation
  let badge = item.badge || null;
  const originalPrice = item.originalPrice ? Number(item.originalPrice) : null;
  const currentPrice = typeof item.price === 'number' ? item.price : Number(item.price) || 0;

  if (!badge) {
    if (originalPrice && originalPrice > currentPrice) {
      badge = 'SALE';
    } else if (item.isNew) {
      badge = 'NEW';
    }
  }

  return {
    id: item._id || item.id || `prod-${Math.random().toString(36).slice(2, 7)}`,
    name: item.name || 'Featured Product',
    slug: item.slug || item.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'product',
    sku: item.sku || 'MGG-000',
    category: categoryName,
    categorySlug,
    categoryId,
    mainCategory: mainCategoryName,
    mainCategorySlug,
    mainCategoryId,
    subcategory: item.subcategory || categoryName,
    price: currentPrice,
    originalPrice,
    badge,
    image: primaryImage,
    hoverImage,
    galleryImages: images,
    colors,
    sizes,
    variants: item.variants || [],
    totalStock,
    isStockAvailable: item.isStockAvailable !== false && (totalStock > 0 || (Array.isArray(item.variants) && item.variants.length === 0)),
    rating: item.rating || 5.0,
    reviews: item.reviews || item.reviewCount || 12,
    description: item.description || '',
    composition: item.composition || '100% Premium Quality Materials',
    sustainability: item.sustainability || 'Eco-Friendly & Durable Design',
    careInstructions: item.careInstructions || 'Hand wash or gentle machine wash in cold water',
    dimensions: item.dimensions || '',
    createdAt: item.createdAt || new Date().toISOString()
  };
};

export const normalizeCategory = (cat) => {
  if (!cat) return null;
  return {
    id: cat._id || cat.id || `cat-${Math.random().toString(36).slice(2, 7)}`,
    name: cat.name || 'Category',
    slug: cat.slug || cat.name?.toLowerCase().replace(/ /g, '-') || 'category',
    mainCategory: cat.mainCategory?.name || (typeof cat.mainCategory === 'string' ? cat.mainCategory : ''),
    mainCategorySlug: cat.mainCategory?.slug || (typeof cat.mainCategory === 'string' ? cat.mainCategory.toLowerCase() : ''),
    mainCategoryId: cat.mainCategory?._id || cat.mainCategory?.id || cat.mainCategory || '',
    image: resolveImageUrl(cat.image),
    description: cat.description || '',
    subtitle: cat.subtitle || cat.description || 'Featured Collection',
    itemCount: typeof cat.itemCount === 'number' ? cat.itemCount : 0,
    isFeatured: cat.isFeatured !== false,
    order: cat.order || 0
  };
};

export const normalizeMainCategory = (mCat) => {
  if (!mCat) return null;
  return {
    id: mCat._id || mCat.id || `mcat-${Math.random().toString(36).slice(2, 7)}`,
    name: mCat.name || 'Department',
    slug: mCat.slug || mCat.name?.toLowerCase().replace(/ /g, '-') || 'department',
    image: resolveImageUrl(mCat.image),
    description: mCat.description || '',
    subcategoryCount: mCat.subcategoryCount || 0,
    isActive: mCat.isActive !== false,
    order: mCat.order || 0,
  };
};
