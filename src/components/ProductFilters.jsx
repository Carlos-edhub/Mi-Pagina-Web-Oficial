import { useState } from 'react';

const BRANDS = ['Lattafa', 'Armaf'];
const CATEGORIES = ['Todas', 'Hombre', 'Mujer'];
const PRICE_RANGES = [
  { label: 'Cualquier precio', min: 0, max: Infinity },
  { label: 'Hasta 20€', min: 0, max: 20 },
  { label: '20€ - 30€', min: 20, max: 30 },
  { label: '30€ - 40€', min: 30, max: 40 },
];

export default function ProductFilters({
  activeCategory, onCategoryChange,
  selectedBrand, onBrandChange,
  priceRange, onPriceRangeChange,
}) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="product-filters-group">
      <div className="product-filters" role="group" aria-label="Filtrar por categoría">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline'}`}
            aria-pressed={activeCategory === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      <button
        className="btn btn-outline btn-filters-toggle"
        onClick={() => setShowMore(!showMore)}
        aria-expanded={showMore}
      >
        {showMore ? '✕ Cerrar filtros' : '☰ Más filtros'}
      </button>

      {showMore && (
        <div className="product-filters-extra">
          <div className="filter-group">
            <label className="filter-label">Marca</label>
            <div className="filter-options">
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => onBrandChange(selectedBrand === brand ? '' : brand)}
                  className={`btn btn-sm ${selectedBrand === brand ? 'btn-primary' : 'btn-outline'}`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Precio</label>
            <div className="filter-options">
              {PRICE_RANGES.map((range, i) => (
                <button
                  key={i}
                  onClick={() => onPriceRangeChange(priceRange?.min === range.min && priceRange?.max === range.max ? null : range)}
                  className={`btn btn-sm ${priceRange?.min === range.min && priceRange?.max === range.max ? 'btn-primary' : 'btn-outline'}`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
