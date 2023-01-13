import React, { useEffect } from 'react';
import Link from 'next/link';
import TestComponent from 'components/test';

function TestModule() {
  useEffect(() => {}, []);

  return (
    <div>
      TestModule
      <TestComponent />
      <Link href="/chat">Join chat</Link>
    </div>
  );
}

export default TestModule;
