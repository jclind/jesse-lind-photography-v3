export interface ImageType {
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
export interface ProjectType {
  id: string
  images: string[]
  title: string
  description: string
  date: number
}
