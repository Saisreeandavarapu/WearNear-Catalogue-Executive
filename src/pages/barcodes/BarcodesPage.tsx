import React, { useState } from 'react';
import { useCatalogue } from '../../context/CatalogueContext';
import { QrCode, Search, Printer, Scan } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BarcodesPage: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useCatalogue();
  const [search, setSearch] = useState('');

  const allBarcodes = products.flatMap(p => p.variants.map(v => ({
    productName: p.name,
    brand: p.brand,
    sku: v.sku,
    barcode: v.barcode,
    size: v.size,
    color: v.color,
    price: v.price,
    productId: p.id
  }))).filter(b => b.barcode.includes(search) || b.sku.toLowerCase().includes(search.toLowerCase()) || b.productName.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#172033]">Barcode Master Registry</h2>
          <p className="text-xs text-[#687085]">EAN-13 barcodes, SKU tags, and store label print queues</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search barcode or SKU..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#DDD7CA] rounded-xl text-xs focus:ring-2 focus:ring-[#243FBA] outline-none"
            />
            <Search className="w-3.5 h-3.5 text-[#687085] absolute left-3 top-2.5" />
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#243FBA] text-white text-xs font-bold rounded-xl shadow-xs"
          >
            <Printer className="w-4 h-4" /> Print Sheet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allBarcodes.map((item) => (
          <div key={item.barcode} className="bg-[#FFFCF5] rounded-2xl border border-[#DDD7CA] p-4 shadow-card space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-sm text-[#172033] line-clamp-1">{item.productName}</h4>
                <p className="text-xs text-[#687085] font-mono">{item.color} • Size {item.size}</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#243FBA] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                ₹{item.price}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-[#DDD7CA] text-center font-mono">
              <p className="text-xs font-bold text-[#172033] tracking-widest">{item.barcode}</p>
              <p className="text-[10px] text-[#687085]">{item.sku}</p>
            </div>

            <div className="flex justify-between items-center text-xs pt-1">
              <button
                onClick={() => navigate(`/vendor/catalogue/products/${item.productId}/barcode`)}
                className="text-[#243FBA] font-bold hover:underline"
              >
                Print Individual Tag
              </button>
              <button
                onClick={() => navigate(`/vendor/catalogue/scanner?code=${item.barcode}`)}
                className="text-[#687085] hover:text-[#172033] flex items-center gap-1"
              >
                <Scan className="w-3.5 h-3.5" /> Scan Test
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
