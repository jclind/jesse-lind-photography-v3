import React, { useState } from 'react'
import Select from 'react-select'
import { IoClose } from 'react-icons/io5'
import './AddImages.scss'

type DataTypes = 'image' | 'project'
const dataTypeOptions: { value: DataTypes; label: string }[] = [
  { value: 'image', label: 'Image' },
  { value: 'project', label: 'Project' },
]
interface FileWithDateAndThumbnail {
  file: File
  date: string
  thumbnail: string
}

const AddImages = () => {
  const [currType, setCurrType] = useState<DataTypes>('image')

  const [selectedFiles, setSelectedFiles] = useState<
    FileWithDateAndThumbnail[]
  >([])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('test1')
    if (event.target.files) {
      const newFiles = Array.from(event.target.files)
      const filteredFiles = newFiles.filter(newFile => {
        return !selectedFiles.some(
          selectedFile => selectedFile.file.name === newFile.name
        )
      })
      const filesArray = filteredFiles.map(file => ({
        file,
        date: new Date(file.lastModified).toLocaleString(),
        thumbnail: URL.createObjectURL(file),
      }))
      setSelectedFiles(prevFiles => [...prevFiles, ...filesArray])
    }
  }
  const handleRemoveImage = (index: number) => {
    console.log('yo')
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }

  return (
    <div className='page add-images-page'>
      <div className='select-container'>
        <Select options={dataTypeOptions} />
      </div>

      <form className='form'>
        {currType === 'image' ? (
          <div className='image-form'>
            <div className='file-upload-container'>
              <label className='file-upload-label'>
                <input
                  type='file'
                  multiple
                  className='file-upload-input'
                  accept='image/*'
                  onChange={handleFileChange}
                  onClick={e => (e.currentTarget.value = '')}
                />
                Choose files
              </label>
            </div>
            <div className='images-container'>
              {selectedFiles && selectedFiles.length > 0
                ? selectedFiles.map(({ file, date, thumbnail }, index) => {
                    return (
                      <div className='added-image' key={date}>
                        <button
                          className='btn-no-styles remove-image-btn'
                          onClick={() => handleRemoveImage(index)}
                        >
                          <IoClose className='icon' />
                        </button>
                        <div className='thumbnail-container'>
                          <img src={thumbnail} alt={file.name} />
                        </div>
                        <div>
                          <span>{file.name}</span>
                          <span>{date}</span>
                        </div>
                        <div className='image-data'></div>
                      </div>
                    )
                  })
                : null}
            </div>
          </div>
        ) : currType === 'project' ? (
          <></>
        ) : null}
      </form>
    </div>
  )
}

export default AddImages
