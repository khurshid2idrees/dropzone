import React from 'react';
import Dropzone from './Dropzone';

export default function Homepage() {
  return (
    <>
    <section>
        <div>
            <h1 className='text-blue-400 text-3xl font-bold'>Upload Files</h1>
            <Dropzone className="p-16 mt-10 border border-neutral-200" />
        </div>
    </section>
    </>
  )
}
