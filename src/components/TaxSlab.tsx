import React, { useState } from 'react';
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
  FormControl,
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent,
  InputLabel,
  Box,
  Alert,
  Collapse,
  Tooltip,
  IconButton,
  Slider,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface TaxSlabProps {
  selectedFY: string;
  selectedAgeGroup: string;
  selectedRegime: string;
  onFYChange: (fy: string) => void;
  onAgeGroupChange: (age: string) => void;
  onRegimeChange: (regime: string) => void;
}

interface TaxRange {
  range: string;
  rate: string;
}

const FINANCIAL_YEARS = [
  "2025-26",
  "2024-25",
  "2023-24",
  "2022-23",
];

const AGE_GROUPS = [
  "Below 60",
  "60 to 80",
  "Above 80",
];

const TAX_REGIMES = ["Old Regime", "New Regime"];

const TAX_SLABS: Record<string, Record<string, Record<string, TaxRange[]>>> = {
  "oldregime": {
    "2025-26": {
      "Below 60": [
        { range: "Up to ₹2,50,000", rate: "0%" },
        { range: "₹2,50,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "Above ₹10,00,000", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "Above ₹10,00,000", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹5,00,000", rate: "0%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "Above ₹10,00,000", rate: "30%" },
      ],
    },
    "2024-25": {
      "Below 60": [
        { range: "Up to ₹2,50,000", rate: "0%" },
        { range: "₹2,50,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "Above ₹10,00,000", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "Above ₹10,00,000", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹5,00,000", rate: "0%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "Above ₹10,00,000", rate: "30%" },
      ],
    },
    "2023-24": {
      "Below 60": [
        { range: "Up to ₹2,50,000", rate: "0%" },
        { range: "₹2,50,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "Above ₹10,00,000", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "Above ₹10,00,000", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹5,00,000", rate: "0%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "Above ₹10,00,000", rate: "30%" },
      ],
    },
    "2022-23": {
      "Below 60": [
        { range: "Up to ₹2,50,000", rate: "0%" },
        { range: "₹2,50,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "Above ₹10,00,000", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "Above ₹10,00,000", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹5,00,000", rate: "0%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "Above ₹10,00,000", rate: "30%" },
      ],
    }
  },
  "newregime": {
    "2025-26": {
      "Below 60": [
        { range: "Up to ₹4,00,000", rate: "0%" },
        { range: "₹4,00,001 to ₹8,00,000", rate: "5%" },
        { range: "₹8,00,001 to ₹12,00,000", rate: "10%" },
        { range: "₹12,00,001 to ₹16,00,000", rate: "15%" },
        { range: "₹16,00,001 to ₹20,00,000", rate: "20%" },
        { range: "₹20,00,001 to ₹24,00,000", rate: "25%" },
        { range: "Above ₹24,00,000", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹4,00,000", rate: "0%" },
        { range: "₹4,00,001 to ₹8,00,000", rate: "5%" },
        { range: "₹8,00,001 to ₹12,00,000", rate: "10%" },
        { range: "₹12,00,001 to ₹16,00,000", rate: "15%" },
        { range: "₹16,00,001 to ₹20,00,000", rate: "20%" },
        { range: "₹20,00,001 to ₹24,00,000", rate: "25%" },
        { range: "Above ₹24,00,000", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹4,00,000", rate: "0%" },
        { range: "₹4,00,001 to ₹8,00,000", rate: "5%" },
        { range: "₹8,00,001 to ₹12,00,000", rate: "10%" },
        { range: "₹12,00,001 to ₹16,00,000", rate: "15%" },
        { range: "₹16,00,001 to ₹20,00,000", rate: "20%" },
        { range: "₹20,00,001 to ₹24,00,000", rate: "25%" },
        { range: "Above ₹24,00,000", rate: "30%" },
      ],
    },
    "2024-25": {
      "Below 60": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹6,00,000", rate: "5%" },
        { range: "₹6,00,001 to ₹9,00,000", rate: "10%" },
        { range: "₹9,00,001 to ₹12,00,000", rate: "15%" },
        { range: "₹12,00,001 to ₹15,00,000", rate: "20%" },
        { range: "Above ₹15,00,000", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹6,00,000", rate: "5%" },
        { range: "₹6,00,001 to ₹9,00,000", rate: "10%" },
        { range: "₹9,00,001 to ₹12,00,000", rate: "15%" },
        { range: "₹12,00,001 to ₹15,00,000", rate: "20%" },
        { range: "Above ₹15,00,000", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹6,00,000", rate: "5%" },
        { range: "₹6,00,001 to ₹9,00,000", rate: "10%" },
        { range: "₹9,00,001 to ₹12,00,000", rate: "15%" },
        { range: "₹12,00,001 to ₹15,00,000", rate: "20%" },
        { range: "Above ₹15,00,000", rate: "30%" },
      ],
    },
    "2023-24": {
      "Below 60": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹6,00,000", rate: "5%" },
        { range: "₹6,00,001 to ₹9,00,000", rate: "10%" },
        { range: "₹9,00,001 to ₹12,00,000", rate: "15%" },
        { range: "₹12,00,001 to ₹15,00,000", rate: "20%" },
        { range: "Above ₹15,00,000", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹6,00,000", rate: "5%" },
        { range: "₹6,00,001 to ₹9,00,000", rate: "10%" },
        { range: "₹9,00,001 to ₹12,00,000", rate: "15%" },
        { range: "₹12,00,001 to ₹15,00,000", rate: "20%" },
        { range: "Above ₹15,00,000", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹6,00,000", rate: "5%" },
        { range: "₹6,00,001 to ₹9,00,000", rate: "10%" },
        { range: "₹9,00,001 to ₹12,00,000", rate: "15%" },
        { range: "₹12,00,001 to ₹15,00,000", rate: "20%" },
        { range: "Above ₹15,00,000", rate: "30%" },
      ],
    },
    "2022-23": {
      "Below 60": [
        { range: "Up to ₹2,50,000", rate: "0%" },
        { range: "₹2,50,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹7,50,000", rate: "10%" },
        { range: "₹7,50,001 to ₹10,00,000", rate: "15%" },
        { range: "₹10,00,001 to ₹12,50,000", rate: "20%" },
        { range: "₹12,50,001 to ₹15,00,000", rate: "25%" },
        { range: "Above ₹15,00,000", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹2,50,000", rate: "0%" },
        { range: "₹2,50,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹7,50,000", rate: "10%" },
        { range: "₹7,50,001 to ₹10,00,000", rate: "15%" },
        { range: "₹10,00,001 to ₹12,50,000", rate: "20%" },
        { range: "₹12,50,001 to ₹15,00,000", rate: "25%" },
        { range: "Above ₹15,00,000", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹2,50,000", rate: "0%" },
        { range: "₹2,50,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹7,50,000", rate: "10%" },
        { range: "₹7,50,001 to ₹10,00,000", rate: "15%" },
        { range: "₹10,00,001 to ₹12,50,000", rate: "20%" },
        { range: "₹12,50,001 to ₹15,00,000", rate: "25%" },
        { range: "Above ₹15,00,000", rate: "30%" },
      ],
    }
  }
};

const TaxSlab: React.FC<TaxSlabProps> = ({
  selectedFY,
  selectedAgeGroup,
  selectedRegime,
  onFYChange,
  onAgeGroupChange,
  onRegimeChange,
}) => {
  const [taxableIncome, setTaxableIncome] = useState(0);

  const handleFYChange = (event: SelectChangeEvent) => {
    onFYChange(event.target.value);
  };

  const handleAgeGroupChange = (event: SelectChangeEvent) => {
    onAgeGroupChange(event.target.value);
  };

  const handleRegimeChange = (event: SelectChangeEvent) => {
    onRegimeChange(event.target.value);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setTaxableIncome(newValue as number);
  };

  const getSlabData = () => {
    const regimeKey = selectedRegime.toLowerCase().replace(' ', '');
    try {
      const data = TAX_SLABS[regimeKey]?.[selectedFY]?.[selectedAgeGroup];
      if (!data) {
        console.warn('No data found for:', { regimeKey, selectedFY, selectedAgeGroup });
        return [];
      }
      return data;
    } catch (error) {
      console.error('Error accessing tax slab data:', error);
      return [];
    }
  };

  const calculateTax = () => {
    const regimeKey = selectedRegime.toLowerCase().replace(' ', '');
    const slabs = TAX_SLABS[regimeKey]?.[selectedFY]?.[selectedAgeGroup] || [];
    let tax = 0;
    for (const slab of slabs) {
      const [min, max] = slab.range.split(' to ').map(s => parseInt(s.replace(/[^0-9]/g, ''), 10));
      if (taxableIncome > min) {
        const incomeInSlab = Math.min(taxableIncome, max) - min;
        tax += incomeInSlab * parseFloat(slab.rate) / 100;
      }
    }
    return tax;
  };

  const getNotificationMessage = () => {
    if (selectedRegime === "New Regime") {
      if (selectedFY === "2025-26") {
        return "Under the New Regime for FY 2025-26, resident individuals can claim rebate of up to ₹60,000 under Section 87A with taxable income up to ₹12 lakh will have no tax liability.";
      } else if (selectedFY === "2024-25" || selectedFY === "2022-23" || selectedFY === "2023-24") {
        return `Under the New Regime for FY ${selectedFY}, resident individuals can claim rebate of up to ₹25,000 under Section 87A with taxable income up to ₹7 lakh will have no tax liability.`;
      }
    } else if (selectedRegime === "Old Regime") {
      // Old Regime rules remain consistent across financial years.
      return "Under the Old Regime, resident individuals can claim rebate of up to ₹12,500 under Section 87A with taxable income up to ₹5 lakh will have no tax liability.";
    }
    return null;
  };
  

  const renderSurchargeInfo = () => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle2" gutterBottom>
        Surcharge Rates:
      </Typography>
      {selectedRegime === "Old Regime" ? (
        <>
          <Typography variant="subtitle2" color="text.primary" sx={{ mt: 1 }}>
            • For the old tax regime, the rates remain:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            – 10% for income exceeding ₹50 lakhs up to ₹1 crore
          </Typography>
          <Typography variant="body2" color="text.secondary">
            – 15% for income exceeding ₹1 crore up to ₹2 crores
          </Typography>
          <Typography variant="body2" color="text.secondary">
            – 25% for income exceeding ₹2 crores up to ₹5 crores
          </Typography>
          <Typography variant="body2" color="text.secondary">
            – 37% for income exceeding ₹5 crores
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
            For example, if your computed tax is ₹1,00,000 and your taxable income is ₹60 lakhs,
            a surcharge of 10% (₹10,000) will be added, making your total tax ₹1,10,000.
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="subtitle2" color="text.primary" sx={{ mt: 1 }}>
            • Under the new tax regime:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            – 10% for income exceeding ₹50 lakhs up to ₹1 crore
          </Typography>
          <Typography variant="body2" color="text.secondary">
            – 15% for income exceeding ₹1 crore up to ₹2 crores
          </Typography>
          <Typography variant="body2" color="text.secondary">
            – 25% for income exceeding ₹2 crores (maximum surcharge rate capped at 25%)
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
            For example, if your computed tax is ₹1,00,000 and your taxable income is ₹2.5 crores,
            a surcharge of 25% (₹25,000) would apply, making your total tax ₹1,25,000 ensuring the surcharge never exceeds this cap.
          </Typography>
        </>
      )}
    </Box>
  );

  const renderCessInfo = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        Health & Education Cess:
      </Typography>
      <Typography variant="body2" color="text.secondary">
        • A cess of 4% on the total income tax (including any surcharge) applies to all taxpayers.
      </Typography>
    </Box>
  );

  const renderTaxReliefInfo = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        Tax Relief:
      </Typography>
      {selectedRegime === "New Regime" ? (
        <>
          <Typography variant="body2" color="text.secondary">
            Under the new regime, resident individual taxpayers can avail a few deductions and exemptions, such as:
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            • Standard Deduction of ₹75,000 from FY 2024-25 onwards, earlier it was ₹50,000.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Marginal Relief for taxpayers from FY2025-26 onwards with taxable income above ₹12,00,000 upto ₹12,75,000; protecting from a disproportionate tax increase.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Deduction for employer’s contribution to NPS account under Section 80CCD(2) up to 14% of employee's basic salary from FY 2024-25 onwards, earlier it was 10%. 
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary">
            Under the old regime, resident individual taxpayers can avail a variety of deductions and exemptions, such as:
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            • Standard Deduction of ₹50,000 for salaried individuals and pensioners.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Deductions under Section 80C (up to ₹1.5 lakh) for investments in PPF, life insurance, ELSS, etc.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Deductions under Section 80D for health insurance premiums.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • Exemptions for allowances such as HRA and LTA, and deductions on home loan interest.
          </Typography>
        </>
      )}
    </Box>
  );

  const renderLabel = (label: string, tooltip: string) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {label}
      <Tooltip title={tooltip} arrow>
        <IconButton size="small" sx={{ ml: 0.5 }}>
          <HelpOutlineIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Income Tax Slab ({selectedRegime})
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>
                {renderLabel(
                  "Tax Regime",
                  "Choose between Old and New Tax Regime. New regime offers simplified tax slabs with no major exemptions"
                )}
              </InputLabel>
              <Select
                value={selectedRegime}
                label={renderLabel(
                  "Tax Regime",
                  "Choose between Old and New Tax Regime. New regime offers simplified tax slabs with no major exemptions"
                )}
                onChange={handleRegimeChange}
              >
                {TAX_REGIMES.map(regime => (
                  <MenuItem key={regime} value={regime}>{regime}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>
                {renderLabel(
                  "Financial Year",
                  "Select the financial year for which you want to view tax slabs"
                )}
              </InputLabel>
              <Select
                value={selectedFY}
                label={renderLabel(
                  "Financial Year",
                  "Select the assessment year for which you want to view tax slabs"
                )}
                onChange={handleFYChange}
              >
                {FINANCIAL_YEARS.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth disabled={selectedRegime === "New Regime"}>
              <InputLabel>
                {renderLabel(
                  "Age Group",
                  selectedRegime === "New Regime" 
                    ? "Age group is not applicable in New Tax Regime as it has uniform slabs for all age groups"
                    : "Select your age group for applicable tax slabs under Old Regime"
                )}
              </InputLabel>
              <Select
                value={selectedAgeGroup}
                label={renderLabel(
                  "Age Group",
                  selectedRegime === "New Regime"
                    ? "Age group is not applicable in New Tax Regime as it has uniform slabs for all age groups"
                    : "Select your age group for applicable tax slabs under Old Regime"
                )}
                onChange={handleAgeGroupChange}
              >
                {AGE_GROUPS.map(age => (
                  <MenuItem key={age} value={age}>{age}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Collapse in={!!getNotificationMessage()} sx={{ mb: 2 }}>
          <Alert severity="info">
            {getNotificationMessage()}
          </Alert>
        </Collapse>

        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Income Range</TableCell>
                <TableCell align="right">Tax Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getSlabData().map((slab: TaxRange, index: number) => (
                <TableRow key={index}>
                  <TableCell>{slab.range}</TableCell>
                  <TableCell align="right">{slab.rate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Taxable Income
          </Typography>
          <Slider
            value={taxableIncome}
            onChange={handleSliderChange}
            aria-labelledby="taxable-income-slider"
            valueLabelDisplay="auto"
            step={10000}
            marks
            min={0}
            max={5000000}
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Taxable Income: ₹{taxableIncome.toLocaleString('en-IN')}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Estimated Income Tax: ₹{calculateTax().toLocaleString('en-IN')}
          </Typography>
        </Box>

        {renderSurchargeInfo()}
        {renderCessInfo()}
        {renderTaxReliefInfo()}
      </CardContent>
    </Card>
  );
};

export default TaxSlab;