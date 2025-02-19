import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  InputAdornment,
  SelectChangeEvent,
  Tooltip,
  IconButton,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface IncomeDetailsProps {
  onUpdate: (values: any) => void;
  initialValues: {
    financialYear: string;
    ageGroup: string;
    salaryIncome: number;
    interestIncome: number;
    rentalIncome: number;
    digitalAssetsIncome: number;
    otherIncome: number;
    hra: number;
    lta: number;
    professionalTax: number;
  };
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

const IncomeDetails: React.FC<IncomeDetailsProps> = ({ onUpdate, initialValues }) => {
  const [values, setValues] = React.useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleSelectChange = (field: string) => (event: SelectChangeEvent) => {
    const newValues = {
      ...values,
      [field]: event.target.value,
    };
    setValues(newValues);
    onUpdate(newValues);
  };

  const handleTextFieldChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValues = {
      ...values,
      [field]: Number(event.target.value),
    };
    setValues(newValues);
    onUpdate(newValues);
  };

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
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          Income Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>{renderLabel("Financial Year", "Select the financial year for tax calculation")}</InputLabel>
              <Select
                value={values.financialYear}
                label={renderLabel("Financial Year", "Select the financial year for tax calculation")}
                onChange={handleSelectChange('financialYear')}
              >
                {FINANCIAL_YEARS.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>{renderLabel("Age Group", "Select your age group for applicable tax slabs")}</InputLabel>
              <Select
                value={values.ageGroup}
                label={renderLabel("Age Group", "Select your age group for applicable tax slabs")}
                onChange={handleSelectChange('ageGroup')}
              >
                {AGE_GROUPS.map(age => (
                  <MenuItem key={age} value={age}>{age}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Income Sources
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={renderLabel("Income from Salary", "Enter your total income from salary including basic pay, allowances, and bonuses")}
              type="number"
              value={values.salaryIncome}
              onChange={handleTextFieldChange('salaryIncome')}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={renderLabel("Income from Interest", "Enter your total interest income from savings accounts, fixed deposits, and other interest-bearing investments")}
              type="number"
              value={values.interestIncome}
              onChange={handleTextFieldChange('interestIncome')}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={renderLabel("Rental Income", "Enter your total income from renting properties (before standard deduction)")}
              type="number"
              value={values.rentalIncome}
              onChange={handleTextFieldChange('rentalIncome')}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label={renderLabel("Income from Digital Assets", "Enter income from virtual digital assets, cryptocurrencies, or NFTs")}
              type="number"
              value={values.digitalAssetsIncome}
              onChange={handleTextFieldChange('digitalAssetsIncome')}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Exemptions & Allowances
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label={renderLabel("HRA", "Enter House Rent Allowance claimed for tax exemption")}
              type="number"
              value={values.hra}
              onChange={handleTextFieldChange('hra')}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label={renderLabel("LTA", "Enter Leave Travel Allowance claimed for tax exemption")}
              type="number"
              value={values.lta}
              onChange={handleTextFieldChange('lta')}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label={renderLabel("Professional Tax", "Enter Professional Tax deducted by employer or paid directly")}
              type="number"
              value={values.professionalTax}
              onChange={handleTextFieldChange('professionalTax')}
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default IncomeDetails;