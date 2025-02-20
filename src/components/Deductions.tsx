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
  Box,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EditIcon from '@mui/icons-material/Edit';

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
  const [editingField, setEditingField] = React.useState<string | null>(null);
  const [tempValue, setTempValue] = React.useState<string>('');

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

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
      const maxLimit = DEDUCTION_FIELDS.find(f => f.id === editingField)?.maxLimit;
      const validValue = maxLimit ? Math.min(value, maxLimit) : value;
      const newValues = { ...values, [editingField]: validValue };
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

  const renderEditableField = (field: { id: string; label: string; tooltip: string; maxLimit: number | null }) => (
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
              onClick={() => handleEdit(field.id, values[field.id])}
              sx={{ 
                cursor: 'pointer',
                flex: 1,
                fontSize: '1rem',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              ₹{values[field.id].toLocaleString('en-IN')}
            </Box>
            <IconButton 
              size="small" 
              onClick={() => handleEdit(field.id, values[field.id])}
              sx={{ color: '#000000', ml: 1 }}
            >
              <EditIcon />
            </IconButton>
          </>
        )}
      </Box>
      {field.maxLimit && (
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            fontSize: '0.8rem',
            mt: 0.5 
          }}
        >
          Maximum limit: ₹{field.maxLimit.toLocaleString()}
        </Typography>
      )}
    </>
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Deductions
        </Typography>
        <Grid container spacing={3}>
          {DEDUCTION_FIELDS.map((field) => (
            <Grid item xs={12} md={6} key={field.id}>
              {renderEditableField(field)}
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Deductions;