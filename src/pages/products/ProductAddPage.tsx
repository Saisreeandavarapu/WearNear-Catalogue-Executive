import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCatalogue } from '../../context/CatalogueContext';
import { ArrowLeft, Save, Plus, Trash2, Camera, Upload } from 'lucide-react';

export const ProductAddPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProduct } = useCatalogue();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('WearNear Atelier');
  const [category, setCategory] = useState('Shirts');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState(1999);
  const [mrp, setMrp] = useState(2499);
  const [skuBase, setSkuBase] = useState('WN-SHIRT-NEW');

  const [variants, setVariants] = useState([
    { size: 'M', color: 'Midnight Black', colorHex: '#000000', stock: 10, price: 1999, barcode: 'WN890999000111' },
    { size: 'L', color: 'Midnight Black', colorHex: '#000000', stock: 10, price: 1999, barcode: 'WN890999000112' }
  ]);

  const handleAddVariant = () => {
    setVariants([...variants, { size: 'XL', color: 'Midnight Black', colorHex: '#000000', stock: 5, price: basePrice, barcode: `WN890${Date.now().toString().slice(-6)}` }]);
  };

  const handleRemoveVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name,
      brand,
      category,
      description,
      basePrice: Number(basePrice),
      mrp: Number(mrp),
      skuBase,
      variants: variants.map((v, idx) => ({
        id: `v-new-${idx}`,
        sku: `${skuBase}-${v.color.slice(0, 3).toUpperCase()}-${v.size}`,
        barcode: v.barcode,
        size: v.size,
        color: v.color,
        colorHex: v.colorHex,
        stock: Number(v.stock),
        price: Number(v.price)
      }))
    });

    navigate('/vendor/catalogue/products');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/vendor/catalogue/products')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#687085] hover:text-[#243FBA]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </button>

        <span className="text-xs font-bold text-[#243FBA] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          New Catalogue Entry
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-4">
          <h3 className="font-extrabold text-base text-[#172033] pb-2 border-b border-[#DDD7CA]">
            1. Basic Product Specifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#172033] block mb-1">Product Title</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Italian Linen Casual Shirt"
                required
                className="w-full px-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#172033] block mb-1">Brand Name</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#172033] block mb-1">Fashion Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
              >
                <option value="Shirts">Shirts</option>
                <option value="Trousers">Trousers</option>
                <option value="Outerwear">Outerwear</option>
                <option value="Dresses">Dresses</option>
                <option value="T-Shirts">T-Shirts</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-[#172033] block mb-1">Base SKU Root</label>
              <input
                type="text"
                value={skuBase}
                onChange={(e) => setSkuBase(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-sm font-mono focus:ring-2 focus:ring-[#243FBA] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#172033] block mb-1">Product Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe fabric weave, fit, and care instructions..."
              className="w-full p-3 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
            />
          </div>
        </div>

        {/* Section 2: Pricing */}
        <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-4">
          <h3 className="font-extrabold text-base text-[#172033] pb-2 border-b border-[#DDD7CA]">
            2. Retail Pricing Strategy
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#172033] block mb-1">Selling Price (₹)</label>
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                required
                className="w-full px-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-[#172033] block mb-1">Maximum Retail Price MRP (₹)</label>
              <input
                type="number"
                value={mrp}
                onChange={(e) => setMrp(Number(e.target.value))}
                required
                className="w-full px-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-sm focus:ring-2 focus:ring-[#243FBA] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Variants */}
        <div className="bg-[#FFFCF5] rounded-3xl border border-[#DDD7CA] p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#DDD7CA]">
            <h3 className="font-extrabold text-base text-[#172033]">
              3. Color & Size Variants Matrix
            </h3>
            <button
              type="button"
              onClick={handleAddVariant}
              className="px-3 py-1.5 bg-[#243FBA] text-white text-xs font-bold rounded-xl flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Variant
            </button>
          </div>

          <div className="space-y-3">
            {variants.map((v, i) => (
              <div key={i} className="p-3 bg-white rounded-2xl border border-[#DDD7CA] grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
                <div>
                  <label className="text-[10px] font-bold text-[#687085] block">Size</label>
                  <input
                    type="text"
                    value={v.size}
                    onChange={(e) => {
                      const newV = [...variants];
                      newV[i].size = e.target.value;
                      setVariants(newV);
                    }}
                    className="w-full px-2 py-1 text-xs border border-[#DDD7CA] rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#687085] block">Color</label>
                  <input
                    type="text"
                    value={v.color}
                    onChange={(e) => {
                      const newV = [...variants];
                      newV[i].color = e.target.value;
                      setVariants(newV);
                    }}
                    className="w-full px-2 py-1 text-xs border border-[#DDD7CA] rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#687085] block">Stock Qty</label>
                  <input
                    type="number"
                    value={v.stock}
                    onChange={(e) => {
                      const newV = [...variants];
                      newV[i].stock = Number(e.target.value);
                      setVariants(newV);
                    }}
                    className="w-full px-2 py-1 text-xs border border-[#DDD7CA] rounded-lg"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#687085] block">Barcode</label>
                  <input
                    type="text"
                    value={v.barcode}
                    onChange={(e) => {
                      const newV = [...variants];
                      newV[i].barcode = e.target.value;
                      setVariants(newV);
                    }}
                    className="w-full px-2 py-1 text-xs border border-[#DDD7CA] rounded-lg font-mono"
                  />
                </div>

                <div className="flex justify-end pt-3 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(i)}
                    className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-[#243FBA] hover:bg-[#172B82] text-white text-sm font-extrabold rounded-2xl shadow-md transition-colors"
          >
            <Save className="w-4 h-4" /> Save Product & Publish to Store
          </button>
        </div>
      </form>
    </div>
  );
};
