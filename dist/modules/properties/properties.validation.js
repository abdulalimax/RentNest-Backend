"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyValidations = void 0;
const zod_1 = require("zod");
const createPropertyZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ message: 'Title is required' }),
        description: zod_1.z.string({ message: 'Description is required' }),
        location: zod_1.z.string({ message: 'Location is required' }),
        price: zod_1.z.number({ message: 'Price is required' }).positive(),
        type: zod_1.z.string({ message: 'Type is required' }),
        amenities: zod_1.z.array(zod_1.z.string()).min(1, 'At least one amenity is required'),
    }),
});
exports.PropertyValidations = {
    createPropertyZodSchema,
};
