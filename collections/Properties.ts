import type { CollectionConfig } from 'payload'
import { autoSlugHook } from '@/hooks/auto-slug'

export const Properties: CollectionConfig = {
  slug: 'properties',
  labels: { singular: 'Property', plural: 'Properties' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'status', 'location'],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [autoSlugHook('name')],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Property Name',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'Type',
      required: true,
      options: [
        { label: 'Building', value: 'building' },
        { label: 'Site', value: 'site' },
      ],
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location/Address',
    },
    {
      name: 'size',
      type: 'text',
      label: 'Size (Acres/Sq Ft)',
    },
    {
      name: 'price',
      type: 'text',
      label: 'Price/Lease Rate',
    },
    {
      name: 'utilities',
      type: 'select',
      label: 'Utilities',
      hasMany: true,
      options: [
        { label: 'Electric', value: 'electric' },
        { label: 'Gas', value: 'gas' },
        { label: 'Water', value: 'water' },
        { label: 'Sewer', value: 'sewer' },
        { label: 'Fiber', value: 'fiber' },
      ],
    },
    {
      name: 'railAccess',
      type: 'checkbox',
      label: 'Rail Access',
    },
    {
      name: 'zoning',
      type: 'text',
      label: 'Zoning',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Photo Gallery',
      fields: [
        {
          name: 'image',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'specSheet',
      type: 'upload',
      label: 'Spec Sheet PDF',
      relationTo: 'media',
    },
    {
      name: 'contact',
      type: 'text',
      label: 'Contact Person',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Under Contract', value: 'under_contract' },
        { label: 'Sold', value: 'sold' },
      ],
    },
  ],
}
