import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


export default function BasicTable(props) {
  const rows = props.tab;  // Assure-toi que 'tab' contient bien les données nécessaires.

  console.log(rows);  // Vérification des données dans la console.

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="voyages table">
        <TableHead>
          <TableRow>
            <TableCell>Gare de Départ</TableCell>
            <TableCell align="right">Heure de Départ</TableCell>
            <TableCell align="right">Gare d'Arrivée</TableCell>
            <TableCell align="right">Heure d'Arrivée</TableCell>
            <TableCell align="center">Plus d'Informations</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}  // Utilise un identifiant unique si possible.
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.gare_depart}  {/* Gare de départ */}
              </TableCell>
              <TableCell align="right">{new Date(row.horaire_depart).toLocaleString()}</TableCell>  {/* Heure de départ */}
              <TableCell align="right">{row.gare_arrivee}  {/* Gare d'arrivée */}</TableCell>
              <TableCell align="right">{new Date(row.horaire_arrivee).toLocaleString()}</TableCell>  {/* Heure d'arrivée */}
              <TableCell align="center">
                {/* Lien pour afficher plus de détails sur le voyage */}
                <Link to={`/map?dep=${row.gare_depart}&arr=${row.gare_arrivee}`}>
                  <Button variant="contained">Voir Détails</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}