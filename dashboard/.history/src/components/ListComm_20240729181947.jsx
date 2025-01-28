// src/components/GestionCommandes.js
import {
    Button,
    Chip,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
  
  const orders = [
    {
      code: 'ORD123',
      productCount: 5,
      clientName: 'John Doe',
      totalValue: 100,
      status: 'commande', // possible values: commande, colis, en cours de livraison, livrée
    },
    // Ajoutez d'autres commandes pour test
  ];
  
  const GestionCommandes = () => {
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
  
    const handleMonthChange = (event) => setMonth(event.target.value);
    const handleYearChange = (event) => setYear(event.target.value);
  
    const handleViewProducts = (orderCode) => {
      alert(`Voir les produits de la commande ${orderCode}`);
      // Ajouter logique pour afficher les produits
    };
  
    const handleConvertToPackage = (orderCode) => {
      alert(`Convertir la commande ${orderCode} en colis`);
      // Ajouter logique pour convertir en colis et générer bordereau + QR code
    };
  
    return (
      <div style={{ padding: 20, boxSizing: 'border-box', width: 'calc(100% - 250px)', marginLeft: 250 }}>
        <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
          <Typography variant="h6" gutterBottom>
            Filtrer les Commandes
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Mois</InputLabel>
                <Select value={month} onChange={handleMonthChange}>
                  <MenuItem value="1">Janvier</MenuItem>
                  <MenuItem value="2">Février</MenuItem>
                  {/* Ajoutez les autres mois */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Année</InputLabel>
                <Select value={year} onChange={handleYearChange}>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                  {/* Ajoutez les autres années */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
  
        <Paper elevation={3} style={{ padding: 20 }}>
          <Typography variant="h6" gutterBottom>
            Liste des Commandes
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Code de la commande</TableCell>
                  <TableCell>Nombre de produits</TableCell>
                  <TableCell>Nom du client</TableCell>
                  <TableCell>Valeur totale de la commande</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.code}>
                    <TableCell>{order.code}</TableCell>
                    <TableCell>{order.productCount}</TableCell>
                    <TableCell>{order.clientName}</TableCell>
                    <TableCell>{order.totalValue} €</TableCell>
                    <TableCell>
                      <Button onClick={() => handleViewProducts(order.code)} variant="outlined" color="primary">
                        Voir les produits
                      </Button>
                      <Button onClick={() => handleConvertToPackage(order.code)} variant="outlined" color="secondary" style={{ marginLeft: 10 }}>
                        Convertir en colis
                      </Button>
                      <Chip
                        label={order.status}
                        color={order.status === 'livrée' ? 'success' : 'default'}
                        style={{ marginLeft: 10 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    );
  };
  
  export default GestionCommandes;
  