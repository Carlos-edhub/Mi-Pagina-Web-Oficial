const collections = [
  {
    id: 'best-sellers',
    name: 'Más vendidos',
    description: 'Los favoritos de nuestros clientes',
    filter: (p) => [11, 1, 3, 21, 23, 12, 14, 30, 5, 16].includes(p.id),
  },
  {
    id: 'under25',
    name: 'Por menos de 25€',
    description: 'Calidad que no parece barata',
    filter: (p) => p.price < 25,
  },
  {
    id: 'nuevos',
    name: 'Nuevos lanzamientos',
    description: 'Las últimas incorporaciones',
    filter: (p) => p.isNew,
  },
  {
    id: 'ofertas',
    name: 'En oferta',
    description: 'Descuentos imperdibles',
    filter: (p) => p.originalPrice !== undefined,
  },
  {
    id: 'unisex',
    name: 'Unisex',
    description: 'Fragancias para todos',
    filter: (p) => p.category === 'Unisex',
  },
  {
    id: 'lattafa',
    name: 'Colección Lattafa',
    description: 'Elegancia árabe tradicional',
    filter: (p) => p.brand === 'Lattafa',
  },
  {
    id: 'armaf',
    name: 'Colección Armaf',
    description: 'Potencia y estilo moderno',
    filter: (p) => p.brand === 'Armaf',
  },
]

export default collections