import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, totalItems, pageSize = 10 }) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems || 0);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      {totalItems && <p className="text-sm text-slate-500">Showing {startItem} to {endItem} of {totalItems} entries</p>}
      <div className="flex items-center gap-1">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50"><ChevronLeft className="w-5 h-5" /></button>
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page = i + 1;
          return (
            <button key={page} onClick={() => onPageChange(page)} className={`min-w-[40px] h-10 rounded-lg font-medium ${page === currentPage ? 'bg-amber-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
              {page}
            </button>
          );
        })}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-lg hover:bg-slate-100 disabled:opacity-50"><ChevronRight className="w-5 h-5" /></button>
      </div>
    </div>
  );
};

export default Pagination;
