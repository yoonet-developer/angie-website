import {defineType} from 'sanity'

export default defineType({
  name: 'intake',
  title: 'Program Intake',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Intake Period',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'month',
      title: 'Month',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'totalSlots',
      title: 'Total Slots Available',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'slotsBooked',
      title: 'Slots Already Booked',
      type: 'number',
      validation: Rule => Rule.required().min(0)
    },
    {
      name: 'color',
      title: 'Theme Color',
      type: 'string',
      options: {
        list: [
          {title: 'Purple', value: 'purple'},
          {title: 'Blue', value: 'blue'},
          {title: 'Green', value: 'green'},
          {title: 'Red', value: 'red'},
          {title: 'Orange', value: 'orange'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string'
    },
    {
      name: 'isNew',
      title: 'Mark as New',
      type: 'boolean',
      initialValue: false
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
      title: 'title',
      slotsBooked: 'slotsBooked',
      totalSlots: 'totalSlots'
    },
    prepare(selection) {
      const {title, slotsBooked, totalSlots} = selection
      return {
        title: title,
        subtitle: `${slotsBooked}/${totalSlots} slots booked`
      }
    }
  }
})