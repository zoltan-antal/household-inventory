import { useEffect, useState } from 'react';
import BarcodeScanner from './BarcodeScanner';
import axios from 'axios';

interface ProductData {
  product: {
    product_name: string;
    brands: string;
  };
}

function App() {
  const BARCODE_BASE_URL = 'https://world.openfoodfacts.org/api/v2/product/';
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState('');
  const [brand, setBrand] = useState('');

  useEffect(() => {
    const fetchBarcodeData = async () => {
      if (!barcode) {
        return;
      }

      try {
        const response: { data: ProductData } = await axios.get(
          `${BARCODE_BASE_URL}${barcode}`
        );
        const productName = response.data.product.product_name;
        const brandName = response.data.product.brands;
        setProduct(productName || 'error');
        setBrand(brandName || 'error');
      } catch (error) {
        setProduct('error');
        setBrand('error');
      }
    };

    fetchBarcodeData();
  }, [barcode]);

  return (
    <>
      <h1>Household Inventory</h1>
      <BarcodeScanner setBarcode={setBarcode}></BarcodeScanner>
      <p>Barcode: {barcode}</p>
      <p>Product: {product === 'error' ? 'Not found' : product}</p>
      <p>Brand: {brand === 'error' ? 'Not found' : brand}</p>
    </>
  );
}

export default App;
