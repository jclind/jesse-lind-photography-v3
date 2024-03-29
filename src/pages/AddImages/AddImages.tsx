import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { IoClose } from 'react-icons/io5'
import './AddImages.scss'
import { getAllCategories } from '../../services/photos'

type DataTypes = 'image' | 'project'
const dataTypeOptions: { value: DataTypes; label: string }[] = [
  { value: 'image', label: 'Image' },
  { value: 'project', label: 'Project' },
]
interface FileWithDateAndThumbnail {
  file: File
  date: string
  thumbnail: string
  name: string
  location: string
  category: string | null
}

const AddImages = () => {
  const [currType, setCurrType] = useState<DataTypes>('image')
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([])

  const [selectedFiles, setSelectedFiles] = useState<
    FileWithDateAndThumbnail[]
  >([])

  const handleFileFieldChange = <T,>(
    field: string,
    index: number,
    newVal: T
  ) => {
    setSelectedFiles(prevFiles =>
      prevFiles.map((file, i) =>
        i === index ? { ...file, [field]: newVal } : file
      )
    )
  }

  useEffect(() => {
    getAllCategories().then(res => {
      const list = res.map(cat => ({ value: cat, label: cat }))
      setCategories(list)
    })
  }, [])

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
        name: '',
        location: '',
        category: null,
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
                    const handleInputChange = (
                      e:
                        | React.ChangeEvent<HTMLInputElement>
                        | React.ChangeEvent<HTMLTextAreaElement>,
                      field: string
                    ) => handleFileFieldChange(field, index, e.target.value)
                    const dateISOString = new Date(date)
                      .toISOString()
                      .slice(0, 16)
                    console.log(date, dateISOString)

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
                        <div className='image-data'>
                          <div className='name-input input-container'>
                            <label>Name</label>
                            <input
                              type='text'
                              className='input'
                              onChange={e => handleInputChange(e, 'name')}
                            />
                          </div>
                          <div className='date-input input-container'>
                            <label>Date</label>
                            <input
                              className='input'
                              type='datetime-local'
                              value={dateISOString}
                              onChange={e =>
                                handleInputChange(e, 'description')
                              }
                            />
                          </div>
                          <div className='description-input input-container'>
                            <label>Description</label>
                            <textarea
                              className='textarea'
                              onChange={e =>
                                handleInputChange(e, 'description')
                              }
                            />
                          </div>
                          <div className='location-input input-container'>
                            <label>Location</label>
                            <input
                              type='text'
                              className='input'
                              onChange={e => handleInputChange(e, 'location')}
                            />
                          </div>
                          <div className='category-input input-container'>
                            <label>Category</label>
                            <Select
                              options={categories}
                              onChange={e =>
                                handleFileFieldChange(
                                  'category',
                                  index,
                                  e?.value || null
                                )
                              }
                              // className='select-container'
                            />
                          </div>
                        </div>
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
