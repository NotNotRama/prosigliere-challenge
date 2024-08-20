import React, { createContext, useContext, useState, useEffect } from 'react';

export type House = 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw' | null;

interface HouseContextProps {
  house: House;
  setHouse: (house: House) => void;
}

const HouseContext = createContext<HouseContextProps | undefined>(undefined);

export const useHouse = () => {
  const context = useContext(HouseContext);
  if (!context) {
    throw new Error('useHouse must be used within a HouseProvider');
  }
  return context;
};

export const HouseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [house, setHouseState] = useState<House>(null);

  useEffect(() => {
    const storedHouse = localStorage.getItem('selectedHouse');
    if (storedHouse) {
      setHouseState(storedHouse as House);
    }
  }, []);

  const setHouse = (newHouse: House) => {
    setHouseState(newHouse);
    if (newHouse) {
      localStorage.setItem('selectedHouse', newHouse);
    } else {
      localStorage.removeItem('selectedHouse');
    }
  };

  return <HouseContext.Provider value={{ house, setHouse }}>{children}</HouseContext.Provider>;
};
