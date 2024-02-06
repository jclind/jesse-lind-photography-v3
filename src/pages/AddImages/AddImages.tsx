import React from 'react'
import './AddImages.scss'

interface ImageType {
  id: string
  title: string
  description: string
  location: string
  dateAdded: number
  dateTaken: number
  project?: string //project id
  projectDescription?: string // description for current photo in project timeline
  category: string
  photoID: string
}
interface ProjectType {
  id: string
  images: string[]
  title: string
  description: string
  date: number
}
const AddImages = () => {
  return <div>AddImages</div>
}

export default AddImages
