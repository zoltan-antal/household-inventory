import { useZxing } from 'react-zxing';

interface BarcodeScannerProps {
  setBarcode: React.Dispatch<React.SetStateAction<string>>;
}

const BarcodeScanner = ({ setBarcode }: BarcodeScannerProps) => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      setBarcode(result.getText());
    },
  });

  return (
    <>
      <video ref={ref} />
    </>
  );
};

export default BarcodeScanner;
