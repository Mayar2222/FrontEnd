import React from 'react'
import DashboardStatsGrid from './DashboardStatsGrid'
function Dashboard() {
  return (
    <div className='flex gap-4'>
      <DashboardStatsGrid/>
      <TransactionChart></TransactionChart>
    </div>
  )
}

export default Dashboard
