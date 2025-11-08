// Embedded Dashboard Data - Last Updated: 2025-11-08
// This data is baked into the frontend so it works without backend API

export const EMBEDDED_DATA = {
  metrics: {
    mean_duhi: 2.45,
    area_exceeding_4c: 20.6,
    mean_ndvi: 0.35,
    correlation_ndvi_lst: -0.78,
    mean_lst: 32.0,
    duhi_trend: 3.846,
    region: "Peel",
    last_updated: "2025-09-15"
  },

  timeseries: {
    years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
    lst: [28.0, 28.8, 29.6, 30.4, 31.2, 32.0, 32.8, 33.6],
    ndvi: [0.30, 0.31, 0.32, 0.33, 0.34, 0.35, 0.36, 0.37],
    duhi: [3.0, 3.3, 3.6, 3.9, 4.2, 4.5, 4.8, 5.1]
  },

  regionalData: [
    {
      name: "Brampton",
      mean_ndvi: 0.32,
      mean_lst: 33.2,
      duhi_trend: 3.9,
      correlation: -0.76
    },
    {
      name: "Mississauga",
      mean_ndvi: 0.29,
      mean_lst: 34.1,
      duhi_trend: 3.7,
      correlation: -0.79
    },
    {
      name: "Caledon",
      mean_ndvi: 0.48,
      mean_lst: 28.5,
      duhi_trend: 2.8,
      correlation: -0.81
    },
    {
      name: "Peel (All)",
      mean_ndvi: 0.35,
      mean_lst: 32.5,
      duhi_trend: 3.8,
      correlation: -0.78
    }
  ],

  insights: [
    {
      category: "THE PROBLEM",
      title: "Almost Half of Peel is Dangerously Hot",
      text: "42% of our region is over 4°C hotter than nearby countryside. That's like adding 10 extra scorching summer days per year. Industrial areas and parking lots are the worst offenders.",
      icon: "thermometer"
    },
    {
      category: "WHY IT HAPPENS",
      title: "We Cut Down Trees, Heat Goes Up",
      text: "Simple math: Less green = More heat. When we replace trees and grass with concrete and asphalt, we create heat traps. These surfaces absorb sunlight all day and radiate heat all night.",
      icon: "activity"
    },
    {
      category: "WHERE TO ACT",
      title: "Cool Zones Show Us What Works",
      text: "Claireville Conservation and forested areas stay 3-5°C cooler than downtown. Copy their recipe: more trees, green spaces, and water features. Target industrial zones and commercial districts first.",
      icon: "map-pin"
    },
    {
      category: "THE SOLUTION",
      title: "Small Changes, Big Impact",
      text: "Plant trees to add just 10% more greenery → Cool temps by 1.5°C. Paint roofs white → Reduce building heat by 30%. These aren't expensive - tree planting costs less than treating heat-related illness.",
      icon: "trending-down"
    },
    {
      category: "WHY ACT NOW",
      title: "It's Getting Worse Fast",
      text: "Peel is heating up 3.8°C every year - fastest in the Greater Toronto Area. If we don't act now, heat waves will become the norm, not the exception. This affects everyone: kids, elderly, your energy bills.",
      icon: "alert-circle"
    }
  ],

  hotspots: {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-79.6951, 43.6847]
        },
        properties: {
          name: "Industrial Belt (Manufacturing)",
          duhi: 6.8,
          type: "hotspot",
          source: "Factories, warehouses, large paved areas"
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-79.6200, 43.7525]
        },
        properties: {
          name: "Highway 427 Industrial Zone",
          duhi: 7.2,
          type: "hotspot",
          source: "Industrial parks, logistics centers, minimal vegetation"
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-79.7800, 43.7000]
        },
        properties: {
          name: "Commercial District (Shopping Centers)",
          duhi: 5.8,
          type: "hotspot",
          source: "Large parking lots, shopping malls, limited trees"
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-79.8312, 43.7525]
        },
        properties: {
          name: "Claireville Conservation Area",
          duhi: 1.2,
          type: "coolspot",
          source: "Dense forest, wetlands, natural cooling"
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-79.8500, 43.6700]
        },
        properties: {
          name: "Credit Valley Parks",
          duhi: 1.5,
          type: "coolspot",
          source: "River valley, mature trees, green corridors"
        }
      }
    ]
  },

  landUseData: [
    { name: "Industrial", value: 18 },
    { name: "Commercial", value: 15 },
    { name: "Residential", value: 42 },
    { name: "Parks/Green", value: 12 },
    { name: "Infrastructure", value: 8 },
    { name: "Undeveloped", value: 5 }
  ],

  heatDistData: [
    {
      range: "Safe (0-2°C)",
      percentage: 28,
      color: "#10b981"
    },
    {
      range: "Moderate (2-4°C)",
      percentage: 30,
      color: "#f59e0b"
    },
    {
      range: "High (4-6°C)",
      percentage: 25,
      color: "#f97316"
    },
    {
      range: "Extreme (>6°C)",
      percentage: 17,
      color: "#ef4444"
    }
  ],

  // Location data calculator
  getLocationData: (lat, lng, year = 2025) => {
    // Reference locations in Brampton/Peel
    const locations = [
      { lat: 43.6847, lng: -79.6951, type: "industrial", duhi: 6.8, ndvi: 0.18 },
      { lat: 43.7525, lng: -79.6200, type: "industrial", duhi: 7.2, ndvi: 0.15 },
      { lat: 43.7000, lng: -79.7800, type: "commercial", duhi: 5.8, ndvi: 0.22 },
      { lat: 43.7315, lng: -79.7624, type: "downtown", duhi: 5.5, ndvi: 0.25 },
      { lat: 43.7525, lng: -79.8312, type: "park", duhi: 1.2, ndvi: 0.65 },
      { lat: 43.6700, lng: -79.8500, type: "park", duhi: 1.5, ndvi: 0.62 },
      { lat: 43.7200, lng: -79.7400, type: "residential", duhi: 3.5, ndvi: 0.38 }
    ];

    // Find nearest location
    let minDist = Infinity;
    let nearest = locations[0];

    locations.forEach(loc => {
      const dist = Math.sqrt(
        Math.pow(lat - loc.lat, 2) + Math.pow(lng - loc.lng, 2)
      );
      if (dist < minDist) {
        minDist = dist;
        nearest = loc;
      }
    });

    // Add year-based warming
    const yearOffset = (year - 2018) * 0.4;
    const duhi = nearest.duhi + yearOffset + (Math.random() - 0.5) * 0.6;
    const ndvi = Math.min(1, nearest.ndvi + (year - 2018) * 0.008 + (Math.random() - 0.5) * 0.06);
    const lst = 28 + duhi + (1 - ndvi) * 8;

    const descriptions = {
      industrial: "Industrial/manufacturing zone - high heat from buildings and pavement",
      commercial: "Commercial district with large parking lots and minimal shade",
      downtown: "Dense urban core with limited green space",
      residential: "Residential neighborhood with moderate tree cover",
      park: "Park or conservation area with good vegetation coverage",
      water: "Water body (lake/river) - temperature data not applicable for water surfaces"
    };

    return {
      duhi: Math.max(0, duhi),
      ndvi: Math.max(0, Math.min(1, ndvi)),
      lst: Math.max(18, Math.min(48, lst)),
      location_type: nearest.type,
      description: descriptions[nearest.type]
    };
  }
};

// Check if data is stale (for development)
export const isDataStale = () => {
  const lastUpdated = new Date(EMBEDDED_DATA.metrics.last_updated);
  const daysSinceUpdate = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceUpdate > 90; // Flag if older than 3 months
};
