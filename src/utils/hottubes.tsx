import { HotTube } from "../models/HotTubeModel";
import { useEffect, useState } from "react";

// Define the Accessory interface
export interface Accessory {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
}

// Define the ServicePackage interface
export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration?: string;
  imageUrl?: string;
  isDefault?: boolean;
}

// Empty array as initial value
let hottubData: HotTube[] = [];
let accessoriesData: Accessory[] = [];
let servicePackagesData: ServicePackage[] = [];

/**
 * Format dimensions to remove decimal points
 * @param dimensions The dimensions string to format (e.g. "226.06 cm x 226.06 cm x 96.52 cm")
 * @returns Formatted dimensions without decimal points (e.g. "226 cm x 226 cm x 97 cm")
 */
export const formatDimensions = (dimensions: string): string => {
  // Handle different types of dimension strings (metric or imperial)
  if (dimensions.includes('cm')) {
    // Match any number (including decimals) followed by 'cm'
    return dimensions.replace(/(\d+)\.?\d* cm/g, (match) => {
      // Round to nearest integer and return with 'cm'
      return `${Math.round(parseFloat(match))} cm`;
    });
  } else if (dimensions.includes('\'') || dimensions.includes('"')) {
    // For imperial dimensions (feet and inches), keep as is
    return dimensions;
  } else {
    // For any other format, just try to round any decimal numbers
    return dimensions.replace(/(\d+)\.?\d*/g, (match) => {
      return `${Math.round(parseFloat(match))}`;
    });
  }
}

/**
 * Convert dimensions from cm to inches
 * @param dimensions The dimensions string to convert (e.g. "226.06 cm x 226.06 cm x 96.52 cm")
 * @returns Converted dimensions in inches (e.g. "89" (226.06 cm)")
 */
export const convertToInches = (dimensions: string): string => {
  return dimensions.replace(/(\d+)\.?\d* cm/g, (match) => {
    const matchValue = parseFloat(match);
    const inches = Math.round(matchValue / 2.54);
    return `${inches}" (${match})`;
  });
};

// Function to load hottub data from JSON
export const loadHottubes = async (): Promise<HotTube[]> => {
  try {
    // Get current language from localStorage, defaulting to English if not set
    const currentLang = localStorage.getItem('i18nextLng') || 'en';
    
    // Check if we have data in sessionStorage and if it's for the current language
    const sessionData = sessionStorage.getItem("hottubsData");
    if (sessionData) {
      try {
        const parsedData = JSON.parse(sessionData);
        // Only use cached data if the language matches the current language
        if (parsedData.language === currentLang && 
            parsedData.hottubes && Array.isArray(parsedData.hottubes)) {
          console.log(`Loaded hottubes data from sessionStorage for ${currentLang}`);
          hottubData = parsedData.hottubes;
          if (parsedData.accessories && Array.isArray(parsedData.accessories)) {
            accessoriesData = parsedData.accessories;
          }
          if (parsedData.servicePackages && Array.isArray(parsedData.servicePackages)) {
            servicePackagesData = parsedData.servicePackages;
          }
          return hottubData;
        }
      } catch (sessionError) {
        console.error('Error parsing sessionStorage data:', sessionError);
        // Continue to fetch from file if sessionStorage parsing fails
      }
    }
    
    console.log(`Loading hottubes data for language: ${currentLang}`);
    
    // Attempt to load language-specific file
    const dataPath = `/data/translations/hottubes_${currentLang}.json`;
    
    try {
      const response = await fetch(dataPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch hottubes data: ${response.status}`);
      }
      const data = await response.json();
      hottubData = data.hottubes;
      
      // Also capture accessories data if available
      if (data.accessories && Array.isArray(data.accessories)) {
        accessoriesData = data.accessories;
      }
      
      // Also capture service packages data if available
      if (data.servicePackages && Array.isArray(data.servicePackages)) {
        servicePackagesData = data.servicePackages;
      }
      
      // Store the data in sessionStorage for faster subsequent loads
      sessionStorage.setItem('hottubsData', JSON.stringify({
        hottubes: hottubData,
        accessories: accessoriesData,
        servicePackages: servicePackagesData,
        language: currentLang
      }));
      
      console.log(`Successfully loaded data for ${currentLang}`);
      return hottubData;
    } catch  {
      console.warn(`Failed to fetch translated hottubes data for ${currentLang}, trying fallback`);
      
      // Try English fallback if not already trying English
      if (currentLang !== 'en') {
        try {
          const enResponse = await fetch('/data/translations/hottubes_en.json');
          if (enResponse.ok) {
            const data = await enResponse.json();
            hottubData = data.hottubes;
            
            if (data.accessories && Array.isArray(data.accessories)) {
              accessoriesData = data.accessories;
            }
            
            if (data.servicePackages && Array.isArray(data.servicePackages)) {
              servicePackagesData = data.servicePackages;
            }
            
            console.log('Fallback to English successful');
            return hottubData;
          }
        } catch (enError) {
          console.error('English fallback failed:', enError);
        }
      }
      
      // Final fallback to generic hottubes.json (likely English)
      try {
        const fallbackResponse = await fetch('/data/hottubes.json');
        if (!fallbackResponse.ok) {
          throw new Error(`Failed to fetch hottubes data: ${fallbackResponse.status}`);
        }
        const data = await fallbackResponse.json();
        hottubData = data.hottubes;
        
        if (data.accessories && Array.isArray(data.accessories)) {
          accessoriesData = data.accessories;
        }
        
        if (data.servicePackages && Array.isArray(data.servicePackages)) {
          servicePackagesData = data.servicePackages;
        }
        
        console.log('Using generic hottubes.json fallback');
        return hottubData;
      } catch (genericError) {
        console.error('All fallbacks failed. No hottub data available.', genericError);
        return [];
      }
    }
  } catch (error) {
    console.error('Error loading hottubs data:', error);
    return [];
  }
};

// Hook to use hottubes data in components
export const useHottubes = () => {
  const [hottubes, setHottubes] = useState<HotTube[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await loadHottubes();
        setHottubes(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { hottubes, loading, error };
};

// Hook to use accessories data in components
export const useAccessories = () => {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Loading hottubes will also load accessories data
        await loadHottubes();
        setAccessories(accessoriesData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { accessories, loading, error };
};

// Hook to use service packages data in components
export const useServicePackages = () => {
  const [servicePackages, setServicePackages] = useState<ServicePackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Loading hottubes will also load servicePackages data
        await loadHottubes();
        setServicePackages(servicePackagesData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { servicePackages, loading, error };
};

// For backward compatibility, also export the hottubes array directly
// This will initially be empty but will be populated after loadHottubes is called
const hottubes: HotTube[] = hottubData;

// Initialize data on module load
loadHottubes().catch(console.error);

export const getHottubById = (id: string): HotTube | undefined => {
  return hottubes.find(hottube => hottube.id === id);
};

export const getHottubsByCollection = (collection: string): HotTube[] => {
  return hottubes.filter(hottube => hottube.collection === collection);
};

/**
 * Sort hottubes by seating capacity (number of adults)
 * @param ascending If true, sorts from smallest to largest capacity
 */
export const sortHottubsBySeating = (hottubes: HotTube[], ascending: boolean = true): HotTube[] => {
  return [...hottubes].sort((a, b) => {
    // Extract the number from strings like "6 Adults", "2 Adults"
    const seatsA = parseInt(a.seating.split(' ')[0]);
    const seatsB = parseInt(b.seating.split(' ')[0]);
    
    // Return comparison based on ascending or descending order
    return ascending ? seatsA - seatsB : seatsB - seatsA;
  });
};

/**
 * Sort hottubes by price
 * @param ascending If true, sorts from lowest to highest price
 */
export const sortHottubsByPrice = (hottubes: HotTube[], ascending: boolean = true): HotTube[] => {
  return [...hottubes].sort((a, b) => {
    // Parse prices, handling cases with or without currency symbols and with commas
    const priceA = parseFloat(a.price.replace(/[$€£]/g, '').replace(/,/g, ''));
    const priceB = parseFloat(b.price.replace(/[$€£]/g, '').replace(/,/g, ''));
    
    // Return comparison based on ascending or descending order
    return ascending ? priceA - priceB : priceB - priceA;
  });
};

/**
 * Get the price range (min and max) of a collection of hottubes
 */
export const getPriceRange = (hottubes: HotTube[]): {min: number, max: number} => {
  if (hottubes.length === 0) {
    return {min: 0, max: 0};
  }
  
  const prices = hottubes.map(hottub => 
    parseFloat(hottub.price.replace(/[$€£]/g, '').replace(/,/g, ''))
  );
  
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};

/**
 * Get the available seating capacities from a collection of hottubes
 */
export const getSeatingOptions = (hottubes: HotTube[]): number[] => {
  const seatingSet = new Set(
    hottubes.map(hottub => parseInt(hottub.seating.split(' ')[0]))
  );
  
  return Array.from(seatingSet).sort((a, b) => a - b);
};
