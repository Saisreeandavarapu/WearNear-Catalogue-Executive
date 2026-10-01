import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { ProductCard } from '../../components/common/ProductCard';
import { PlusCircle, Search, Tags } from 'lucide-react';
import { EmptyState } from '../../components/common/EmptyState';

export const ProductsListPage: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useCatalogue();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.skuBase.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#172033]">Product Catalogue Registry</h2>
          <p className="text-xs text-[#687085]">Manage apparel, fashion items, color variants, and SKU barcodes</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product or SKU..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-xs focus:ring-2 focus:ring-[#243FBA] outline-none"
            />
            <Search className="w-3.5 h-3.5 text-[#687085] absolute left-3 top-2.5" />
          </div>

          <button
            onClick={() => navigate('/vendor/catalogue/products/add')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            Add Product
          </button>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Products Found"
          description="No fashion catalogue items match your search query."
          icon={Tags}
        />
      )}
    </div>
  );
};
