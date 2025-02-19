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
} from '@mui/material';

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

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Income Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Financial Year</InputLabel>
              <Select
                value={values.financialYear}
                label="Financial Year"
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
              <InputLabel>Age Group</InputLabel>
              <Select
                value={values.ageGroup}
                label="Age Group"
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
              label="Income from Salary"
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
              label="Income from Interest"
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
              label="Rental Income"
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
              label="Income from Digital Assets"
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
              label="HRA"
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
              label="LTA"
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
              label="Professional Tax"
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