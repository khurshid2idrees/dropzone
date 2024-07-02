import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ className }) {
  const [files, setFiles] = useState([]);

  console.log(files);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (name)=>{
    setFiles(files=>files.filter(file=>file.name !== name));
  }

  return (
    <form>
      <div {...getRootProps({ className: className })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>

      {/* Accepted files */}
      <h3 className="text-lg font-semibold text-neutral-600 mt-10 border-b-1">
        Accepted Files
      </h3>

      <ul className="mt-6 grid grid-cols-3 md:grid-cols-4 xl:grid-cols-12 gap-10 ">
        {files.map((file) => (
          <li key={file.name} className="relative h-32 rounded-md shadow-lg">
            <img src={file.preview} width={100} height={100} onLoad={()=>URL.revokeObjectURL(file.preview)} alt="" />
            <button type="button" className="w-7 h-7 border-red-400 bg-red-400" onClick={()=>removeFile(file.name)}>
                X
            </button>
            <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                {file.name}
            </p>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Dropzone;
