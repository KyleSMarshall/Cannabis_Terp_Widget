import React, { PureComponent } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import {
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const strains = [
  { strain: "Blue Dream", Myrcene: 70, Limonene: 30, Pinene: 50, Caryophyllene: 40, Linalool: 20, Humulene: 10 },
  { strain: "Sour Diesel", Myrcene: 40, Limonene: 60, Pinene: 55, Caryophyllene: 35, Linalool: 15, Humulene: 20 },
  { strain: "OG Kush", Myrcene: 65, Limonene: 45, Pinene: 35, Caryophyllene: 60, Linalool: 25, Humulene: 15 },
  { strain: "Girl Scout Cookies", Myrcene: 55, Limonene: 50, Pinene: 40, Caryophyllene: 50, Linalool: 30, Humulene: 25 },
  { strain: "Pineapple Express", Myrcene: 45, Limonene: 70, Pinene: 60, Caryophyllene: 30, Linalool: 10, Humulene: 15 },
  { strain: "Granddaddy Purple", Myrcene: 80, Limonene: 25, Pinene: 30, Caryophyllene: 55, Linalool: 40, Humulene: 20 },
  { strain: "Jack Herer", Myrcene: 30, Limonene: 65, Pinene: 70, Caryophyllene: 25, Linalool: 15, Humulene: 10 },
  { strain: "Durban Poison", Myrcene: 25, Limonene: 65, Pinene: 75, Caryophyllene: 20, Linalool: 10, Humulene: 10 },
  { strain: "Lemon Haze", Myrcene: 40, Limonene: 80, Pinene: 70, Caryophyllene: 30, Linalool: 15, Humulene: 10 },
  { strain: "White Widow", Myrcene: 60, Limonene: 35, Pinene: 45, Caryophyllene: 40, Linalool: 10, Humulene: 15 },
  { strain: "AK-47", Myrcene: 55, Limonene: 40, Pinene: 50, Caryophyllene: 45, Linalool: 5, Humulene: 10 },
  { strain: "Girl Scout Cookies Extreme", Myrcene: 50, Limonene: 55, Pinene: 45, Caryophyllene: 50, Linalool: 30, Humulene: 20 },
  { strain: "Blueberry", Myrcene: 75, Limonene: 20, Pinene: 25, Caryophyllene: 55, Linalool: 35, Humulene: 25 },
  { strain: "Chemdawg", Myrcene: 65, Limonene: 25, Pinene: 55, Caryophyllene: 35, Linalool: 10, Humulene: 20 },
  { strain: "Trainwreck", Myrcene: 45, Limonene: 55, Pinene: 60, Caryophyllene: 30, Linalool: 15, Humulene: 10 },
  { strain: "Granddaddy Purple OG", Myrcene: 80, Limonene: 30, Pinene: 35, Caryophyllene: 50, Linalool: 40, Humulene: 20 },
  { strain: "Super Lemon Haze", Myrcene: 35, Limonene: 85, Pinene: 60, Caryophyllene: 20, Linalool: 15, Humulene: 10 },
  { strain: "Northern Lights", Myrcene: 70, Limonene: 20, Pinene: 35, Caryophyllene: 50, Linalool: 25, Humulene: 20 },
  { strain: "Girl Scout Cookies Thin Mint", Myrcene: 50, Limonene: 45, Pinene: 40, Caryophyllene: 50, Linalool: 20, Humulene: 15 },
  { strain: "Blue Cheese", Myrcene: 65, Limonene: 25, Pinene: 30, Caryophyllene: 60, Linalool: 15, Humulene: 25 },
  { strain: "Gorilla Glue", Myrcene: 55, Limonene: 30, Pinene: 45, Caryophyllene: 55, Linalool: 20, Humulene: 15 },
  { strain: "Jack the Ripper", Myrcene: 40, Limonene: 60, Pinene: 50, Caryophyllene: 35, Linalool: 10, Humulene: 10 },
  { strain: "Bruce Banner", Myrcene: 45, Limonene: 70, Pinene: 65, Caryophyllene: 25, Linalool: 15, Humulene: 10 },
  { strain: "Chernobyl", Myrcene: 50, Limonene: 55, Pinene: 60, Caryophyllene: 35, Linalool: 20, Humulene: 15 },
  { strain: "Skywalker OG", Myrcene: 55, Limonene: 40, Pinene: 35, Caryophyllene: 50, Linalool: 25, Humulene: 20 },
  { strain: "Tangie", Myrcene: 30, Limonene: 90, Pinene: 60, Caryophyllene: 20, Linalool: 15, Humulene: 10 },
  { strain: "Sour OG", Myrcene: 60, Limonene: 40, Pinene: 50, Caryophyllene: 45, Linalool: 15, Humulene: 20 },
  { strain: "Maui Wowie", Myrcene: 35, Limonene: 75, Pinene: 55, Caryophyllene: 25, Linalool: 10, Humulene: 10 },
];

const terpeneKeys = ["Myrcene", "Limonene", "Pinene", "Caryophyllene", "Linalool", "Humulene"];

export default class Example extends PureComponent {
  state = {
    selectedStrainA: '',
    selectedStrainB: '',
    showFilter: true,
    filterValues: {
      Myrcene: 0,
      Limonene: 0,
      Pinene: 0,
      Caryophyllene: 0,
      Linalool: 0,
      Humulene: 0,
    },
    hoveredTerpene: null,
  };

  getFilteredStrains() {
    const { filterValues } = this.state;

    return strains.filter((strain) =>
      terpeneKeys.every(
        (key) => (strain[key] ?? 0) >= (filterValues[key] ?? 0)
      )
    );
  }


  getChartData() {
    const { selectedStrainA, selectedStrainB, showFilter, filterValues } = this.state;
    const filteredStrains = this.getFilteredStrains();
    const strainA = filteredStrains.find(s => s.strain === selectedStrainA) || {};
    const strainB = filteredStrains.find(s => s.strain === selectedStrainB) || {};

    return terpeneKeys.map(key => ({
      Terpene: key,
      A: selectedStrainA ? (strainA[key] || 0) : 0,
      B: selectedStrainB ? (strainB[key] || 0) : 0,
      Filter: showFilter ? (filterValues[key] || 0) : 0,
      fullMark: 100,
    }));
  }

  handleStrainAChange = (e) => {
    this.setState({ selectedStrainA: e.target.value });
  };

  handleStrainBChange = (e) => {
    this.setState({ selectedStrainB: e.target.value });
  };

  handleFilterToggle = (e) => {
    this.setState({ showFilter: e.target.checked });
  };

  handleFilterValueChange = (terpene) => (e) => {
    this.setState((prevState) => ({
      filterValues: {
        ...prevState.filterValues,
        [terpene]: Number(e.target.value),
      },
    }));
  };

  handleTerpeneHover = (terpene) => {
    this.setState({ hoveredTerpene: terpene });
  };

  handleReset = () => {
    this.setState({
      selectedStrainA: '',
      selectedStrainB: '',
      showFilter: true,
      filterValues: {
        Myrcene: 0,
        Limonene: 0,
        Pinene: 0,
        Caryophyllene: 0,
        Linalool: 0,
        Humulene: 0,
      },
      hoveredTerpene: null,
    });
  };

  render() {
    const { selectedStrainA, selectedStrainB, showFilter, filterValues, hoveredTerpene } = this.state;
    const filteredStrains = this.getFilteredStrains();
    const chartData = this.getChartData();

    const isHovered = (terpene) => terpene === hoveredTerpene;

    // If no strains match, selectors show only None option
    const strainOptions = filteredStrains.length > 0 ? filteredStrains : [];

    return (
      <div style={{ width: '100%', height: 560, fontFamily: 'Arial, sans-serif', userSelect: 'none' }}>


        <Box sx={{ mb: 4 }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={4}
            alignItems="flex-start"
            justifyContent="center"
            flexWrap="wrap"
          >
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="strainA-label">Select Strain A</InputLabel>
              <Select
                labelId="strainA-label"
                id="strainA-select"
                value={selectedStrainA}
                label="Select Strain A"
                onChange={this.handleStrainAChange}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                }}
              >
                <MenuItem value="">None</MenuItem>
                {strainOptions.map((s) => (
                  <MenuItem key={s.strain} value={s.strain}>
                    {s.strain}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel id="strainB-label">Select Strain B</InputLabel>
              <Select
                labelId="strainB-label"
                id="strainB-select"
                value={selectedStrainB}
                label="Select Strain B"
                onChange={this.handleStrainBChange}
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                  getContentAnchorEl: null,
                }}
              >
                <MenuItem value="">None</MenuItem>
                {strainOptions.map((s) => (
                  <MenuItem key={s.strain} value={s.strain}>
                    {s.strain}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={showFilter}
                  onChange={this.handleFilterToggle}
                />
              }
              label="Show Filter"
            />
          </Stack>
        </Box>



        {showFilter && (
          <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center', gap: 20 }}>
            {terpeneKeys.map((terpene) => (
              <div key={terpene} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label htmlFor={`filter-${terpene}`} style={{ marginBottom: 6 }}>{terpene}</label>
                <input
                  id={`filter-${terpene}`}
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={filterValues[terpene]}
                  onChange={this.handleFilterValueChange(terpene)}
                  style={{ cursor: 'pointer' }}
                />
                <span>{filterValues[terpene]}</span>
              </div>
            ))}
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey="Terpene"
              tick={({ payload, x, y }) => (
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  fill={isHovered(payload.value) ? '#e88428' : '#666'}
                  style={{ fontWeight: isHovered(payload.value) ? 'bold' : 'normal', cursor: 'pointer' }}
                  onMouseEnter={() => this.handleTerpeneHover(payload.value)}
                  onMouseLeave={() => this.handleTerpeneHover(null)}
                >
                  {payload.value}
                </text>
              )}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            {selectedStrainA && (
              <Radar
                name={selectedStrainA}
                dataKey="A"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
            )}
            {selectedStrainB && (
              <Radar
                name={selectedStrainB}
                dataKey="B"
                stroke="#1abc9c"
                fill="#1abc9c"
                fillOpacity={0.6}
              />
            )}
            {showFilter && (
              <Radar
                name="Filter"
                dataKey="Filter"
                stroke="#ffffff"
                fill="#ffffff"
                fillOpacity={0.3}
              />
            )}
            <Legend verticalAlign="top" />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>

        {(filteredStrains.length === 0) && (
          <p style={{ textAlign: 'center', color: 'red', marginTop: 10 }}>
            No strains match current filter criteria.
          </p>
        )}
      </div>
    );
  }
}
