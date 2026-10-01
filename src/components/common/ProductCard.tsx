import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Edit3, Tag, Layers } from 'lucide-react';
import { Product } from '../../types';
import { StatusBadge } from './StatusBadge';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-[#FFFCF5] rounded-2xl border border-[#DDD7CA] overflow-hidden shadow-card hover:border-[#243FBA]/40 transition-all flex flex-col justify-between"
    >
      <div>
        <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
          <img
            src={product.primaryImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2.5 right-2.5">
            <StatusBadge status={product.stockStatus} size="sm" />
          </div>
          <div className="absolute bottom-2.5 left-2.5 bg-slate-900/80 backdrop-blur-md text-white text-[11px] px-2.5 py-0.5 rounded-full font-mono">
            {product.brand}
          </div>
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-bold text-sm text-[#172033] line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#687085] line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between pt-1">
            <div>
              <span className="text-base font-extrabold text-[#172033]">
                ₹{product.basePrice.toLocaleString()}
              </span>
              {product.mrp > product.basePrice && (
                <span className="text-xs text-[#687085] line-through ml-1.5 font-medium">
                  ₹{product.mrp.toLocaleString()}
                </span>
              )}
            </div>
            <span className="text-xs font-semibold text-[#243FBA] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/60">
              {product.totalStock} units
            </span>
          </div>

          <div className="pt-2 flex flex-wrap gap-1">
            {product.variants.map((v) => (
              <span
                key={v.id}
                className="text-[10px] bg-[#F5F0E6] text-[#172033] px-2 py-0.5 rounded border border-[#DDD7CA] font-mono"
              >
                {v.size} • {v.color}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={() => navigate(`/vendor/catalogue/products/${product.id}/edit`)}
          className="flex items-center justify-center gap-1 px-3 py-2 bg-white text-[#172033] border border-[#DDD7CA] hover:bg-[#F5F0E6] rounded-xl text-xs font-semibold transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5 text-[#687085]" />
          Edit
        </button>

        <button
          onClick={() => navigate(`/vendor/catalogue/products/${product.id}/barcode`)}
          className="flex items-center justify-center gap-1 px-3 py-2 bg-[#243FBA] text-white hover:bg-[#172B82] rounded-xl text-xs font-semibold transition-colors"
        >
          <QrCode className="w-3.5 h-3.5" />
          Barcode
        </button>
      </div>
    </motion.div>
  );
};
