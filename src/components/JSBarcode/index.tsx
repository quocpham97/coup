import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

function JSBarcode({ value, options }: { value: string; options?: object }) {
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (value) {
      JsBarcode(barcodeRef.current, value, {
        width: 3,
        height: 80,
        displayValue: false,
        ...options,
      });
    }
  }, [value, options]);

  return (
    <div className="flex items-center justify-center">
      <svg ref={barcodeRef} />
    </div>
  );
}

JSBarcode.defaultProps = {
  options: {},
};

export default JSBarcode;
