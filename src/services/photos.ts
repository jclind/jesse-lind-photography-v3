import { collection, getDocs } from 'firebase/firestore'
import { db } from './firestore'

export const getAllCategories = async (): Promise<string[]> => {
  try {
    const categoriesRef = collection(db, 'categories')
    const categoriesSnapshot = await getDocs(categoriesRef)

    const categories: string[] = []

    categoriesSnapshot.forEach(doc => {
      categories.push(doc.id)
    })

    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}
