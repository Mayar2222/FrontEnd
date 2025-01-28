import React from 'react';
import { FaChartPie, FaClipboardList, FaShoppingBag, FaUsers } from 'react-icons/fa';

function DashboardStatsGrid() {
  return (
    <div className='flex gap-4 w-full'>
      <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>
        <div className='flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full mr-4'>
          <FaShoppingBag size={24} />
        </div>
        <div>
          <div className='text-sm text-gray-500'>Total Sales</div>
          <div className='text-lg font-semibold'>$3425.60</div>
          <div className='text-sm text-green-500'>+234</div>
        </div>
      </div>
      <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>
        <div className='flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-full mr-4'>
          <FaChartPie size={24} />
        </div>
        <div>
          <div className='text-sm text-gray-500'>Total Expenses</div>
          <div className='text-lg font-semibold'>$3425.60</div>
          <div className='text-sm text-green-500'>+234</div>
        </div>
      </div>
      <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>
        <div className='flex items-center justify-center w-12 h-12 bg-yellow-500 text-white rounded-full mr-4'>
          <FaUsers size={24} />
        </div>
        <div>
          <div className='text-sm text-gray-500'>Total Customers</div>
          <div className='text-lg font-semibold'>3425.60</div>
          <div className='text-sm text-green-500'>+234</div>
        </div>
      </div>
      <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>
        <div className='flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full mr-4'>
          <FaClipboardList size={24} />
        </div>
        <div>
          <div className='text-sm text-gray-500'>Total Orders</div>
          <div className='text-lg font-semibold'>$3425.60</div>
          <div className='text-sm text-red-500'>-234</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStatsGrid;
