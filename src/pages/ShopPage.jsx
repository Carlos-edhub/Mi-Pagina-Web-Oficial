import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import products from '../data/products';

export default function ShopPage() {
  const [params] = useSearchParams();
  const searchQuery = params.get('search') || '';

  return (
    <main id="main-content">
      <section id="tienda" className="shop" aria-labelledby="shop-title">
        <div className="container">
          <header className="shop-head">
            <div>
              <h2 id="shop-title"><span>T</span>ienda</h2>
              <p>{searchQuery ? `Resultados para "${searchQuery}"` : 'Explora nuestras fragancias más buscadas'}</p>
            </div>
          </header>

          <ProductGrid products={products} searchQuery={searchQuery} />
        </div>
      </section>
    </main>
  );
}
