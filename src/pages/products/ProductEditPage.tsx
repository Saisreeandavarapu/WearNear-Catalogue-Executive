import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { ArrowLeft, Save } from 'lucide-react';

export const ProductEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, updateProduct } = useCatalogue();

  const product = products.find(p => p.id === id) || products[0];

  const [name, setName] = useState(product.name);
  const [basePrice, setBasePrice] = useState(product.basePrice);
  const [description, setDescription] = useState(product.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProduct(product.id, {
      name,
      basePrice: Number(basePrice),
      description
    });
    navigate(`/vendor/catalogue/products/${product.id}`);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/vendor/catalogue/products/${product.id}`)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Cancel Edit
        </button>

        <span className="text-xs font-bold text-[#243FBA] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Edit Item #{product.id}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-4">
        <h3 className="font-extrabold text-base text-[#172033] pb-2 border-b border-[#DDD7CA]">
          Edit Product Catalogue Record
        </h3>

        <div>
          <label className="text-xs font-bold text-[#172033] block mb-1">Product Title</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#172033] block mb-1">Base Price (₹)</label>
          <input
            type="number"
            value={basePrice}
            onChange={(e) => setBasePrice(Number(e.target.value))}
            required
            className="w-full px-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-[#172033] block mb-1">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#243FBA] hover:bg-[#172B82] text-white text-xs font-extrabold rounded-xl shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};
