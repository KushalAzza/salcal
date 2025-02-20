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
  Box,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EditIcon from '@mui/icons-material/Edit';

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
    businessIncome: number;
    otherSourcesIncome: number;
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

const INCOME_FIELDS = [
  {
    id: 'salaryIncome',
    label: 'Income from Salary',
    tooltip: 'Enter your total income from salary including basic pay, allowances, and bonuses'
  },
  {
    id: 'interestIncome',
    label: 'Income from Interest',
    tooltip: 'Enter your total interest income from savings accounts, fixed deposits, and other interest-bearing investments'
  },
  {
    id: 'rentalIncome',
    label: 'Rental Income',
    tooltip: 'Enter your total income from renting properties (before standard deduction)'
  },
  {
    id: 'digitalAssetsIncome',
    label: 'Income from Digital Assets',
    tooltip: 'Enter income from virtual digital assets, cryptocurrencies, or NFTs'
  },
  {
    id: 'businessIncome',
    label: 'Income from Business',
    tooltip: 'Enter your total income from business activities'
  },
  {
    id: 'otherSourcesIncome',
    label: 'Income from Other Sources',
    tooltip: 'Enter your total income from other sources'
  }
];

const EXEMPTION_FIELDS = [
  {
    id: 'hra',
    label: 'HRA',
    tooltip: 'Enter House Rent Allowance claimed for tax exemption'
  },
  {
    id: 'lta',
    label: 'LTA',
    tooltip: 'Enter Leave Travel Allowance claimed for tax exemption'
  },
  {
    id: 'professionalTax',
    label: 'Professional Tax',
    tooltip: 'Enter Professional Tax deducted by employer or paid directly'
  }
];

const IncomeDetails: React.FC<IncomeDetailsProps> = ({ onUpdate, initialValues }) => {
  const [values, setValues] = React.useState(initialValues);
  const [editingField, setEditingField] = React.useState<string | null>(null);
  const [tempValue, setTempValue] = React.useState<string>('');

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

  const handleEdit = (field: string, value: number) => {
    setEditingField(field);
    setTempValue(value.toString());
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    setTempValue(value);
  };

  const handleBlur = () => {
    if (editingField) {
      const value = parseInt(tempValue) || 0;
      const newValues = { ...values, [editingField]: value };
      setValues(newValues);
      onUpdate(newValues);
      setEditingField(null);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleBlur();
    }
  };

  const renderLabel = (label: string, tooltip: string) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {label}
      <Tooltip title={tooltip} arrow>
        <IconButton size="small" sx={{ ml: 0.5 }}>
          <HelpOutlineIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
      </Tooltip>
    </div>
  );

  const renderEditableField = (field: { id: string; label: string; tooltip: string }) => (
    <>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          fontSize: '0.8rem',
          mb: 0.5 
        }}
      >
        {renderLabel(field.label, field.tooltip)}
      </Typography>
      <Box sx={{ 
        bgcolor: '#ffffff',
        borderRadius: 1,
        border: '1px solid rgba(0, 0, 0, 0.23)',
        color: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '56px',
        px: 2,
        py: 1,
        fontSize: '1rem'
      }}>
        {editingField === field.id ? (
          <TextField
            value={tempValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            variant="standard"
            sx={{
              input: { 
                color: '#000000', 
                fontSize: '1rem'
              },
              width: '100%',
              '& .MuiInput-underline:before': { borderBottomColor: 'rgba(0, 0, 0, 0.42)' },
              '& .MuiInput-underline:hover:before': { borderBottomColor: 'rgba(0, 0, 0, 0.87)' },
            }}
            autoFocus
          />
        ) : (
          <>
            <Box 
              onClick={() => handleEdit(field.id, values[field.id as keyof typeof values] as number)}
              sx={{ 
                cursor: 'pointer',
                flex: 1,
                fontSize: '1rem',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              ₹{(values[field.id as keyof typeof values] as number).toLocaleString('en-IN')}
            </Box>
            <IconButton 
              size="small" 
              onClick={() => handleEdit(field.id, values[field.id as keyof typeof values] as number)}
              sx={{ color: '#000000', ml: 1 }}
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      </Box>
    </>
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
          {INCOME_FIELDS.map((field) => (
            <Grid item xs={12} md={6} key={field.id}>
              {renderEditableField(field)}
            </Grid>
          ))}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Exemptions & Allowances
            </Typography>
          </Grid>
          {EXEMPTION_FIELDS.map((field) => (
            <Grid item xs={12} md={4} key={field.id}>
              {renderEditableField(field)}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default IncomeDetails;