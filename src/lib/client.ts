import axios from 'axios';

const baseUrl = 'https://hp-api.onrender.com/api';

type Wand = {
  wood: string;
  core: string;
  length: number;
};

export type Character = {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  yearOfBirth: number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: Wand;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternate_actors: string[];
  alive: boolean;
  image: string;
};

export const client = {
  getAllCharacters: (): Promise<Character[]> =>
    axios.get(`${baseUrl}/characters`).then((res) => res.data),
  getStaff: (): Promise<Character[]> =>
    axios.get(`${baseUrl}/characters/staff`).then((res) => res.data),
  getStudents: (): Promise<Character[]> =>
    axios.get(`${baseUrl}/characters/students`).then((res) => res.data),
  getCharacter: (id: string): Promise<Character> =>
    axios.get(`${baseUrl}/character/${id}`).then((res) => res.data[0]),
};
