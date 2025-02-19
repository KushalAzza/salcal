import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
} from '@mui/material';

interface TaxReportProps {
  oldRegime: {
    grossIncome: number;
    totalDeductions: number;
    taxableIncome: number;
    taxAmount: number;
    cessAmount: number;
    totalTaxPayable: number;
  };
  newRegime: {
    grossIncome: number;
    taxableIncome: number;
    taxAmount: number;
    cessAmount: number;
    totalTaxPayable: number;
  };
}

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

const TaxReport: React.FC<TaxReportProps> = ({ oldRegime, newRegime }) => {
  const saving = Math.max(oldRegime.totalTaxPayable - newRegime.totalTaxPayable, 
                         newRegime.totalTaxPayable - oldRegime.totalTaxPayable);
  const betterRegime = oldRegime.totalTaxPayable > newRegime.totalTaxPayable ? 'New' : 'Old';

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">
            Tax Calculation Report
          </Typography>
          <Chip
            label={`${betterRegime} Regime saves you ${formatCurrency(saving)}`}
            color="success"
            variant="outlined"
          />
        </Box>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Particulars</TableCell>
                <TableCell align="right">Old Regime</TableCell>
                <TableCell align="right">New Regime</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Gross Total Income</TableCell>
                <TableCell align="right">{formatCurrency(oldRegime.grossIncome)}</TableCell>
                <TableCell align="right">{formatCurrency(newRegime.grossIncome)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Deductions</TableCell>
                <TableCell align="right">{formatCurrency(oldRegime.totalDeductions)}</TableCell>
                <TableCell align="right">Not Applicable</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Net Taxable Income</TableCell>
                <TableCell align="right">{formatCurrency(oldRegime.taxableIncome)}</TableCell>
                <TableCell align="right">{formatCurrency(newRegime.taxableIncome)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Income Tax</TableCell>
                <TableCell align="right">{formatCurrency(oldRegime.taxAmount)}</TableCell>
                <TableCell align="right">{formatCurrency(newRegime.taxAmount)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Health & Education Cess (4%)</TableCell>
                <TableCell align="right">{formatCurrency(oldRegime.cessAmount)}</TableCell>
                <TableCell align="right">{formatCurrency(newRegime.cessAmount)}</TableCell>
              </TableRow>
              <TableRow sx={{ '& td': { fontWeight: 'bold', backgroundColor: 'rgba(25, 118, 210, 0.08)' } }}>
                <TableCell>Total Tax Liability</TableCell>
                <TableCell align="right" 
                  sx={{ 
                    color: oldRegime.totalTaxPayable > newRegime.totalTaxPayable ? 'error.main' : 'success.main'
                  }}
                >
                  {formatCurrency(oldRegime.totalTaxPayable)}
                </TableCell>
                <TableCell align="right"
                  sx={{ 
                    color: newRegime.totalTaxPayable > oldRegime.totalTaxPayable ? 'error.main' : 'success.main'
                  }}
                >
                  {formatCurrency(newRegime.totalTaxPayable)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Tax Saving Tips:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • If you have significant investments and deductions, the Old Regime might be more beneficial.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • New Regime offers simplified tax slabs without deductions, suitable for those with fewer investments.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaxReport;