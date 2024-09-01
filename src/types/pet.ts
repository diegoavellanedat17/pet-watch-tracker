export interface Pet {
  _id: string;
  name: string;
  age: number;
  type: string;
  breed: string;
  imageUrl: string | null;
  owner_id: string;
}
