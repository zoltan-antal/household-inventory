import { useState } from 'react';
import { useZxing } from 'react-zxing';

const BarcodeScanner = () => {
  const [result, setResult] = useState('');
  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <>
      <video ref={ref} />
      <p>
        <span>Result:</span>
        <span>{result}</span>
      </p>
    </>
  );
};

export default BarcodeScanner;
