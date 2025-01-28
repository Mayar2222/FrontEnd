// src/components/StockTransactionsTable.js
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';

const StockTransactionsTable = ({ transactions }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Commande</TableCell>
            <TableCell>Produit</TableCell>
            <TableCell>A. Quantité</TableCell>
            <TableCell>Quantité restante</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Lieu de retrait</TableCell>
            <TableCell>Créé le</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.orderNumber}</TableCell>
              <TableCell>{transaction.productName}</TableCell>
              <TableCell>{transaction.quantityAdjustment}</TableCell>
              <TableCell>{transaction.remainingQuantity}</TableCell>
              <TableCell>{transaction.message}</TableCell>
              <TableCell>{transaction.location}</TableCell>
              <TableCell>{transaction.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StockTransactionsTable;
