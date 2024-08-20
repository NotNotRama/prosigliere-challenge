import { useState, useEffect } from 'react';

export type House = 'gryffindor' | 'slytherin' | 'hufflepuff' | 'ravenclaw' | null;

export const useHouse = () => {
  const [house, setHouseState] = useState<House>(null);

  useEffect(() => {
    const storedHouse = localStorage.getItem('selectedHouse');
    if (storedHouse) {
      setHouse(storedHouse as House);
    }
  }, []);

  const setHouse = (newHouse: House | null) => {
    if (newHouse) {
      localStorage.setItem('selectedHouse', newHouse);
    } else {
      localStorage.removeItem('selectedHouse');
    }
    setHouseState(newHouse);
  };

  return { house, setHouse };
};
