import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import ProductFilters from './ProductFilters';

export default function ProductGrid({ products, searchQuery = '', collectionFilter, collectionName }) {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState(null);

  const filtered = useMemo(() => {
    let result = products;

    if (collectionFilter) {
      result = result.filter(collectionFilter);
    }

    if (activeCategory !== 'Todas') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    if (priceRange) {
      result = result.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.notes?.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [products, activeCategory, selectedBrand, priceRange, searchQuery, collectionFilter]);

  return (
    <>
      <ProductFilters
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        selectedBrand={selectedBrand}
        onBrandChange={setSelectedBrand}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
      />

      <div className="product-grid-meta">
        <span className="product-count">{filtered.length} producto{filtered.length !== 1 ? 's' : ''}</span>
        {(selectedBrand || priceRange || activeCategory !== 'Todas') && (
          <button
            className="btn btn-outline btn-sm"
            onClick={() => { setActiveCategory('Todas'); setSelectedBrand(''); setPriceRange(null); }}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="search-results" role="status" aria-live="polite">
          No se encontraron productos que coincidan con tu búsqueda
        </div>
      )}

      <div className="product-grid" role="list" aria-label="Lista de perfumes">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </>
  );
}
