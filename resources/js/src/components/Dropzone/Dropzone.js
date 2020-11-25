import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

function Dropzone() {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    return (
        <div style={{
            backgroundColor: "#9e9e9e2b",
             border: '1px', borderRadius: '15px', padding: "10px"
        }}>
            <div {...getRootProps()} style={{ display: "flex",
            height: "200px",alignItems: "center",justifyContent:"center" }}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag files here, or click to select files</p>
                }
            </div>
        </div>
    )
}

export default Dropzone