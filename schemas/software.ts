import {defineType} from 'sanity'

export default defineType({
  name: 'software',
  title: 'Software Tool',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Software Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      validation: Rule => Rule.required().max(2)
    },
    {
      name: 'skills',
      title: 'Available Skills',
      type: 'array',
      of: [{type: 'string'}],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Design', value: 'design'},
          {title: 'Video', value: 'video'},
          {title: 'Social Media', value: 'social'},
          {title: 'Email Marketing', value: 'email'},
          {title: 'Other', value: 'other'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      validation: Rule => Rule.required()
    }
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrderAsc',
      by: [
        {field: 'sortOrder', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      icon: 'icon',
      category: 'category'
    },
    prepare(selection) {
      const {title, icon, category} = selection
      return {
        title: `${icon} ${title}`,
        subtitle: category
      }
    }
  }
})