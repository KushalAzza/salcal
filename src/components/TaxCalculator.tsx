import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import IncomeDetails from './IncomeDetails';
import Deductions from './Deductions';
import TaxReport from './TaxReport';

interface TaxState {
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

const TaxCalculator: React.FC = () => {
  const [incomeDetails, setIncomeDetails] = useState({
    financialYear: "2024-25",
    ageGroup: "Below 60",
    salaryIncome: 0,
    interestIncome: 0,
    rentalIncome: 0,
    digitalAssetsIncome: 0,
    otherIncome: 0,
    hra: 0,
    lta: 0,
    professionalTax: 0,
  });

  const [deductions, setDeductions] = useState({
    '80c': 0,
    '80d': 0,
    '80eea': 0,
    '80ccd2': 0,
    '80ccd': 0,
    '80tta': 0,
    '80g': 0,
    'other': 0,
  });

  const [taxCalculation, setTaxCalculation] = useState<TaxState>({
    oldRegime: {
      grossIncome: 0,
      totalDeductions: 0,
      taxableIncome: 0,
      taxAmount: 0,
      cessAmount: 0,
      totalTaxPayable: 0,
    },
    newRegime: {
      grossIncome: 0,
      taxableIncome: 0,
      taxAmount: 0,
      cessAmount: 0,
      totalTaxPayable: 0,
    }
  });

  const calculateOldRegimeTax = (taxableIncome: number) => {
    let tax = 0;
    const ageGroup = incomeDetails.ageGroup;

    if (ageGroup === "Below 60") {
      if (taxableIncome <= 250000) tax = 0;
      else if (taxableIncome <= 500000) tax = (taxableIncome - 250000) * 0.05;
      else if (taxableIncome <= 1000000) tax = 12500 + (taxableIncome - 500000) * 0.2;
      else tax = 112500 + (taxableIncome - 1000000) * 0.3;
    } else if (ageGroup === "60 to 80") {
      if (taxableIncome <= 300000) tax = 0;
      else if (taxableIncome <= 500000) tax = (taxableIncome - 300000) * 0.05;
      else if (taxableIncome <= 1000000) tax = 10000 + (taxableIncome - 500000) * 0.2;
      else tax = 110000 + (taxableIncome - 1000000) * 0.3;
    } else { // Above 80
      if (taxableIncome <= 500000) tax = 0;
      else if (taxableIncome <= 1000000) tax = (taxableIncome - 500000) * 0.2;
      else tax = 100000 + (taxableIncome - 1000000) * 0.3;
    }

    return tax;
  };

  const calculateNewRegimeTax = (taxableIncome: number) => {
    let tax = 0;
    if (taxableIncome <= 300000) tax = 0;
    else if (taxableIncome <= 600000) tax = (taxableIncome - 300000) * 0.05;
    else if (taxableIncome <= 900000) tax = 15000 + (taxableIncome - 600000) * 0.1;
    else if (taxableIncome <= 1200000) tax = 45000 + (taxableIncome - 900000) * 0.15;
    else if (taxableIncome <= 1500000) tax = 90000 + (taxableIncome - 1200000) * 0.2;
    else tax = 150000 + (taxableIncome - 1500000) * 0.3;
    return tax;
  };

  useEffect(() => {
    const grossIncome = 
      incomeDetails.salaryIncome +
      incomeDetails.interestIncome +
      incomeDetails.rentalIncome +
      incomeDetails.digitalAssetsIncome +
      incomeDetails.otherIncome;

    const totalDeductions = 
      deductions['80c'] +
      deductions['80d'] +
      deductions['80eea'] +
      deductions['80ccd2'] +
      deductions['80ccd'] +
      deductions['80tta'] +
      deductions['80g'] +
      deductions['other'];

    const totalExemptions = 
      incomeDetails.hra +
      incomeDetails.lta +
      incomeDetails.professionalTax;

    // Old Regime Calculation
    const oldTaxableIncome = Math.max(0, grossIncome - totalDeductions - totalExemptions);
    const oldTaxAmount = calculateOldRegimeTax(oldTaxableIncome);
    const oldCessAmount = oldTaxAmount * 0.04;

    // New Regime Calculation
    const newTaxableIncome = Math.max(0, grossIncome);
    const newTaxAmount = calculateNewRegimeTax(newTaxableIncome);
    const newCessAmount = newTaxAmount * 0.04;

    setTaxCalculation({
      oldRegime: {
        grossIncome,
        totalDeductions,
        taxableIncome: oldTaxableIncome,
        taxAmount: oldTaxAmount,
        cessAmount: oldCessAmount,
        totalTaxPayable: oldTaxAmount + oldCessAmount,
      },
      newRegime: {
        grossIncome,
        taxableIncome: newTaxableIncome,
        taxAmount: newTaxAmount,
        cessAmount: newCessAmount,
        totalTaxPayable: newTaxAmount + newCessAmount,
      }
    });
  }, [incomeDetails, deductions]);

  const handleIncomeUpdate = (values: any) => {
    setIncomeDetails(prev => ({
      ...prev,
      ...values
    }));
  };

  const handleDeductionsUpdate = (values: any) => {
    setDeductions(prev => ({
      ...prev,
      ...values
    }));
  };

  // Store active tab data in localStorage
  useEffect(() => {
    const storedData = localStorage.getItem('taxCalculatorData');
    if (storedData) {
      const { income, deduct } = JSON.parse(storedData);
      setIncomeDetails(prev => ({ ...prev, ...income }));
      setDeductions(prev => ({ ...prev, ...deduct }));
    }
  }, []);

  // Save data when it changes
  useEffect(() => {
    localStorage.setItem('taxCalculatorData', JSON.stringify({
      income: incomeDetails,
      deduct: deductions
    }));
  }, [incomeDetails, deductions]);

  return (
    <Box sx={{ mt: 2 }}>
      <Box id="income-details">
        <IncomeDetails 
          onUpdate={handleIncomeUpdate}
          initialValues={incomeDetails}
        />
      </Box>
      <Box id="deductions" sx={{ mt: 4 }}>
        <Deductions 
          onUpdate={handleDeductionsUpdate}
          initialValues={deductions}
        />
      </Box>
      <Box id="tax-report" sx={{ mt: 4 }}>
        <TaxReport {...taxCalculation} />
      </Box>
      <Box id="tax-slabs" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Tax Slabs
            </Typography>
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Income Range</TableCell>
                    <TableCell align="right">Old Regime Rate</TableCell>
                    <TableCell align="right">New Regime Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Up to ₹2,50,000</TableCell>
                    <TableCell align="right">0%</TableCell>
                    <TableCell align="right">0%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹2,50,001 to ₹5,00,000</TableCell>
                    <TableCell align="right">5%</TableCell>
                    <TableCell align="right">5%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹5,00,001 to ₹7,50,000</TableCell>
                    <TableCell align="right">20%</TableCell>
                    <TableCell align="right">10%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹7,50,001 to ₹10,00,000</TableCell>
                    <TableCell align="right">20%</TableCell>
                    <TableCell align="right">15%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹10,00,001 to ₹12,50,000</TableCell>
                    <TableCell align="right">30%</TableCell>
                    <TableCell align="right">20%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>₹12,50,001 to ₹15,00,000</TableCell>
                    <TableCell align="right">30%</TableCell>
                    <TableCell align="right">25%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Above ₹15,00,000</TableCell>
                    <TableCell align="right">30%</TableCell>
                    <TableCell align="right">30%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default TaxCalculator;