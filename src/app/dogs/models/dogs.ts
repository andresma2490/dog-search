export interface DogListDTO {
  message: DogList;
  status: string;
  code?: number;
}

export interface BreedListDTO extends Omit<DogListDTO, 'message'> {
  message: string[];
}

export interface DogList {
  [key: string]: string;
}

export interface Dog {
  breed: string;
  image: string;
}
