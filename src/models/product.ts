import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true },
  },
  { collection: 'products' },
);

export default mongoose.models.products || mongoose.model('products', productSchema);
