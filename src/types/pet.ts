export interface Pet {
  _id: string;
  name: string;
  bornDate?: Date;
  type: string;
  breed: string;
  imageUrl: string | null;
  owner_id: string;
}
