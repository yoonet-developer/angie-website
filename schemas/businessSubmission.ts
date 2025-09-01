import {defineType} from 'sanity'

export default defineType({
  name: 'businessSubmission',
  title: 'Business Application',
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
          {title: 'Contacted', value: 'contacted'},
          {title: 'Matched', value: 'matched'},
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
      name: 'businessType',
      title: 'Business Type',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'socialMediaGoals',
      title: 'Social Media Goals',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'currentSocialMediaHandling',
      title: 'Current Social Media Handling',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'platformPreferences',
      title: 'Platform Preferences',
      type: 'array',
      of: [{type: 'string'}],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'additionalMessage',
      title: 'Additional Message',
      type: 'text'
    },
    
    // Internal notes
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
      businessType: 'businessType',
      status: 'status',
      submittedAt: 'submittedAt'
    },
    prepare(selection) {
      const {title, businessType, status, submittedAt} = selection
      const date = new Date(submittedAt).toLocaleDateString()
      return {
        title: title,
        subtitle: `${businessType} • ${status} • ${date}`
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
    }
  ]
})