import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import DashboardStatsGrid from './DashboardStatsGrid'

const data = [
  { name: 'Jan', Income: 2800, Expense: 2400 },
  { name: 'Feb', Income: 1800, Expense: 1398 },
  { name: 'Mar', Income: 9800, Expense: 3908 },
  { name: 'Apr', Income: 3800, Expense: 2800 },
  { name: 'May', Income: 4300, Expense: 2700 },
  { name: 'Jun', Income: 3000, Expense: 2000 },
  { name: 'Jul', Income: 8000, Expense: 3800 },
  { name: 'Aug', Income: 3490, Expense: 4300 },
  { name: 'Sep', Income: 4300, Expense: 2100 },
  { name: 'Oct', Income: 4800, Expense: 2900 },
  { name: 'Nov', Income: 3200, Expense: 2100 },
  { name: 'Dec', Income: 4500, Expense: 2900 }
]

function TransactionChart() {
  return (
    <div className='bg-white rounded-lg shadow-md p-4'>
      <h2 className='text-lg font-semibold mb-4'>Transactions</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Income" stroke="#8884d8" />
          <Line type="monotone" dataKey="Expense" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function Dashboard() {
  return (
    <div className='flex flex-col gap-4'>
      <DashboardStatsGrid />
      <TransactionChart />
    </div>
  )
}

export default Dashboard