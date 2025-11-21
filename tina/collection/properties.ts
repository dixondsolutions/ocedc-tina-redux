import type { Collection } from 'tinacms';

const Properties: Collection = {
  label: 'Properties',
  name: 'properties',
  path: 'content/properties',
  format: 'md',
  fields: [
    {
      type: 'string',
      label: 'Property Name',
      name: 'name',
      isTitle: true,
      required: true,
    },
    {
      type: 'string',
      label: 'Type',
      name: 'type',
      options: [
        { label: 'Building', value: 'building' },
        { label: 'Site', value: 'site' },
      ],
      required: true,
    },
    {
      type: 'string',
      label: 'Location/Address',
      name: 'location',
    },
    {
      type: 'string',
      label: 'Size (Acres/Sq Ft)',
      name: 'size',
    },
    {
      type: 'string',
      label: 'Price/Lease Rate',
      name: 'price',
    },
    {
      type: 'string',
      label: 'Utilities',
      name: 'utilities',
      list: true,
      options: [
        { label: 'Electric', value: 'electric' },
        { label: 'Gas', value: 'gas' },
        { label: 'Water', value: 'water' },
        { label: 'Sewer', value: 'sewer' },
        { label: 'Fiber', value: 'fiber' },
      ],
    },
    {
      type: 'boolean',
      label: 'Rail Access',
      name: 'railAccess',
    },
    {
      type: 'string',
      label: 'Zoning',
      name: 'zoning',
    },
    {
      type: 'rich-text',
      label: 'Description',
      name: 'description',
    },
    {
      type: 'image',
      label: 'Photo Gallery',
      name: 'gallery',
      list: true,
    },
    {
      type: 'image',
      label: 'Spec Sheet PDF',
      name: 'specSheet',
    },
    {
      type: 'string',
      label: 'Contact Person',
      name: 'contact',
    },
    {
      type: 'string',
      label: 'Status',
      name: 'status',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Under Contract', value: 'under_contract' },
        { label: 'Sold', value: 'sold' },
      ],
    },
  ],
};

export default Properties;
