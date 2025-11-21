import type { Collection } from "tinacms";
import { ColorPickerInput } from "../fields/color";
import { iconSchema } from "../fields/icon";
import { icon } from "mermaid/dist/rendering-util/rendering-elements/shapes/icon.js";

const Global: Collection = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        iconSchema as any,
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Color",
          name: "color",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
          ],
        },
        {
          type: "object",
          label: "Nav Links",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: "home",
              label: "Home",
            },
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href",
            },
            {
              type: "string",
              label: "Label",
              name: "label",
            },
          ],
        },
        {
          type: "object",
          label: "Utility Bar",
          name: "utility",
          fields: [
            {
              type: "object",
              label: "Utility Links",
              name: "links",
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item?.label };
                },
              },
              fields: [
                {
                  type: "string",
                  label: "Label",
                  name: "label",
                },
                {
                  type: "string",
                  label: "Href",
                  name: "href",
                },
              ],
            },
            {
              type: "string",
              label: "Phone Label",
              name: "phoneLabel",
            },
            {
              type: "string",
              label: "Phone Number",
              name: "phoneNumber",
            },
            {
              type: "string",
              label: "Phone Link",
              name: "phoneHref",
            },
            {
              type: "object",
              label: "Actions",
              name: "actions",
              list: true,
              ui: {
                itemProps: (item) => ({ label: item?.label }),
              },
              fields: [
                {
                  type: "string",
                  label: "Label",
                  name: "label",
                },
                {
                  type: "string",
                  label: "Href",
                  name: "href",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "object",
          label: "Social Links",
          name: "social",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.icon?.name || 'undefined' };
            },
          },
          fields: [
            iconSchema as any,
            {
              type: "string",
              label: "Url",
              name: "url",
            },
          ],
        },
        {
          type: "object",
          label: "Newsletter Signup",
          name: "newsletter",
          fields: [
            {
              type: "string",
              label: "Title",
              name: "title",
            },
            {
              type: "string",
              label: "Description",
              name: "description",
              ui: {
                component: "textarea",
              },
            },
            {
              type: "string",
              label: "Button Text",
              name: "buttonText",
            },
          ],
        },
        {
          type: "object",
          label: "Contact Information",
          name: "contact",
          fields: [
            {
              type: "string",
              label: "Address",
              name: "address",
              ui: {
                component: "textarea",
              },
            },
            {
              type: "string",
              label: "Phone",
              name: "phone",
            },
            {
              type: "string",
              label: "Email",
              name: "email",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      // @ts-ignore
      fields: [
        {
          type: "string",
          label: "Primary Color",
          name: "color",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: "string",
          name: "font",
          label: "Font Family",
          options: [
            {
              label: "System Sans",
              value: "sans",
            },
            {
              label: "Nunito",
              value: "nunito",
            },
            {
              label: "Lato",
              value: "lato",
            },
          ],
        },
        {
          type: "string",
          name: "darkMode",
          label: "Dark Mode",
          options: [
            {
              label: "System",
              value: "system",
            },
            {
              label: "Light",
              value: "light",
            },
            {
              label: "Dark",
              value: "dark",
            },
          ],
        },
      ],
    },
  ],
};

export default Global;
