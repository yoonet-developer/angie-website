import {defineType} from 'sanity'

export default defineType({
  name: 'traineeSubmission',
  title: 'Trainee Application',
  type: 'document',
  fields: [
    {
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    },
    {
      name: 'status',
      title: 'Application Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Reviewing', value: 'reviewing'},
          {title: 'Interview Scheduled', value: 'interview_scheduled'},
          {title: 'Accepted', value: 'accepted'},
          {title: 'Matched with Business', value: 'matched'},
          {title: 'Rejected', value: 'rejected'}
        ]
      },
      initialValue: 'new',
      validation: Rule => Rule.required()
    },
    
    // Contact Information
    {
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'fieldOfStudy',
      title: 'Field of Study',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'socialMediaExperience',
      title: 'Social Media Experience Level',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'softwareSkills',
      title: 'Software Skills & Ratings',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'software',
              title: 'Software Name',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'rating',
              title: 'Skill Level (1-5)',
              type: 'number',
              validation: Rule => Rule.required().min(1).max(5)
            },
            {
              name: 'skills',
              title: 'Specific Skills',
              type: 'array',
              of: [{type: 'string'}]
            }
          ],
          preview: {
            select: {
              software: 'software',
              rating: 'rating'
            },
            prepare(selection) {
              const {software, rating} = selection
              return {
                title: software,
                subtitle: `${rating}/5 stars`
              }
            }
          }
        }
      ]
    },
    {
      name: 'additionalMessage',
      title: 'Additional Message',
      type: 'text'
    },
    
    // Assessment & Matching
    {
      name: 'skillsAssessment',
      title: 'Skills Assessment Score',
      type: 'number',
      description: 'Internal assessment score (1-100)'
    },
    {
      name: 'matchedBusiness',
      title: 'Matched Business',
      type: 'reference',
      to: [{type: 'businessSubmission'}],
      description: 'Business they are matched with'
    },
    {
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Private notes for team use'
    }
  ],
  
  preview: {
    select: {
      title: 'fullName',
      fieldOfStudy: 'fieldOfStudy',
      status: 'status',
      submittedAt: 'submittedAt'
    },
    prepare(selection) {
      const {title, fieldOfStudy, status, submittedAt} = selection
      const date = new Date(submittedAt).toLocaleDateString()
      return {
        title: title,
        subtitle: `${fieldOfStudy} • ${status} • ${date}`
      }
    }
  },
  
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [
        {field: 'submittedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Status',
      name: 'byStatus',
      by: [
        {field: 'status', direction: 'asc'},
        {field: 'submittedAt', direction: 'desc'}
      ]
    },
    {
      title: 'Skills Assessment',
      name: 'bySkills',
      by: [
        {field: 'skillsAssessment', direction: 'desc'}
      ]
    }
  ]
})