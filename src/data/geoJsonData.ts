// GeoJSON helper for Globe 3D polygons
export interface GeoFeature {
  type: string;
  id?: string | number;
  properties: {
    ISO_A2?: string;
    ISO_A3?: string;
    ADMIN?: string;
    NAME?: string;
    name?: string;
    CONTINENT?: string;
    [key: string]: unknown;
  };
  geometry: {
    type: string;
    coordinates: number[][][] | number[][][][];
  };
}

export interface GeoJSONData {
  type: string;
  features: GeoFeature[];
}

// Fallback simplified GeoJSON for instant rendering
export const FALLBACK_GEOJSON: GeoJSONData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "VNM",
      properties: { ADMIN: "Vietnam", ISO_A2: "VN", ISO_A3: "VNM", NAME: "Việt Nam", id: "vietnam" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [102.14, 22.4], [104.0, 23.39], [106.7, 23.3], [108.0, 21.5],
            [107.0, 20.9], [105.8, 19.8], [106.5, 17.5], [108.2, 16.1],
            [109.2, 13.8], [109.3, 11.9], [108.7, 10.7], [107.0, 10.3],
            [105.0, 8.6], [104.5, 10.4], [105.1, 10.9], [106.0, 11.5],
            [107.5, 12.2], [107.6, 14.5], [106.0, 16.5], [104.0, 19.5],
            [103.0, 21.0], [102.14, 22.4]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "JPN",
      properties: { ADMIN: "Japan", ISO_A2: "JP", ISO_A3: "JPN", NAME: "Nhật Bản", id: "japan" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [140.5, 35.5], [141.5, 38.5], [141.0, 41.5], [140.0, 41.0],
            [138.5, 37.5], [136.0, 36.5], [133.0, 35.0], [130.5, 33.5],
            [131.0, 31.5], [133.0, 33.5], [136.0, 34.5], [139.5, 35.0],
            [140.5, 35.5]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "CHN",
      properties: { ADMIN: "China", ISO_A2: "CN", ISO_A3: "CHN", NAME: "Trung Quốc", id: "china" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [75.0, 38.0], [80.0, 45.0], [90.0, 48.0], [115.0, 50.0],
            [130.0, 48.0], [131.0, 43.0], [124.0, 40.0], [121.0, 32.0],
            [119.0, 26.0], [113.0, 22.0], [108.0, 21.5], [104.0, 23.0],
            [98.0, 28.0], [88.0, 28.0], [80.0, 35.0], [75.0, 38.0]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "KOR",
      properties: { ADMIN: "South Korea", ISO_A2: "KR", ISO_A3: "KOR", NAME: "Hàn Quốc", id: "south_korea" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [126.0, 38.0], [128.5, 38.5], [129.5, 36.0], [128.5, 35.0],
            [126.5, 34.5], [126.0, 36.0], [126.0, 38.0]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "THA",
      properties: { ADMIN: "Thailand", ISO_A2: "TH", ISO_A3: "THA", NAME: "Thái Lan", id: "thailand" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [98.0, 20.0], [101.0, 19.5], [102.5, 17.5], [105.5, 15.5],
            [103.0, 13.5], [102.5, 11.5], [100.0, 13.0], [99.0, 9.0],
            [101.0, 6.0], [99.5, 6.5], [98.5, 10.0], [98.0, 15.0],
            [98.0, 20.0]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "IND",
      properties: { ADMIN: "India", ISO_A2: "IN", ISO_A3: "IND", NAME: "Ấn Độ", id: "india" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [74.0, 36.0], [80.0, 31.0], [88.0, 27.5], [97.0, 28.0],
            [92.0, 22.0], [87.0, 21.5], [80.0, 16.0], [80.0, 10.0],
            [77.5, 8.0], [73.5, 15.0], [70.0, 22.0], [68.5, 24.0],
            [74.0, 36.0]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "FRA",
      properties: { ADMIN: "France", ISO_A2: "FR", ISO_A3: "FRA", NAME: "Pháp", id: "france" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-4.5, 48.5], [2.0, 51.0], [7.5, 49.0], [7.0, 44.0],
            [3.0, 42.5], [-1.5, 43.5], [-1.0, 46.0], [-4.5, 48.5]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "GBR",
      properties: { ADMIN: "United Kingdom", ISO_A2: "GB", ISO_A3: "GBR", NAME: "Vương Quốc Anh", id: "united_kingdom" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-5.0, 50.0], [1.5, 51.0], [0.0, 53.5], [-2.0, 57.0],
            [-5.0, 58.5], [-6.0, 55.0], [-3.0, 53.0], [-5.0, 50.0]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "DEU",
      properties: { ADMIN: "Germany", ISO_A2: "DE", ISO_A3: "DEU", NAME: "Đức", id: "germany" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [6.0, 51.0], [9.0, 54.5], [14.0, 54.0], [15.0, 51.0],
            [13.0, 48.0], [8.0, 48.0], [6.0, 49.5], [6.0, 51.0]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "ITA",
      properties: { ADMIN: "Italy", ISO_A2: "IT", ISO_A3: "ITA", NAME: "Italia", id: "italy" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [7.0, 45.5], [13.5, 46.0], [12.5, 43.0], [18.0, 40.0],
            [16.0, 38.0], [15.0, 40.0], [11.0, 43.5], [7.5, 44.0],
            [7.0, 45.5]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "EGY",
      properties: { ADMIN: "Egypt", ISO_A2: "EG", ISO_A3: "EGY", NAME: "Ai Cập", id: "egypt" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [25.0, 31.5], [34.0, 31.5], [35.5, 28.0], [36.0, 22.0],
            [25.0, 22.0], [25.0, 31.5]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "USA",
      properties: { ADMIN: "United States", ISO_A2: "US", ISO_A3: "USA", NAME: "Hoa Kỳ", id: "united_states" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-124.5, 48.5], [-95.0, 49.0], [-67.0, 45.0], [-75.0, 35.0],
            [-80.5, 25.0], [-97.0, 26.0], [-117.0, 32.5], [-124.0, 40.0],
            [-124.5, 48.5]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "CAN",
      properties: { ADMIN: "Canada", ISO_A2: "CA", ISO_A3: "CAN", NAME: "Canada", id: "canada" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-141.0, 69.5], [-120.0, 75.0], [-60.0, 60.0], [-53.0, 47.0],
            [-67.0, 45.0], [-95.0, 49.0], [-124.5, 48.5], [-130.0, 55.0],
            [-141.0, 60.0], [-141.0, 69.5]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "BRA",
      properties: { ADMIN: "Brazil", ISO_A2: "BR", ISO_A3: "BRA", NAME: "Brazil", id: "brazil" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-70.0, -4.0], [-60.0, 3.0], [-50.0, 1.0], [-35.0, -5.0],
            [-38.0, -18.0], [-48.0, -25.0], [-53.0, -33.0], [-58.0, -28.0],
            [-58.0, -20.0], [-73.0, -8.0], [-70.0, -4.0]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "AUS",
      properties: { ADMIN: "Australia", ISO_A2: "AU", ISO_A3: "AUS", NAME: "Australia", id: "australia" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [114.0, -22.0], [130.0, -12.0], [142.0, -11.0], [153.0, -28.0],
            [150.0, -37.0], [138.0, -35.0], [118.0, -35.0], [113.0, -26.0],
            [114.0, -22.0]
          ]
        ]
      }
    },
    {
      type: "Feature",
      id: "RUS",
      properties: { ADMIN: "Russia", ISO_A2: "RU", ISO_A3: "RUS", NAME: "Nga", id: "russia" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [30.0, 60.0], [40.0, 68.0], [80.0, 73.0], [140.0, 72.0],
            [170.0, 65.0], [160.0, 55.0], [135.0, 45.0], [115.0, 50.0],
            [85.0, 52.0], [55.0, 50.0], [38.0, 50.0], [30.0, 60.0]
          ]
        ]
      }
    }
  ]
};

// URL to Natural Earth 110m low-res country boundaries GeoJSON
export const WORLD_GEOJSON_URL = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json';
export const GEOJSON_FALLBACK_URL = 'https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson';
