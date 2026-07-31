import { z } from 'zod';

const createPropertyZodSchema = z.object({
  body: z.object({
    title: z.string({ message: 'Title is required' }),
    description: z.string({ message: 'Description is required' }),
    location: z.string({ message: 'Location is required' }),
    price: z.number({ message: 'Price is required' }).positive(),
    type: z.string({ message: 'Type is required' }),
    amenities: z.array(z.string()).min(1, 'At least one amenity is required'),
  }),
});

export const PropertyValidations = {
  createPropertyZodSchema,
};
