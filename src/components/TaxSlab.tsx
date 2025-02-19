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
  FormControl,
  Select,
  MenuItem,
  Grid,
  SelectChangeEvent,
  InputLabel,
  Box,
  Alert,
  Collapse,
} from '@mui/material';

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
  const handleFYChange = (event: SelectChangeEvent) => {
    onFYChange(event.target.value);
  };

  const handleAgeGroupChange = (event: SelectChangeEvent) => {
    onAgeGroupChange(event.target.value);
  };

  const handleRegimeChange = (event: SelectChangeEvent) => {
    onRegimeChange(event.target.value);
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

  const getNotificationMessage = () => {
    if (selectedFY === "2025-26" && selectedRegime === "New Regime") {
      return "New tax slabs with higher basic exemption limit of ₹4,00,000 are applicable from FY 2025-26.";
    }
    if (selectedFY === "2024-25" && selectedRegime === "New Regime") {
      return "Standard deduction increased to ₹75,000 in New Regime from FY 2024-25.";
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
          <Typography variant="body2" color="text.secondary">
            • 10% of tax where total income exceeds ₹50 lakhs up to ₹1 crore
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • 15% of tax where total income exceeds ₹1 crore up to ₹2 crores
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • 25% of tax where total income exceeds ₹2 crores up to ₹5 crores
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • 37% of tax where total income exceeds ₹5 crores
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary">
            • 10% of tax where total income exceeds ₹50 lakhs up to ₹1 crore
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • 15% of tax where total income exceeds ₹1 crore up to ₹2 crores
          </Typography>
          <Typography variant="body2" color="text.secondary">
            • 25% of tax where total income exceeds ₹2 crores (maximum surcharge rate capped at 25%)
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
        • A cess of 4% on the total income tax (including any surcharge) applies to all taxpayers
      </Typography>
    </Box>
  );

  const renderTaxReliefInfo = () => (
    selectedRegime === "New Regime" && (
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Tax Relief (New Regime):
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Section 87A: Tax rebate up to ₹25,000 for resident individuals with total income up to ₹7 lakhs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Standard Deduction: ₹75,000 from FY 2024-25 onwards (increased from ₹50,000)
        </Typography>
      </Box>
    )
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
              <InputLabel>Tax Regime</InputLabel>
              <Select
                value={selectedRegime}
                label="Tax Regime"
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
              <InputLabel>Financial Year</InputLabel>
              <Select
                value={selectedFY}
                label="Financial Year"
                onChange={handleFYChange}
              >
                {FINANCIAL_YEARS.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Age Group</InputLabel>
              <Select
                value={selectedAgeGroup}
                label="Age Group"
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

        {renderSurchargeInfo()}
        {renderCessInfo()}
        {renderTaxReliefInfo()}
      </CardContent>
    </Card>
  );
};

export default TaxSlab;