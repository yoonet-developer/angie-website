import { createClient } from '@sanity/client'
import type { PortableTextBlock } from '@portabletext/types'

export const client = createClient({
  projectId: 'ox03cu5z',
  dataset: 'production',
  useCdn: true, // set to false for fresh data
  apiVersion: '2024-05-01',
})

// Create a write client for form submissions
export const writeClient = createClient({
  projectId: 'ox03cu5z',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-01',
  token: process.env.SANITY_WRITE_TOKEN, // We'll need to set this up
})

// Types for our content
export interface Intake {
  _id: string
  title: string
  month: string
  year: number
  totalSlots: number
  slotsBooked: number
  color: 'purple' | 'blue' | 'green' | 'red' | 'orange'
  description?: string
  isNew?: boolean
  sortOrder: number
}

export interface Software {
  _id: string
  name: string
  slug: {
    current: string
  }
  icon: string
  skills: string[]
  category: 'design' | 'video' | 'social' | 'email' | 'other'
  sortOrder: number
}

// Query functions
export async function getIntakes(): Promise<Intake[]> {
  const query = `
    *[_type == "intake"] | order(sortOrder asc) {
      _id,
      title,
      month,
      year,
      totalSlots,
      slotsBooked,
      color,
      description,
      isNew,
      sortOrder
    }
  `
  return await client.fetch(query)
}

export async function getSoftware(): Promise<Software[]> {
  const query = `
    *[_type == "software"] | order(sortOrder asc) {
      _id,
      name,
      slug,
      icon,
      skills,
      category,
      sortOrder
    }
  `
  return await client.fetch(query)
}

// Form submission types
export interface BusinessSubmissionData {
  fullName: string
  email: string
  phone: string
  businessType: string
  socialMediaGoals: string
  currentSocialMediaHandling: string
  platformPreferences: string[]
  additionalMessage?: string
}

export interface TraineeSubmissionData {
  fullName: string
  email: string
  phone: string
  fieldOfStudy: string
  socialMediaExperience: string
  softwareSkills: Array<{
    software: string
    rating: number
    skills: string[]
  }>
  additionalMessage?: string
}

// Submission functions
export async function submitBusinessApplication(data: BusinessSubmissionData) {
  const doc = {
    _type: 'businessSubmission',
    ...data,
    submittedAt: new Date().toISOString()
  }
  
  return await client.create(doc)
}

export async function submitTraineeApplication(data: TraineeSubmissionData) {
  const doc = {
    _type: 'traineeSubmission',
    ...data,
    submittedAt: new Date().toISOString()
  }
  
  return await client.create(doc)
}