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
  TextField,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EditIcon from '@mui/icons-material/Edit';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

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

interface TaxRatePoint {
  income: number;
  rate: number;
  label: string;
}

interface TaxPoint {
  income: number;
  tax: number;
  label: string;
}

interface TaxBoundary {
  income: number;
  rate: string;
  isStart?: boolean;
  x?: number;
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
        { range: "₹10,00,001 and above", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "₹10,00,001 and above", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹5,00,000", rate: "0%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "₹10,00,001 and above", rate: "30%" },
      ],
    },
    "2024-25": {
      "Below 60": [
        { range: "Up to ₹2,50,000", rate: "0%" },
        { range: "₹2,50,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "₹10,00,001 and above", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "₹10,00,001 and above", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹5,00,000", rate: "0%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "₹10,00,001 and above", rate: "30%" },
      ],
    },
    "2023-24": {
      "Below 60": [
        { range: "Up to ₹2,50,000", rate: "0%" },
        { range: "₹2,50,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "₹10,00,001 and above", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "₹10,00,001 and above", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹5,00,000", rate: "0%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "₹10,00,001 and above", rate: "30%" },
      ],
    },
    "2022-23": {
      "Below 60": [
        { range: "Up to ₹2,50,000", rate: "0%" },
        { range: "₹2,50,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "₹10,00,001 and above", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "₹10,00,001 and above", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹5,00,000", rate: "0%" },
        { range: "₹5,00,001 to ₹10,00,000", rate: "20%" },
        { range: "₹10,00,001 and above", rate: "30%" },
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
        { range: "₹24,00,001 and above", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹4,00,000", rate: "0%" },
        { range: "₹4,00,001 to ₹8,00,000", rate: "5%" },
        { range: "₹8,00,001 to ₹12,00,000", rate: "10%" },
        { range: "₹12,00,001 to ₹16,00,000", rate: "15%" },
        { range: "₹16,00,001 to ₹20,00,000", rate: "20%" },
        { range: "₹20,00,001 to ₹24,00,000", rate: "25%" },
        { range: "₹24,00,001 and above", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹4,00,000", rate: "0%" },
        { range: "₹4,00,001 to ₹8,00,000", rate: "5%" },
        { range: "₹8,00,001 to ₹12,00,000", rate: "10%" },
        { range: "₹12,00,001 to ₹16,00,000", rate: "15%" },
        { range: "₹16,00,001 to ₹20,00,000", rate: "20%" },
        { range: "₹20,00,001 to ₹24,00,000", rate: "25%" },
        { range: "₹24,00,001 and above", rate: "30%" },
      ],
    },
    "2024-25": {
      "Below 60": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹6,00,000", rate: "5%" },
        { range: "₹6,00,001 to ₹9,00,000", rate: "10%" },
        { range: "₹9,00,001 to ₹12,00,000", rate: "15%" },
        { range: "₹12,00,001 to ₹15,00,000", rate: "20%" },
        { range: "₹15,00,001 and above", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹6,00,000", rate: "5%" },
        { range: "₹6,00,001 to ₹9,00,000", rate: "10%" },
        { range: "₹9,00,001 to ₹12,00,000", rate: "15%" },
        { range: "₹12,00,001 to ₹15,00,000", rate: "20%" },
        { range: "₹15,00,001 and above", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹6,00,000", rate: "5%" },
        { range: "₹6,00,001 to ₹9,00,000", rate: "10%" },
        { range: "₹9,00,001 to ₹12,00,000", rate: "15%" },
        { range: "₹12,00,001 to ₹15,00,000", rate: "20%" },
        { range: "₹15,00,001 and above", rate: "30%" },
      ],
    },
    "2023-24": {
      "Below 60": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹6,00,000", rate: "5%" },
        { range: "₹6,00,001 to ₹9,00,000", rate: "10%" },
        { range: "₹9,00,001 to ₹12,00,000", rate: "15%" },
        { range: "₹12,00,001 to ₹15,00,000", rate: "20%" },
        { range: "₹15,00,001 and above", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹6,00,000", rate: "5%" },
        { range: "₹6,00,001 to ₹9,00,000", rate: "10%" },
        { range: "₹9,00,001 to ₹12,00,000", rate: "15%" },
        { range: "₹12,00,001 to ₹15,00,000", rate: "20%" },
        { range: "₹15,00,001 and above", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹3,00,000", rate: "0%" },
        { range: "₹3,00,001 to ₹6,00,000", rate: "5%" },
        { range: "₹6,00,001 to ₹9,00,000", rate: "10%" },
        { range: "₹9,00,001 to ₹12,00,000", rate: "15%" },
        { range: "₹12,00,001 to ₹15,00,000", rate: "20%" },
        { range: "₹15,00,001 and above", rate: "30%" },
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
        { range: "₹15,00,001 and above", rate: "30%" },
      ],
      "60 to 80": [
        { range: "Up to ₹2,50,000", rate: "0%" },
        { range: "₹2,50,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹7,50,000", rate: "10%" },
        { range: "₹7,50,001 to ₹10,00,000", rate: "15%" },
        { range: "₹10,00,001 to ₹12,50,000", rate: "20%" },
        { range: "₹12,50,001 to ₹15,00,000", rate: "25%" },
        { range: "₹15,00,001 and above", rate: "30%" },
      ],
      "Above 80": [
        { range: "Up to ₹2,50,000", rate: "0%" },
        { range: "₹2,50,001 to ₹5,00,000", rate: "5%" },
        { range: "₹5,00,001 to ₹7,50,000", rate: "10%" },
        { range: "₹7,50,001 to ₹10,00,000", rate: "15%" },
        { range: "₹10,00,001 to ₹12,50,000", rate: "20%" },
        { range: "₹12,50,001 to ₹15,00,000", rate: "25%" },
        { range: "₹15,00,001 and above", rate: "30%" },
      ],
    }
  }
};

const TaxGraph: React.FC<{
  regime: string;
  ageGroup: string;
  fy: string;
  income: number;
}> = ({ regime, ageGroup, fy, income }) => {
  const [boundaryXCoords, setBoundaryXCoords] = useState<Record<number, number>>({});

  const calculateTaxForIncome = (amount: number): number => {
    const regimeKey = regime.toLowerCase().replace(' ', '');
    const slabs = TAX_SLABS[regimeKey][fy][ageGroup];
    let totalTax = 0;
    let remainingIncome = amount;

    // Sort slabs to ensure proper order
    const sortedSlabs = [...slabs].sort((a, b) => {
      const getAmount = (range: string) => {
        const match = range.match(/₹([\d,]+)/);
        return match ? parseInt(match[1].replace(/,/g, '')) : 0;
      };
      return getAmount(a.range) - getAmount(b.range);
    });

    for (const slab of sortedSlabs) {
      const range = slab.range;
      const rate = parseInt(slab.rate.replace('%', '')) / 100;

      if (range.startsWith('Up to')) {
        const limit = parseInt(range.match(/₹([\d,]+)/)?.[1].replace(/,/g, '') || '0');
        const taxableAmount = Math.min(remainingIncome, limit);
        totalTax += taxableAmount * rate;
        remainingIncome -= taxableAmount;
      } else if (range.includes('to')) {
        const [start, end] = range.match(/₹([\d,]+) to ₹([\d,]+)/)?.slice(1) || [];
        const startAmount = parseInt(start.replace(/,/g, ''));
        const endAmount = parseInt(end.replace(/,/g, ''));
        const taxableAmount = Math.min(Math.max(remainingIncome, 0), endAmount - startAmount);
        totalTax += taxableAmount * rate;
        remainingIncome -= taxableAmount;
      } else if (range.includes('and above')) {
        const startAmount = parseInt(range.match(/₹([\d,]+)/)?.[1].replace(/,/g, '') || '0');
        if (remainingIncome > 0) {
          totalTax += remainingIncome * rate;
        }
      }
    }

    return Math.round(totalTax);
  };

  const getTaxCurveData = (): TaxPoint[] => {
    const data: TaxPoint[] = [];
    const maxIncomeForCurve = Math.max(5000000, income); // Use at least 50 lakhs or current income
    const step = 2000; // 2,000 rupees step

    for (let currentIncome = 0; currentIncome <= maxIncomeForCurve; currentIncome += step) {
      const tax = calculateTaxForIncome(currentIncome);
      data.push({
        income: currentIncome,
        tax,
        label: `₹${tax.toLocaleString()}`
      });
    }

    return data;
  };

  // Create the dot that shows current position with labels
  const CustomDot = ({ cx, cy, payload }: any) => {
    if (!payload) return null;
    return (
      <g>
        {/* Vertical line through pointer */}
        <line
          x1={cx}
          y1={0}
          x2={cx}
          y2={cy}
          stroke="#1976d2"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        {/* Background for better contrast */}
        <rect
          x={cx - 45}
          y={cy - 30}
          width={90}
          height={20}
          rx={4}
          fill="rgba(0, 0, 0, 0.7)"
        />
        {/* Tax amount label */}
        <text
          x={cx}
          y={cy - 15}
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontWeight="bold"
        >
          ₹{payload.tax.toLocaleString()}
        </text>
        {/* Dot */}
        <circle
          cx={cx}
          cy={cy}
          r={6}
          stroke="white"
          strokeWidth={3}
          fill="#1976d2"
        />
      </g>
    );
  };

  const getSlabBoundaries = () => {
    const regimeKey = regime.toLowerCase().replace(' ', '');
    const slabs = TAX_SLABS[regimeKey][fy][ageGroup];
    const boundaries: { income: number; rate: string }[] = [];

    // Sort slabs to ensure proper order
    const sortedSlabs = [...slabs].sort((a, b) => {
      const getAmount = (range: string) => {
        const match = range.match(/₹([\d,]+)/);
        return match ? parseInt(match[1].replace(/,/g, '')) : 0;
      };
      return getAmount(a.range) - getAmount(b.range);
    });

    // Always add 0 as the first boundary with the first slab's rate
    boundaries.push({ income: 0, rate: sortedSlabs[0].rate });

    sortedSlabs.forEach((slab, index) => {
      const range = slab.range;
      const rate = slab.rate;
      const nextRate = index < sortedSlabs.length - 1 ? sortedSlabs[index + 1].rate : rate;

      if (range.startsWith('Up to')) {
        const amount = parseInt(range.match(/₹([\d,]+)/)?.[1].replace(/,/g, '') || '0');
        boundaries.push({ income: amount, rate: nextRate });
      } else if (range.includes('to')) {
        const [start, end] = range.match(/₹([\d,]+) to ₹([\d,]+)/)?.slice(1) || [];
        const startAmount = parseInt(start.replace(/,/g, ''));
        const endAmount = parseInt(end.replace(/,/g, ''));
        boundaries.push({ income: startAmount, rate: rate });
        boundaries.push({ income: endAmount, rate: nextRate });
      } else if (range.includes('and above')) {
        const startAmount = parseInt(range.match(/₹([\d,]+)/)?.[1].replace(/,/g, '') || '0');
        boundaries.push({ income: startAmount, rate: rate });
      }
    });

    // Sort and remove duplicates while preserving the correct rate for each boundary
    return boundaries
      .sort((a, b) => a.income - b.income)
      .filter((boundary, index, self) => 
        index === self.findIndex(b => b.income === boundary.income)
      );
  };

  // Create custom vertical grid lines with labels
  const CustomizedAxisTick = ({ x, y, payload }: any) => {
    return null; // Return null to hide all grid lines and labels
  };

  // Create custom square dots for tax slab boundaries
  const CustomSquareDot = ({ cx, cy, payload }: any) => {
    if (!payload) return null;

    // Get all boundaries to determine if we should show rate
    const boundaries = getSlabBoundaries();
    const currentIndex = boundaries.findIndex(b => b.income === payload.income);
    const showRate = currentIndex < boundaries.length - 1;
    
    return (
      <g>
        {/* Square dot */}
        <rect
          x={cx - 4}
          y={cy - 4}
          width={8}
          height={8}
          fill="white"
          stroke="#1976d2"
          strokeWidth={2}
        />
        {/* Tax rate label */}
        {showRate && (
          <text
            x={cx}
            y={cy - 20}
            textAnchor="middle"
            fill="black"
            fontSize={10}
            fontWeight="normal"
          >
            {boundaries[currentIndex].rate}
          </text>
        )}
      </g>
    );
  };

  return (
    <Box sx={{ 
      width: '100%', 
      height: 300,
      mt: 2,
      mb: 0,
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px 8px 0 0',
      '& .recharts-wrapper': {
        width: '100% !important'
      }
    }}>
      <ResponsiveContainer width="100%">
        <AreaChart
          data={getTaxCurveData()}
          margin={{ top: 30, right: 38, left: 38, bottom: 6 }}
        >
          <XAxis
            dataKey="income"
            type="number"
            domain={[0, Math.max(5000000, income)]}
            hide={true}
            ticks={[]}
            tick={<CustomizedAxisTick />}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="tax"
            type="number"
            domain={[0, 1200000]}
            hide={true}
          />
          {/* Add shadow effect for crossed area */}
          <defs>
            <linearGradient id="shadowGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1976d2" stopOpacity={0.3} />
              <stop offset={`${(income / Math.max(5000000, income)) * 100}%`} stopColor="#1976d2" stopOpacity={0.3} />
              <stop offset={`${(income / Math.max(5000000, income)) * 100}%`} stopColor="#1976d2" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#1976d2" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="linear"
            dataKey="tax"
            stroke="#1976d2"
            fill="url(#shadowGradient)"
            isAnimationActive={false}
            strokeWidth={2}
          />
          {/* Add square dots at tax slab boundaries */}
          <Area
            type="linear"
            dataKey="tax"
            stroke="none"
            fill="none"
            dot={<CustomSquareDot />}
            data={getSlabBoundaries().map(boundary => ({
              income: boundary.income,
              tax: calculateTaxForIncome(boundary.income)
            }))}
            isAnimationActive={false}
          />
          <Area
            type="linear"
            dataKey="tax"
            stroke="none"
            fill="none"
            dot={<CustomDot />}
            data={[{ income, tax: calculateTaxForIncome(income) }]}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

const TaxSlab: React.FC<TaxSlabProps> = ({
  selectedFY,
  selectedAgeGroup,
  selectedRegime,
  onFYChange,
  onAgeGroupChange,
  onRegimeChange,
}) => {
  const [open, setOpen] = useState(false);
  const [taxableIncome, setTaxableIncome] = useState<number>(500000);
  const [isEditing, setIsEditing] = useState(false);
  const [tempIncome, setTempIncome] = useState<string>('');

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
    setTempIncome(newValue.toString());
  };

  const handleIncomeEdit = () => {
    setIsEditing(true);
    setTempIncome(taxableIncome.toString());
  };

  const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    setTempIncome(value);
  };

  const handleIncomeBlur = () => {
    const value = parseInt(tempIncome) || 0;
    const maxValue = 20000000; // 2 crores
    const validValue = Math.min(Math.max(value, 0), maxValue);
    setTaxableIncome(validValue);
    setIsEditing(false);
  };

  const handleIncomeKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleIncomeBlur();
    }
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
    let totalTax = 0;
    let remainingIncome = taxableIncome;

    // Sort slabs to ensure proper order
    const sortedSlabs = [...slabs].sort((a, b) => {
      const getAmount = (range: string) => {
        const match = range.match(/₹([\d,]+)/);
        return match ? parseInt(match[1].replace(/,/g, '')) : 0;
      };
      return getAmount(a.range) - getAmount(b.range);
    });

    for (const slab of sortedSlabs) {
      const range = slab.range;
      const rate = parseInt(slab.rate.replace('%', '')) / 100;

      if (range.startsWith('Up to')) {
        const limit = parseInt(range.match(/₹([\d,]+)/)?.[1].replace(/,/g, '') || '0');
        const taxableAmount = Math.min(remainingIncome, limit);
        totalTax += taxableAmount * rate;
        remainingIncome -= taxableAmount;
      } else if (range.includes('to')) {
        const [start, end] = range.match(/₹([\d,]+) to ₹([\d,]+)/)?.slice(1) || [];
        const startAmount = parseInt(start.replace(/,/g, ''));
        const endAmount = parseInt(end.replace(/,/g, ''));
        const taxableAmount = Math.min(Math.max(remainingIncome, 0), endAmount - startAmount);
        totalTax += taxableAmount * rate;
        remainingIncome -= taxableAmount;
      } else if (range.includes('and above')) {
        const startAmount = parseInt(range.match(/₹([\d,]+)/)?.[1].replace(/,/g, '') || '0');
        if (remainingIncome > 0) {
          totalTax += remainingIncome * rate;
        }
      }
    }

    return Math.round(totalTax);
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
        <strong>Surcharge Rates:</strong>
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
        <strong>Health & Education Cess:</strong>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        • A cess of 4% on the total income tax (including any surcharge) applies to all taxpayers.
      </Typography>
    </Box>
  );

  const renderTaxReliefInfo = () => (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle2" gutterBottom>
        <strong>Tax Relief:</strong>
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
            • Deduction for employer's contribution to NPS account under Section 80CCD(2) up to 14% of employee's basic salary from FY 2024-25 onwards, earlier it was 10%. 
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

  const renderSmallLabel = (label: string, tooltip: string) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {label}
      <Tooltip title={tooltip} arrow>
        <IconButton size="small" sx={{ ml: 0.5 }}>
          <HelpOutlineIcon sx={{ fontSize: '1rem' }} />
        </IconButton>
      </Tooltip>
    </div>
  );

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

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom align="center">
          Income Tax Slab and Rate
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          This section helps you understand the tax slabs applicable to your income based on the selected tax regime, financial year, and age group. The tabular data shows tax rate boundaries and provides a clear view of progressive tax rates. 
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Use the slider or input field to adjust your taxable income, and see the estimated tax amount instantly. You can visualize how your tax liability changes with income using the interactive graph.
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
                <TableCell><strong>Income Slab Range</strong></TableCell>
                <TableCell align="right"><strong>Tax Rate</strong></TableCell>
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

        <Box sx={{ 
          mt: 4, 
          mb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}>
          <Box sx={{ 
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <TaxGraph
              regime={selectedRegime}
              ageGroup={selectedAgeGroup}
              fy={selectedFY}
              income={taxableIncome}
            />
            
            <Box sx={{ 
              mt: 0,
              mb: 0,
              width: '100%',
              px: 4.5,
              pt: 0.375,
              backgroundColor: '#f5f5f5',
              borderRadius: '0 0 8px 8px'
            }}>
              <Slider
                value={taxableIncome}
                onChange={handleSliderChange}
                min={0}
                max={5000000}
                step={1000}
                sx={{
                  '& .MuiSlider-thumb': {
                    width: 24,
                    height: 24,
                    backgroundColor: '#fff',
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: '#1976d2',
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#666',
                  }
                }}
              />
            </Box>

            <Grid container spacing={3} sx={{ mt: 1, width: '100%' }}>
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    fontSize: '0.8rem',
                    mb: 0.5 
                  }}
                >
                  {renderLabel(
                    "Net Taxable Income",
                    "Enter your total taxable income after considering applicable deductions and exemptions"
                  )}
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
                  {isEditing ? (
                    <TextField
                      value={tempIncome}
                      onChange={handleIncomeChange}
                      onBlur={handleIncomeBlur}
                      onKeyPress={handleIncomeKeyPress}
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
                        onClick={handleIncomeEdit}
                        sx={{ 
                          cursor: 'pointer',
                          flex: 1,
                          fontSize: '1rem',
                          '&:hover': {
                            color: 'primary.main'
                          }
                        }}
                      >
                        ₹{taxableIncome.toLocaleString('en-IN')}
                      </Box>
                      <IconButton 
                        size="small" 
                        onClick={handleIncomeEdit}
                        sx={{ color: '#000000', ml: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    fontSize: '0.8rem',
                    mb: 0.5 
                  }}
                >
                  {renderLabel(
                    "Tax Estimate",
                    "Estimated tax liability based on your taxable income without surcharge, cess and relief"
                  )}
                </Typography>
                <Box sx={{ 
                  bgcolor: '#ffffff',
                  borderRadius: 1,
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: '56px',
                  px: 2,
                  py: 1,
                  fontSize: '1rem'
                }}>
                  ₹{calculateTax().toLocaleString('en-IN')}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {renderSurchargeInfo()}
        {renderCessInfo()}
        {renderTaxReliefInfo()}
      </CardContent>
    </Card>
  );
};

export default TaxSlab;