import React, { useState } from 'react';
import {
  Container,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography
} from '@mui/material';

import BasicLineChart from './BasicLineChart';
import BasicBarChart from './BasicBarChart';
import BasicPieChart from './BasicPieChart';
import Spark from './Spark';

const ChartsPage = () => {
  const [selectedChart, setSelectedChart] = useState("line");

  const renderChart = () => {
    switch (selectedChart) {
      case "line": return <BasicLineChart />;
      case "bar": return <BasicBarChart />;
      case "pie": return <BasicPieChart />;
      case "spark": return <Spark />;
      default: return <BasicLineChart />;
    }
  };

  return (
    <Container maxWidth="md" sx={{ m:'25px auto'}}>
      {/* Title */}
      <Typography variant="h4" fontWeight={700} sx={{ mb: 3, textAlign: 'center' }}>
        📊 MUI Charts Playground
      </Typography>

      {/* Chart Selector */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Select Chart</InputLabel>
        <Select
          value={selectedChart}
          label="Select Chart"
          onChange={(e) => setSelectedChart(e.target.value)}
        >
          <MenuItem value="line">Line Chart</MenuItem>
          <MenuItem value="bar">Bar Chart</MenuItem>
          <MenuItem value="pie">Pie Chart</MenuItem>
          <MenuItem value="spark">Sparkline Chart</MenuItem>
        </Select>
      </FormControl>

      {/* Chart Container */}
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 350,
          background: (theme) =>
            theme.palette.mode === "dark" ? "#1c1c1c" : "#f9f9f9",
        }}
      >
        {renderChart()}
      </Paper>
    </Container>
  );
};

export default ChartsPage;
