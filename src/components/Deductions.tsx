import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Tooltip,
  IconButton,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface DeductionsProps {
  onUpdate: (values: any) => void;
  initialValues: Record<string, number>;
}

const DEDUCTION_FIELDS = [
  { 
    id: '80c',
    label: 'Investment/ Life Insurance (80C)',
    tooltip: 'Includes PPF, ELSS, Life Insurance Premium, etc. Maximum limit: ₹1,50,000',
    maxLimit: 150000
  },
  { 
    id: '80d',
    label: 'Medical Insurance (80D)',
    tooltip: 'Health insurance premium for self, family and parents',
    maxLimit: 100000
  },
  { 
    id: '80eea',
    label: 'Interest on Housing Loan (80EEA)',
    tooltip: 'Additional deduction for first time home buyers. Maximum limit: ₹1,50,000',
    maxLimit: 150000
  },
  { 
    id: '80ccd2',
    label: "Employer's contribution to NPS (80CCD2)",
    tooltip: '10% of salary (basic + DA)',
    maxLimit: null
  },
  { 
    id: '80ccd',
    label: "Employee's contribution to NPS (80CCD)",
    tooltip: 'Additional deduction up to ₹50,000',
    maxLimit: 50000
  },
  { 
    id: '80tta',
    label: 'Interest from Deposit (80TTA)',
    tooltip: 'Interest earned from savings account. Maximum limit: ₹10,000',
    maxLimit: 10000
  },
  { 
    id: '80g',
    label: 'Donation (80G)',
    tooltip: 'Donations to approved charitable institutions',
    maxLimit: null
  },
  { 
    id: 'other',
    label: 'Other Deductions',
    tooltip: 'Any other eligible deductions under Income Tax Act',
    maxLimit: null
  }
];

const Deductions: React.FC<DeductionsProps> = ({ onUpdate, initialValues }) => {
  const [values, setValues] = React.useState<Record<string, number>>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    const maxLimit = DEDUCTION_FIELDS.find(f => f.id === field)?.maxLimit;
    
    const validValue = maxLimit ? Math.min(newValue, maxLimit) : newValue;
    const newValues = { ...values, [field]: validValue };
    
    setValues(newValues);
    onUpdate(newValues);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Deductions
        </Typography>
        <Grid container spacing={3}>
          {DEDUCTION_FIELDS.map((field) => (
            <Grid item xs={12} md={6} key={field.id}>
              <TextField
                fullWidth
                label={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {field.label}
                    <Tooltip title={field.tooltip} arrow>
                      <IconButton size="small" sx={{ ml: 0.5 }}>
                        <HelpOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>
                }
                type="number"
                value={values[field.id]}
                onChange={handleChange(field.id)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                helperText={field.maxLimit ? `Maximum limit: ₹${field.maxLimit.toLocaleString()}` : ''}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Deductions;