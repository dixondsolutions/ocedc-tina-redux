var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// components/mermaid-renderer.tsx
var mermaid_renderer_exports = {};
__export(mermaid_renderer_exports, {
  default: () => MermaidElement
});
import { useIntersectionObserver } from "usehooks-ts";
import mermaid from "mermaid";
function MermaidElement({ value }) {
  const { ref } = useIntersectionObserver({
    threshold: 0.01,
    freezeOnceVisible: true,
    onChange(isIntersecting, entry) {
      if (isIntersecting) {
        mermaid.initialize({ startOnLoad: false });
        mermaid.run({ nodes: [entry.target] });
      }
    }
  });
  return React.createElement("div", { contentEditable: false }, React.createElement("pre", { ref, suppressHydrationWarning: true }, value));
}
var init_mermaid_renderer = __esm({
  "components/mermaid-renderer.tsx"() {
    "use strict";
  }
});

// tina/config.tsx
import { defineConfig } from "tinacms";

// next.config.ts
var nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.tina.io",
        port: ""
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: ""
      }
    ]
  },
  async headers() {
    const headers = [
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN"
      },
      {
        key: "Content-Security-Policy",
        value: "frame-ancestors 'self'"
      }
    ];
    return [
      {
        source: "/(.*)",
        headers
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: "/admin",
        destination: "/admin/index.html"
      }
    ];
  }
};
var next_config_default = nextConfig;

// tina/collection/post.tsx
import React5 from "react";

// components/blocks/video.tsx
import * as React3 from "react";
import dynamic from "next/dynamic";

// components/layout/section.tsx
import React2 from "react";

// lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// components/layout/section.tsx
var tailwindBackgroundOptions = [
  { label: "Default", value: "bg-default" },
  { label: "White", value: "bg-white/80" },
  { label: "Gray", value: "bg-gray-50/80" },
  { label: "Zinc", value: "bg-zinc-50" },
  { label: "Black", value: "bg-black/80" },
  { label: "Red", value: "bg-red-50/80" },
  { label: "Orange", value: "bg-orange-50/80" },
  { label: "Yellow", value: "bg-yellow-50/80" },
  { label: "Green", value: "bg-green-50/80" },
  { label: "Lime", value: "bg-lime-50/80" },
  { label: "Emerald", value: "bg-emerald-50/80" },
  { label: "Teal", value: "bg-teal-50/80" },
  { label: "Cyan", value: "bg-cyan-50/80" },
  { label: "Blue", value: "bg-blue-50/80" },
  { label: "Sky", value: "bg-sky-50/80" },
  { label: "Indigo", value: "bg-indigo-50/80" },
  { label: "Violet", value: "bg-violet-50/80" },
  { label: "Purple", value: "bg-purple-50/80" },
  { label: "Fuchsia", value: "bg-fuchsia-50/80" },
  { label: "Pink", value: "bg-pink-50/80" },
  { label: "Rose", value: "bg-rose-50/80" }
];
var sectionBlockSchemaField = {
  label: "Design",
  name: "style",
  type: "object",
  fields: [
    {
      type: "string",
      label: "Background",
      name: "background",
      options: tailwindBackgroundOptions
    },
    {
      type: "string",
      label: "Padding",
      name: "padding",
      options: [
        { label: "Small", value: "py-8" },
        { label: "Medium", value: "py-12" },
        { label: "Large", value: "py-24" },
        { label: "Extra Large", value: "py-32" },
        { label: "None", value: "py-0" }
      ]
    },
    {
      type: "string",
      label: "Width",
      name: "width",
      options: [
        { label: "Narrow", value: "max-w-3xl" },
        { label: "Medium", value: "max-w-5xl" },
        { label: "Wide", value: "max-w-7xl" },
        { label: "Full", value: "w-full" }
      ]
    },
    {
      type: "string",
      label: "Alignment",
      name: "alignment",
      options: [
        { label: "Left", value: "text-left" },
        { label: "Center", value: "text-center" },
        { label: "Right", value: "text-right" }
      ]
    }
  ]
};

// components/blocks/video.tsx
var ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
var videoBlockSchema = {
  name: "video",
  label: "Video",
  ui: {
    previewSrc: "/blocks/video.svg",
    defaultItem: {
      url: "https://www.youtube.com/watch?v=j8egYW7Jpgk"
    },
    itemProps: (item) => ({ label: item.url || "Video" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" }
      ]
    },
    {
      type: "string",
      label: "Url",
      name: "url"
    },
    {
      type: "boolean",
      label: "Auto Play",
      name: "autoPlay"
    },
    {
      type: "boolean",
      label: "Loop",
      name: "loop"
    }
  ]
};

// components/ui/avatar.tsx
import * as React4 from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
function Avatar({
  className,
  ...props
}) {
  return React4.createElement(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return React4.createElement(
    AvatarPrimitive.Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return React4.createElement(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}

// tina/collection/post.tsx
var Post = {
  label: "Blog Posts",
  name: "post",
  path: "content/posts",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/news/${document._sys.breadcrumbs.join("/")}`;
    }
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true
    },
    {
      type: "image",
      name: "heroImg",
      label: "Hero Image",
      // @ts-ignore
      uploadDir: () => "posts"
    },
    {
      type: "rich-text",
      label: "Excerpt",
      name: "excerpt",
      overrides: {
        toolbar: ["bold", "italic", "link"]
      }
    },
    {
      type: "reference",
      label: "Author",
      name: "author",
      collections: ["author"],
      ui: {
        //@ts-ignore
        optionComponent: (props, _internalSys) => {
          const { name, avatar } = props;
          if (!name) return _internalSys.path;
          return React5.createElement("p", { className: "flex min-h-8 items-center gap-4" }, React5.createElement(Avatar, null, avatar && React5.createElement(AvatarImage, { src: avatar, alt: `${name} Profile` }), React5.createElement(AvatarFallback, null, name.split(" ").map((part) => part[0]?.toUpperCase() || "").join(""))), name);
        }
      }
    },
    {
      type: "datetime",
      label: "Posted Date",
      name: "date",
      ui: {
        dateFormat: "MMMM DD YYYY",
        timeFormat: "hh:mm A"
      }
    },
    {
      type: "object",
      label: "Tags",
      name: "tags",
      list: true,
      fields: [
        {
          type: "reference",
          label: "Tag",
          name: "tag",
          collections: ["tag"],
          ui: {
            optionComponent: (props, _internalSys) => props.name || _internalSys.path
          }
        }
      ],
      ui: {
        itemProps: (item) => {
          return { label: item?.tag };
        }
      }
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [
        {
          name: "BlockQuote",
          label: "Block Quote",
          fields: [
            {
              name: "children",
              label: "Quote",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"]
              }
            },
            {
              name: "authorName",
              label: "Author",
              type: "string"
            }
          ]
        },
        {
          name: "DateTime",
          label: "Date & Time",
          inline: true,
          fields: [
            {
              name: "format",
              label: "Format",
              type: "string",
              options: ["utc", "iso", "local"]
            }
          ]
        },
        {
          name: "NewsletterSignup",
          label: "Newsletter Sign Up",
          fields: [
            {
              name: "children",
              label: "CTA",
              type: "rich-text"
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "string"
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string"
            },
            {
              name: "disclaimer",
              label: "Disclaimer",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"]
              }
            }
          ],
          ui: {
            defaultItem: {
              placeholder: "Enter your email",
              buttonText: "Notify Me"
            }
          }
        },
        videoBlockSchema
      ],
      isBody: true
    }
  ]
};
var post_default = Post;

// tina/fields/color.tsx
import React6 from "react";
import { wrapFieldsWithMeta } from "tinacms";
var colorOptions = ["blue", "teal", "green", "yellow", "orange", "red", "pink", "purple", "white"];
var ColorPickerInput = wrapFieldsWithMeta(({ input }) => {
  const inputClasses = {
    blue: "bg-blue-500 border-blue-600",
    teal: "bg-teal-500 border-teal-600",
    green: "bg-green-500 border-green-600",
    yellow: "bg-yellow-500 border-yellow-600",
    orange: "bg-orange-500 border-orange-600",
    red: "bg-red-500 border-red-600",
    pink: "bg-pink-500 border-pink-600",
    purple: "bg-purple-500 border-purple-600",
    white: "bg-white border-gray-150"
  };
  return React6.createElement(React6.Fragment, null, React6.createElement("input", { type: "text", id: input.name, className: "hidden", ...input }), React6.createElement("div", { className: "flex gap-2 flex-wrap" }, colorOptions.map((color) => {
    return React6.createElement(
      "button",
      {
        key: color,
        className: `w-9 h-9 rounded-full shadow border ${inputClasses[color]} ${input.value === color ? "ring-[3px] ring-offset-2 ring-blue-400" : ""}`,
        onClick: () => {
          input.onChange(color);
        }
      }
    );
  })));
});

// tina/fields/icon.tsx
import React9 from "react";
import { Button, wrapFieldsWithMeta as wrapFieldsWithMeta2 } from "tinacms";
import { BiChevronRight } from "react-icons/bi";
import { GoCircleSlash } from "react-icons/go";

// components/icon.tsx
import * as BoxIcons from "react-icons/bi";
import { FaFacebookF, FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import React8 from "react";

// components/layout/layout-context.tsx
import React7, { useState, useContext } from "react";
var LayoutContext = React7.createContext(void 0);
var useLayout = () => {
  const context = useContext(LayoutContext);
  return context || {
    theme: {
      color: "blue",
      darkMode: "default"
    },
    globalSettings: void 0,
    pageData: void 0
  };
};

// components/icon.tsx
var IconOptions = {
  Tina: (props) => React8.createElement("svg", { ...props, viewBox: "0 0 66 80", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, React8.createElement("title", null, "Tina"), React8.createElement(
    "path",
    {
      d: "M39.4615 36.1782C42.763 33.4475 44.2259 17.3098 45.6551 11.5091C47.0843 5.70828 52.995 6.0025 52.995 6.0025C52.995 6.0025 51.4605 8.67299 52.0864 10.6658C52.7123 12.6587 57 14.4401 57 14.4401L56.0752 16.8781C56.0752 16.8781 54.1441 16.631 52.995 18.9297C51.8459 21.2283 53.7336 43.9882 53.7336 43.9882C53.7336 43.9882 46.8271 57.6106 46.8271 63.3621C46.8271 69.1136 49.5495 73.9338 49.5495 73.9338H45.7293C45.7293 73.9338 40.1252 67.2648 38.9759 63.9318C37.8266 60.5988 38.2861 57.2658 38.2861 57.2658C38.2861 57.2658 32.1946 56.921 26.7931 57.2658C21.3915 57.6106 17.7892 62.2539 17.1391 64.8512C16.4889 67.4486 16.2196 73.9338 16.2196 73.9338H13.1991C11.3606 68.2603 9.90043 66.2269 10.6925 63.3621C12.8866 55.4269 12.4557 50.9263 11.9476 48.9217C11.4396 46.9172 8 45.1676 8 45.1676C9.68492 41.7349 11.4048 40.0854 18.8029 39.9133C26.201 39.7413 36.1599 38.9088 39.4615 36.1782Z",
      fill: "currentColor"
    }
  ), React8.createElement(
    "path",
    {
      d: "M20.25 63.03C20.25 63.03 21.0305 70.2533 25.1773 73.9342H28.7309C25.1773 69.9085 24.7897 59.415 24.7897 59.415C22.9822 60.0035 20.4799 62.1106 20.25 63.03Z",
      fill: "currentColor"
    }
  )),
  ...BoxIcons,
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
  AiFillInstagram
};
var iconColorClass = {
  blue: {
    regular: "text-blue-400",
    circle: "bg-blue-400 dark:bg-blue-500 text-blue-50"
  },
  teal: {
    regular: "text-teal-400",
    circle: "bg-teal-400 dark:bg-teal-500 text-teal-50"
  },
  green: {
    regular: "text-green-400",
    circle: "bg-green-400 dark:bg-green-500 text-green-50"
  },
  red: {
    regular: "text-red-400",
    circle: "bg-red-400 dark:bg-red-500 text-red-50"
  },
  pink: {
    regular: "text-pink-400",
    circle: "bg-pink-400 dark:bg-pink-500 text-pink-50"
  },
  purple: {
    regular: "text-purple-400",
    circle: "bg-purple-400 dark:bg-purple-500 text-purple-50"
  },
  orange: {
    regular: "text-orange-400",
    circle: "bg-orange-400 dark:bg-orange-500 text-orange-50"
  },
  yellow: {
    regular: "text-yellow-400",
    circle: "bg-yellow-400 dark:bg-yellow-500 text-yellow-50"
  },
  primary: {
    regular: "text-[#c58a32]",
    circle: "bg-[#c58a32] text-[#1b1f24]"
  },
  charcoal: {
    regular: "text-[#1b1f24]",
    circle: "bg-[#1b1f24] text-white"
  },
  gold: {
    regular: "text-[#dcbf8b]",
    circle: "bg-[#dcbf8b] text-[#1b1f24]"
  },
  white: {
    regular: "text-white opacity-80",
    circle: "bg-white-400 dark:bg-white-500 text-white-50"
  },
  custom: {
    regular: "",
    circle: ""
  }
};
var iconSizeClass = {
  xs: "w-6 h-6 shrink-0",
  small: "w-8 h-8 shrink-0",
  medium: "w-12 h-12 shrink-0",
  large: "w-14 h-14 shrink-0",
  xl: "w-16 h-16 shrink-0",
  custom: ""
};
var Icon = ({ data, parentColor = "", className = "", tinaField: tinaField18 = "" }) => {
  const { theme } = useLayout();
  if (IconOptions[data.name] === null || IconOptions[data.name] === void 0) {
    return null;
  }
  const { name, color, size = "medium", style = "regular" } = data;
  const IconSVG = IconOptions[name];
  const iconSizeClasses = typeof size === "string" ? iconSizeClass[size] : iconSizeClass[Object.keys(iconSizeClass)[size]];
  const resolveColorKey = (value) => {
    if (!value) {
      return theme?.color && iconColorClass[theme.color] ? theme.color : "blue";
    }
    if (value === "primary") {
      return "primary";
    }
    return iconColorClass[value] ? value : theme?.color && iconColorClass[theme.color] ? theme.color : "blue";
  };
  const iconColor = resolveColorKey(color);
  if (style == "circle") {
    const palette = iconColorClass[iconColor] || iconColorClass.blue;
    return React8.createElement(
      "div",
      {
        ...tinaField18 ? { "data-tina-field": tinaField18 } : {},
        className: `relative z-10 inline-flex items-center justify-center shrink-0 ${iconSizeClasses} rounded-full ${palette.circle} ${className}`
      },
      React8.createElement(IconSVG, { className: "w-2/3 h-2/3" })
    );
  } else {
    const fallbackKey = parentColor === "primary" && (iconColor === (theme?.color ?? "") || iconColor === "primary") ? "white" : iconColor;
    const palette = iconColorClass[fallbackKey] || iconColorClass.blue;
    const iconColorClasses = palette.regular;
    return React8.createElement(
      IconSVG,
      {
        ...tinaField18 ? { "data-tina-field": tinaField18 } : {},
        className: `${iconSizeClasses} ${iconColorClasses} ${className}`
      }
    );
  }
};

// tina/fields/icon.tsx
import { Popover, PopoverButton, Transition, PopoverPanel } from "@headlessui/react";
var parseIconName = (name) => {
  const splitName = name.split(/(?=[A-Z])/);
  if (splitName.length > 1) {
    return splitName.slice(1).join(" ");
  } else {
    return name;
  }
};
var IconPickerInput = wrapFieldsWithMeta2(({ input }) => {
  const [filter, setFilter] = React9.useState("");
  const filteredBlocks = React9.useMemo(() => {
    return Object.keys(IconOptions).filter((name) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [filter]);
  const inputLabel = Object.keys(IconOptions).includes(input.value) ? parseIconName(input.value) : "Select Icon";
  const InputIcon = IconOptions[input.value] ? IconOptions[input.value] : null;
  return React9.createElement("div", { className: "relative z-[1000]" }, React9.createElement("input", { type: "text", id: input.name, className: "hidden", ...input }), React9.createElement(Popover, null, ({ open }) => React9.createElement(React9.Fragment, null, React9.createElement(PopoverButton, null, React9.createElement(Button, { className: `text-sm h-11 px-4 ${InputIcon ? "h-11" : "h-10"}`, size: "custom", rounded: "full", variant: open ? "secondary" : "white" }, InputIcon && React9.createElement(InputIcon, { className: "w-7 mr-1 h-auto fill-current text-blue-500" }), inputLabel, !InputIcon && React9.createElement(BiChevronRight, { className: "w-5 h-auto fill-current opacity-70 ml-1" }))), React9.createElement("div", { className: "absolute w-full min-w-[192px] max-w-2xl -bottom-2 left-0 translate-y-full", style: { zIndex: 1e3 } }, React9.createElement(
    Transition,
    {
      enter: "transition duration-150 ease-out",
      enterFrom: "transform opacity-0 -translate-y-2",
      enterTo: "transform opacity-100 translate-y-0",
      leave: "transition duration-75 ease-in",
      leaveFrom: "transform opacity-100 translate-y-0",
      leaveTo: "transform opacity-0 -translate-y-2"
    },
    React9.createElement(PopoverPanel, { className: "relative overflow-hidden rounded-lg shadow-lg bg-white border border-gray-150 z-50" }, ({ close }) => React9.createElement("div", { className: "max-h-[24rem] flex flex-col w-full h-full" }, React9.createElement("div", { className: "bg-gray-50 p-2 border-b border-gray-100 z-10 shadow-sm" }, React9.createElement(
      "input",
      {
        type: "text",
        className: "bg-white text-sm rounded-sm border border-gray-100 shadow-inner py-1.5 px-2.5 w-full block placeholder-gray-200",
        onClick: (event) => {
          event.stopPropagation();
          event.preventDefault();
        },
        value: filter,
        onChange: (event) => {
          setFilter(event.target.value);
        },
        placeholder: "Filter..."
      }
    )), filteredBlocks.length === 0 && React9.createElement("span", { className: "relative text-center text-xs px-2 py-3 text-gray-300 bg-gray-50 italic" }, "No matches found"), filteredBlocks.length > 0 && React9.createElement("div", { className: "w-full grid grid-cols-6 auto-rows-auto p-2 overflow-y-auto" }, React9.createElement(
      "button",
      {
        className: "relative rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50",
        key: "clear-input",
        onClick: () => {
          input.onChange("");
          setFilter("");
          close();
        }
      },
      React9.createElement(GoCircleSlash, { className: "w-6 h-auto text-gray-200" })
    ), filteredBlocks.map((name) => {
      return React9.createElement(
        "button",
        {
          className: "relative flex items-center justify-center rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50",
          key: name,
          onClick: () => {
            input.onChange(name);
            setFilter("");
            close();
          }
        },
        React9.createElement(
          Icon,
          {
            data: {
              name,
              size: "custom",
              color: "blue"
            },
            className: "w-7 h-auto"
          }
        )
      );
    }))))
  )))));
});
var iconSchema = {
  type: "object",
  label: "Icon",
  name: "icon",
  fields: [
    {
      type: "string",
      label: "Icon",
      name: "name",
      ui: {
        component: IconPickerInput
      }
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      ui: {
        component: ColorPickerInput
      }
    },
    {
      name: "style",
      label: "Style",
      type: "string",
      options: [
        {
          label: "Circle",
          value: "circle"
        },
        {
          label: "Float",
          value: "float"
        }
      ]
    }
  ]
};

// tina/collection/global.ts
var Global = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        iconSchema,
        {
          type: "string",
          label: "Name",
          name: "name"
        },
        {
          type: "string",
          label: "Color",
          name: "color",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" }
          ]
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
              label: "Home"
            }
          },
          fields: [
            {
              type: "string",
              label: "Link",
              name: "href"
            },
            {
              type: "string",
              label: "Label",
              name: "label"
            }
          ]
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
                }
              },
              fields: [
                {
                  type: "string",
                  label: "Label",
                  name: "label"
                },
                {
                  type: "string",
                  label: "Href",
                  name: "href"
                }
              ]
            },
            {
              type: "string",
              label: "Phone Label",
              name: "phoneLabel"
            },
            {
              type: "string",
              label: "Phone Number",
              name: "phoneNumber"
            },
            {
              type: "string",
              label: "Phone Link",
              name: "phoneHref"
            },
            {
              type: "object",
              label: "Actions",
              name: "actions",
              list: true,
              ui: {
                itemProps: (item) => ({ label: item?.label })
              },
              fields: [
                {
                  type: "string",
                  label: "Label",
                  name: "label"
                },
                {
                  type: "string",
                  label: "Href",
                  name: "href"
                }
              ]
            }
          ]
        }
      ]
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
              return { label: item?.icon?.name || "undefined" };
            }
          },
          fields: [
            iconSchema,
            {
              type: "string",
              label: "Url",
              name: "url"
            }
          ]
        },
        {
          type: "object",
          label: "Newsletter Signup",
          name: "newsletter",
          fields: [
            {
              type: "string",
              label: "Title",
              name: "title"
            },
            {
              type: "string",
              label: "Description",
              name: "description",
              ui: {
                component: "textarea"
              }
            },
            {
              type: "string",
              label: "Button Text",
              name: "buttonText"
            }
          ]
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
                component: "textarea"
              }
            },
            {
              type: "string",
              label: "Phone",
              name: "phone"
            },
            {
              type: "string",
              label: "Email",
              name: "email"
            }
          ]
        }
      ]
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
            component: ColorPickerInput
          }
        },
        {
          type: "string",
          name: "font",
          label: "Font Family",
          options: [
            {
              label: "System Sans",
              value: "sans"
            },
            {
              label: "Nunito",
              value: "nunito"
            },
            {
              label: "Lato",
              value: "lato"
            }
          ]
        },
        {
          type: "string",
          name: "darkMode",
          label: "Dark Mode",
          options: [
            {
              label: "System",
              value: "system"
            },
            {
              label: "Light",
              value: "light"
            },
            {
              label: "Dark",
              value: "dark"
            }
          ]
        }
      ]
    }
  ]
};
var global_default = Global;

// tina/collection/author.ts
var Author = {
  label: "Authors",
  name: "author",
  path: "content/authors",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true
    },
    {
      type: "image",
      label: "Avatar",
      name: "avatar",
      // @ts-ignore
      uploadDir: () => "authors"
    }
  ]
};
var author_default = Author;

// components/blocks/hero.tsx
import Image2 from "next/image";
import Link from "next/link";
import * as React13 from "react";
import { tinaField } from "tinacms/dist/react";

// components/motion-primitives/animated-group.tsx
import { motion } from "motion/react";
import React10 from "react";

// components/motion-primitives/text-effect.tsx
import {
  AnimatePresence,
  motion as motion2
} from "motion/react";
import React11 from "react";
var AnimationComponent = React11.memo(({ segment, variants, per, segmentWrapperClassName }) => {
  const content = per === "line" ? React11.createElement(motion2.span, { variants, className: "block" }, segment) : per === "word" ? React11.createElement(
    motion2.span,
    {
      "aria-hidden": "true",
      variants,
      className: "inline-block whitespace-pre"
    },
    segment
  ) : React11.createElement(motion2.span, { className: "inline-block whitespace-pre" }, segment.split("").map((char, charIndex) => React11.createElement(
    motion2.span,
    {
      key: `char-${charIndex}`,
      "aria-hidden": "true",
      variants,
      className: "inline-block whitespace-pre"
    },
    char
  )));
  if (!segmentWrapperClassName) {
    return content;
  }
  const defaultWrapperClassName = per === "line" ? "block" : "inline-block";
  return React11.createElement("span", { className: cn(defaultWrapperClassName, segmentWrapperClassName) }, content);
});
AnimationComponent.displayName = "AnimationComponent";

// components/ui/button.tsx
import * as React12 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

// components/ui/hero-video-dialog.tsx
import { Play } from "lucide-react";

// components/ui/VideoDialogContext.tsx
import { createContext, useContext as useContext2, useState as useState2 } from "react";
var VideoDialogContext = createContext(void 0);

// components/blocks/hero.tsx
var heroBlockSchema = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.svg",
    defaultItem: {
      tagline: "Welcome to Ogle County",
      headline: "Building a Brighter Future",
      subheadline: "Your partner for economic growth, business expansion, and community development in Northern Illinois."
    },
    itemProps: (item) => ({ label: item.headline })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      label: "Headline",
      name: "headline"
    },
    {
      type: "string",
      label: "Subheadline",
      name: "subheadline"
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          icon: {
            name: "Tina",
            color: "white",
            style: "float"
          },
          link: "/"
        },
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" }
          ]
        },
        iconSchema,
        {
          label: "Link",
          name: "link",
          type: "string"
        }
      ]
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image"
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string"
        },
        {
          name: "videoUrl",
          label: "Video URL",
          type: "string",
          description: "If using a YouTube video, make sure to use the embed version of the video URL"
        }
      ]
    }
  ]
};

// components/blocks/content.tsx
import React14 from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField as tinaField2 } from "tinacms/dist/react";

// components/blocks/mermaid.tsx
import dynamic2 from "next/dynamic";
var MermaidElement2 = dynamic2(() => Promise.resolve().then(() => (init_mermaid_renderer(), mermaid_renderer_exports)), {
  ssr: false,
  loading: () => React.createElement("div", null, "Loading diagram...")
});

// components/magicui/script-copy-btn.tsx
import { Check, Copy } from "lucide-react";
import { motion as motion3 } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState as useState3 } from "react";
var scriptCopyBlockSchema = {
  name: "scriptCopyBlock",
  label: "Script Copy Block",
  ui: {
    defaultItem: {
      codeLanguage: "bash",
      lightTheme: "catppuccin-latte",
      darkTheme: "catppuccin-mocha",
      commandMap: "npm|npm install\npnpm|pnpm install\nyarn|yarn install\nbun|bun install"
    }
  },
  fields: [
    {
      name: "codeLanguage",
      label: "Code Language",
      type: "string",
      description: "The language used for syntax highlighting."
    },
    {
      name: "lightTheme",
      label: "Light Theme",
      type: "string",
      description: "The light theme used for syntax highlighting."
    },
    {
      name: "darkTheme",
      label: "Dark Theme",
      type: "string",
      description: "The dark theme used for syntax highlighting."
    },
    {
      name: "commandMap",
      label: "Command Map",
      type: "string",
      description: 'A list of package managers and their corresponding commands, separated by "|". Example:\n"npm|npm install\npnpm|pnpm install"',
      ui: {
        component: "textarea"
      }
    }
  ]
};

// components/blocks/content.tsx
var contentBlockSchema = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.svg",
    defaultItem: {
      body: "The Ogle County Economic Development Corporation (OCEDC) is dedicated to fostering economic growth and stability in our region. We work with businesses, local government, and community partners to create opportunities for prosperity."
    },
    itemProps: (item) => ({ label: item.id || "Content" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Section ID",
      name: "id",
      description: 'Optional ID for anchor links (e.g., "mission")'
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      templates: [scriptCopyBlockSchema]
    }
  ]
};

// components/blocks/testimonial.tsx
import React16 from "react";

// components/ui/card.tsx
import * as React15 from "react";

// components/blocks/testimonial.tsx
import { tinaField as tinaField3 } from "tinacms/dist/react";
var testimonialBlockSchema = {
  name: "testimonial",
  label: "Testimonial",
  ui: {
    previewSrc: "/blocks/testimonial.svg",
    defaultItem: {
      testimonials: [
        {
          quote: "OCEDC has been an invaluable partner in our expansion. Their support made the process seamless.",
          author: "Local Business Owner"
        }
      ]
    },
    itemProps: (item) => ({ label: item.title || "Testimonials" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "object",
      list: true,
      label: "Testimonials",
      name: "testimonials",
      ui: {
        defaultItem: {
          quote: "There are only two hard things in Computer Science: cache invalidation and naming things.",
          author: "Phil Karlton"
        },
        itemProps: (item) => {
          return {
            label: `${item.quote} - ${item.author}`
          };
        }
      },
      fields: [
        {
          type: "string",
          ui: {
            component: "textarea"
          },
          label: "Quote",
          name: "quote"
        },
        {
          type: "string",
          label: "Author",
          name: "author"
        },
        {
          type: "string",
          label: "Role",
          name: "role"
        },
        {
          type: "image",
          label: "Avatar",
          name: "avatar"
        }
      ]
    }
  ]
};

// components/blocks/features.tsx
import { tinaField as tinaField4 } from "tinacms/dist/react";
import { TinaMarkdown as TinaMarkdown2 } from "tinacms/dist/rich-text";
import Link2 from "next/link";
var defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  icon: {
    name: "Tina",
    color: "white",
    style: "float"
  }
};
var featureBlockSchema = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: "/blocks/features.svg",
    defaultItem: {
      title: "Why Choose Ogle County?",
      description: "We offer a strategic location, business-friendly environment, and robust support infrastructure.",
      items: [
        {
          title: "Site Selection",
          text: "Comprehensive database of available industrial and commercial properties.",
          icon: {
            name: "BiBuilding",
            color: "primary",
            style: "float"
          }
        },
        {
          title: "Incentives",
          text: "Guidance on local, state, and federal incentive programs for your business.",
          icon: {
            name: "BiDollarCircle",
            color: "primary",
            style: "float"
          }
        },
        {
          title: "Workforce",
          text: "Access to a skilled and dedicated workforce in the Ogle County region.",
          icon: {
            name: "BiGroup",
            color: "primary",
            style: "float"
          }
        }
      ]
    },
    itemProps: (item) => ({ label: item.title || "Features" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Description",
      name: "description"
    },
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title
          };
        },
        defaultItem: {
          ...defaultFeature
        }
      },
      fields: [
        iconSchema,
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text"
        },
        {
          type: "string",
          label: "Link",
          name: "link"
        }
      ]
    }
  ]
};

// components/blocks/callout.tsx
import React17 from "react";
import Link3 from "next/link";
import { tinaField as tinaField5 } from "tinacms/dist/react";
import { ArrowRight } from "lucide-react";
var calloutBlockSchema = {
  name: "callout",
  label: "Callout",
  ui: {
    previewSrc: "/blocks/callout.svg",
    defaultItem: {
      url: "/news",
      text: "View our latest Economic Development Report"
    },
    itemProps: (item) => ({ label: item.text || "Callout" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Text",
      name: "text"
    },
    {
      type: "string",
      label: "Url",
      name: "url"
    }
  ]
};

// components/blocks/stats.tsx
import { tinaField as tinaField6 } from "tinacms/dist/react";
var statsBlockSchema = {
  name: "stats",
  label: "Stats",
  ui: {
    previewSrc: "/blocks/stats.svg",
    defaultItem: {
      title: "Our Impact",
      description: "Measuring the economic growth and development in Ogle County over the last year.",
      stats: [
        {
          stat: "500+",
          type: "Jobs Created"
        },
        {
          stat: "$50M",
          type: "Capital Investment"
        },
        {
          stat: "25",
          type: "New Projects"
        }
      ]
    },
    itemProps: (item) => ({ label: item.title || "Stats" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Description",
      name: "description"
    },
    {
      type: "object",
      label: "Stats",
      name: "stats",
      list: true,
      ui: {
        defaultItem: {
          stat: "12K",
          type: "Stars on GitHub"
        },
        itemProps: (item) => {
          return {
            label: `${item.stat} ${item.type}`
          };
        }
      },
      fields: [
        {
          type: "string",
          label: "Stat",
          name: "stat"
        },
        {
          type: "string",
          label: "Type",
          name: "type"
        }
      ]
    }
  ]
};

// components/blocks/call-to-action.tsx
import Link4 from "next/link";
import { tinaField as tinaField7 } from "tinacms/dist/react";
var ctaBlockSchema = {
  name: "cta",
  label: "CTA",
  ui: {
    previewSrc: "/blocks/cta.svg",
    defaultItem: {
      title: "Ready to Grow in Ogle County?",
      description: "Connect with us to explore opportunities, incentives, and sites available for your business.",
      actions: [
        {
          label: "Contact Us",
          type: "button",
          link: "/contact"
        },
        {
          label: "View Sites",
          type: "link",
          link: "/sites-buildings"
        }
      ]
    },
    itemProps: (item) => ({ label: item.title || "CTA" })
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          icon: {
            name: "Tina",
            color: "white",
            style: "float"
          },
          link: "/"
        },
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" }
          ]
        },
        iconSchema,
        {
          label: "Link",
          name: "link",
          type: "string"
        }
      ]
    }
  ]
};

// components/blocks/industries-grid.tsx
import React18 from "react";
import Link5 from "next/link";
import { tinaField as tinaField8 } from "tinacms/dist/react";
var industriesGridBlockSchema = {
  name: "industriesGrid",
  label: "Industries Grid",
  ui: {
    previewSrc: "/blocks/industries-grid.svg",
    // Placeholder
    defaultItem: {
      title: "Target Industries",
      industries: [
        {
          title: "Manufacturing",
          description: "Advanced manufacturing hub.",
          icon: { name: "Settings", color: "blue", style: "circle" }
        }
      ]
    },
    itemProps: (item) => ({ label: item.title || "Industries Grid" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "object",
      label: "Industries",
      name: "industries",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title
        })
      },
      fields: [
        iconSchema,
        {
          type: "image",
          label: "Background Image",
          name: "image"
        },
        {
          type: "string",
          label: "Title",
          name: "title"
        },
        {
          type: "string",
          label: "Description",
          name: "description",
          ui: {
            component: "textarea"
          }
        },
        {
          type: "string",
          label: "Link",
          name: "link"
        }
      ]
    }
  ]
};

// components/blocks/news-feed.tsx
import React19, { useEffect as useEffect2, useState as useState4 } from "react";
import { tinaField as tinaField9 } from "tinacms/dist/react";

// lib/tina-client.ts
import { createClient as createClient2 } from "tinacms/dist/client";

// tina/__generated__/types.ts
import { createClient } from "tinacms/dist/client";
function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
var GlobalPartsFragmentDoc = gql`
    fragment GlobalParts on Global {
  __typename
  header {
    __typename
    icon {
      __typename
      name
      color
      style
    }
    name
    color
    nav {
      __typename
      href
      label
    }
    utility {
      __typename
      links {
        __typename
        label
        href
      }
      phoneLabel
      phoneNumber
      phoneHref
      actions {
        __typename
        label
        href
      }
    }
  }
  footer {
    __typename
    social {
      __typename
      icon {
        __typename
        name
        color
        style
      }
      url
    }
    newsletter {
      __typename
      title
      description
      buttonText
    }
    contact {
      __typename
      address
      phone
      email
    }
  }
  theme {
    __typename
    color
    font
    darkMode
  }
}
    `;
var LayoutQueryFragmentFragmentDoc = gql`
    fragment LayoutQueryFragment on Query {
  global(relativePath: "index.json") {
    ...GlobalParts
  }
}
    ${GlobalPartsFragmentDoc}`;
var PagePartsFragmentDoc = gql`
    fragment PageParts on Page {
  __typename
  blocks {
    __typename
    ... on PageBlocksHero {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      tagline
      headline
      subheadline
      actions {
        __typename
        label
        type
        icon {
          __typename
          name
          color
          style
        }
        link
      }
      image {
        __typename
        src
        alt
        videoUrl
      }
    }
    ... on PageBlocksCallout {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      text
      url
    }
    ... on PageBlocksFeatures {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      title
      description
      items {
        __typename
        icon {
          __typename
          name
          color
          style
        }
        title
        text
        link
      }
    }
    ... on PageBlocksStats {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      title
      description
      stats {
        __typename
        stat
        type
      }
    }
    ... on PageBlocksCta {
      title
      description
      actions {
        __typename
        label
        type
        icon {
          __typename
          name
          color
          style
        }
        link
      }
    }
    ... on PageBlocksContent {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      id
      body
    }
    ... on PageBlocksTestimonial {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      title
      description
      testimonials {
        __typename
        quote
        author
        role
        avatar
      }
    }
    ... on PageBlocksVideo {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      color
      url
      autoPlay
      loop
    }
    ... on PageBlocksIndustriesGrid {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      title
      industries {
        __typename
        icon {
          __typename
          name
          color
          style
        }
        image
        title
        description
        link
      }
    }
    ... on PageBlocksNewsFeed {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      title
    }
    ... on PageBlocksNewsArchive {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      title
      description
      searchPlaceholder
      emptyState
      ctaLabel
      ctaHref
      postsToLoad
    }
    ... on PageBlocksContactForm {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      title
      text
    }
    ... on PageBlocksMap {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      title
      embedCode
      description
    }
    ... on PageBlocksPropertyListing {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      title
      description
      ctaLabel
      ctaHref
    }
    ... on PageBlocksCommunityList {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      title
      description
      ctaLabel
    }
    ... on PageBlocksBoardDirectory {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      highlight
      title
      description
    }
    ... on PageBlocksResourceLibrary {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      title
      description
      ctaLabel
      ctaHref
    }
    ... on PageBlocksPropertyExplorer {
      style {
        __typename
        background
        padding
        width
        alignment
      }
      title
      description
      ctaLabel
      ctaHref
    }
  }
}
    `;
var PostPartsFragmentDoc = gql`
    fragment PostParts on Post {
  __typename
  title
  heroImg
  excerpt
  author {
    ... on Author {
      __typename
      name
      avatar
    }
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
  }
  date
  tags {
    __typename
    tag {
      ... on Tag {
        __typename
        name
      }
      ... on Document {
        _sys {
          filename
          basename
          hasReferences
          breadcrumbs
          path
          relativePath
          extension
        }
        id
      }
    }
  }
  _body
}
    `;
var AuthorPartsFragmentDoc = gql`
    fragment AuthorParts on Author {
  __typename
  name
  avatar
}
    `;
var TagPartsFragmentDoc = gql`
    fragment TagParts on Tag {
  __typename
  name
}
    `;
var PropertiesPartsFragmentDoc = gql`
    fragment PropertiesParts on Properties {
  __typename
  name
  type
  location
  size
  price
  utilities
  railAccess
  zoning
  description
  gallery
  specSheet
  contact
  status
}
    `;
var CommunitiesPartsFragmentDoc = gql`
    fragment CommunitiesParts on Communities {
  __typename
  name
  population
  demographics
  description
  keyEmployers
  contactInfo
  profilePdf
  gallery
}
    `;
var BoardMembersPartsFragmentDoc = gql`
    fragment BoardMembersParts on BoardMembers {
  __typename
  name
  title
  organization
  sector
  photo
  bio
  term
  committees
}
    `;
var ResourcesPartsFragmentDoc = gql`
    fragment ResourcesParts on Resources {
  __typename
  title
  description
  category
  file
  date
}
    `;
var PageQueryDocument = gql`
    query pageQuery {
  ...LayoutQueryFragment
  postConnection {
    edges {
      node {
        id
        date
        title
        excerpt
        author {
          ... on Author {
            ...AuthorParts
          }
        }
        _sys {
          filename
        }
      }
    }
  }
}
    ${LayoutQueryFragmentFragmentDoc}
${AuthorPartsFragmentDoc}`;
var ContentQueryDocument = gql`
    query contentQuery($relativePath: String!) {
  ...LayoutQueryFragment
  page(relativePath: $relativePath) {
    ...PageParts
  }
}
    ${LayoutQueryFragmentFragmentDoc}
${PagePartsFragmentDoc}`;
var BlogPostQueryDocument = gql`
    query blogPostQuery($relativePath: String!) {
  ...LayoutQueryFragment
  post(relativePath: $relativePath) {
    ...PostParts
    author {
      ... on Author {
        name
        avatar
      }
    }
  }
}
    ${LayoutQueryFragmentFragmentDoc}
${PostPartsFragmentDoc}`;
var PageDocument = gql`
    query page($relativePath: String!) {
  page(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageParts
  }
}
    ${PagePartsFragmentDoc}`;
var PageConnectionDocument = gql`
    query pageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageFilter) {
  pageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageParts
      }
    }
  }
}
    ${PagePartsFragmentDoc}`;
var PostDocument = gql`
    query post($relativePath: String!) {
  post(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PostParts
  }
}
    ${PostPartsFragmentDoc}`;
var PostConnectionDocument = gql`
    query postConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PostFilter) {
  postConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PostParts
      }
    }
  }
}
    ${PostPartsFragmentDoc}`;
var AuthorDocument = gql`
    query author($relativePath: String!) {
  author(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...AuthorParts
  }
}
    ${AuthorPartsFragmentDoc}`;
var AuthorConnectionDocument = gql`
    query authorConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AuthorFilter) {
  authorConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...AuthorParts
      }
    }
  }
}
    ${AuthorPartsFragmentDoc}`;
var TagDocument = gql`
    query tag($relativePath: String!) {
  tag(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TagParts
  }
}
    ${TagPartsFragmentDoc}`;
var TagConnectionDocument = gql`
    query tagConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TagFilter) {
  tagConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TagParts
      }
    }
  }
}
    ${TagPartsFragmentDoc}`;
var GlobalDocument = gql`
    query global($relativePath: String!) {
  global(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...GlobalParts
  }
}
    ${GlobalPartsFragmentDoc}`;
var GlobalConnectionDocument = gql`
    query globalConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: GlobalFilter) {
  globalConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...GlobalParts
      }
    }
  }
}
    ${GlobalPartsFragmentDoc}`;
var PropertiesDocument = gql`
    query properties($relativePath: String!) {
  properties(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PropertiesParts
  }
}
    ${PropertiesPartsFragmentDoc}`;
var PropertiesConnectionDocument = gql`
    query propertiesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PropertiesFilter) {
  propertiesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PropertiesParts
      }
    }
  }
}
    ${PropertiesPartsFragmentDoc}`;
var CommunitiesDocument = gql`
    query communities($relativePath: String!) {
  communities(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CommunitiesParts
  }
}
    ${CommunitiesPartsFragmentDoc}`;
var CommunitiesConnectionDocument = gql`
    query communitiesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CommunitiesFilter) {
  communitiesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CommunitiesParts
      }
    }
  }
}
    ${CommunitiesPartsFragmentDoc}`;
var BoardMembersDocument = gql`
    query boardMembers($relativePath: String!) {
  boardMembers(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...BoardMembersParts
  }
}
    ${BoardMembersPartsFragmentDoc}`;
var BoardMembersConnectionDocument = gql`
    query boardMembersConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: BoardMembersFilter) {
  boardMembersConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...BoardMembersParts
      }
    }
  }
}
    ${BoardMembersPartsFragmentDoc}`;
var ResourcesDocument = gql`
    query resources($relativePath: String!) {
  resources(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ResourcesParts
  }
}
    ${ResourcesPartsFragmentDoc}`;
var ResourcesConnectionDocument = gql`
    query resourcesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ResourcesFilter) {
  resourcesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ResourcesParts
      }
    }
  }
}
    ${ResourcesPartsFragmentDoc}`;
function getSdk(requester) {
  return {
    pageQuery(variables, options) {
      return requester(PageQueryDocument, variables, options);
    },
    contentQuery(variables, options) {
      return requester(ContentQueryDocument, variables, options);
    },
    blogPostQuery(variables, options) {
      return requester(BlogPostQueryDocument, variables, options);
    },
    page(variables, options) {
      return requester(PageDocument, variables, options);
    },
    pageConnection(variables, options) {
      return requester(PageConnectionDocument, variables, options);
    },
    post(variables, options) {
      return requester(PostDocument, variables, options);
    },
    postConnection(variables, options) {
      return requester(PostConnectionDocument, variables, options);
    },
    author(variables, options) {
      return requester(AuthorDocument, variables, options);
    },
    authorConnection(variables, options) {
      return requester(AuthorConnectionDocument, variables, options);
    },
    tag(variables, options) {
      return requester(TagDocument, variables, options);
    },
    tagConnection(variables, options) {
      return requester(TagConnectionDocument, variables, options);
    },
    global(variables, options) {
      return requester(GlobalDocument, variables, options);
    },
    globalConnection(variables, options) {
      return requester(GlobalConnectionDocument, variables, options);
    },
    properties(variables, options) {
      return requester(PropertiesDocument, variables, options);
    },
    propertiesConnection(variables, options) {
      return requester(PropertiesConnectionDocument, variables, options);
    },
    communities(variables, options) {
      return requester(CommunitiesDocument, variables, options);
    },
    communitiesConnection(variables, options) {
      return requester(CommunitiesConnectionDocument, variables, options);
    },
    boardMembers(variables, options) {
      return requester(BoardMembersDocument, variables, options);
    },
    boardMembersConnection(variables, options) {
      return requester(BoardMembersConnectionDocument, variables, options);
    },
    resources(variables, options) {
      return requester(ResourcesDocument, variables, options);
    },
    resourcesConnection(variables, options) {
      return requester(ResourcesConnectionDocument, variables, options);
    }
  };
}
var generateRequester = (client2) => {
  const requester = async (doc, vars, options) => {
    let url = client2.apiUrl;
    if (options?.branch) {
      const index = client2.apiUrl.lastIndexOf("/");
      url = client2.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client2.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
var queries = (client2) => {
  const requester = generateRequester(client2);
  return getSdk(requester);
};

// lib/tina-client.ts
var resolveApiUrl = () => {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api/tina/gql`;
  }
  if (process.env.NEXT_PUBLIC_TINA_API_URL) {
    return process.env.NEXT_PUBLIC_TINA_API_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api/tina/gql`;
  }
  return "http://localhost:3000/api/tina/gql";
};
var client = createClient2({
  url: resolveApiUrl(),
  queries
});
var originalRequest = client.request.bind(client);
var getBypassHeaders = () => {
  const token = process.env.VERCEL_PROTECTION_BYPASS || process.env.VERCEL_DEPLOYMENT_PROTECTION_BYPASS;
  if (!token) {
    return {};
  }
  return {
    "x-vercel-protection-bypass": token,
    cookie: `__vercel_protection_bypass=${token}`
  };
};
client.request = (args, options = {}) => {
  const url = resolveApiUrl();
  const serverOptions = typeof window === "undefined" ? {
    ...options,
    fetchOptions: {
      ...options.fetchOptions || {},
      headers: {
        ...options.fetchOptions?.headers || {},
        ...getBypassHeaders()
      }
    }
  } : options;
  return originalRequest(
    {
      ...args,
      url
    },
    serverOptions
  );
};

// components/blocks/news-feed.tsx
import Link6 from "next/link";
import { format } from "date-fns";
var newsFeedBlockSchema = {
  name: "newsFeed",
  label: "News Feed",
  ui: {
    previewSrc: "/blocks/news-feed.svg",
    // Placeholder
    defaultItem: {
      title: "Latest News"
    },
    itemProps: (item) => ({ label: item.title || "News Feed" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Title",
      name: "title"
    }
  ]
};

// components/blocks/news-archive.tsx
import React20, { useEffect as useEffect3, useMemo, useState as useState5 } from "react";
import Image3 from "next/image";
import Link7 from "next/link";
import { format as format2 } from "date-fns";
import { tinaField as tinaField10 } from "tinacms/dist/react";
import { TinaMarkdown as TinaMarkdown3 } from "tinacms/dist/rich-text";
import { ArrowRight as ArrowRight2, Search } from "lucide-react";
var newsArchiveBlockSchema = {
  name: "newsArchive",
  label: "News Archive",
  ui: {
    previewSrc: "/blocks/news-archive.svg",
    defaultItem: {
      title: "News & Resources",
      description: "Browse announcements, incentives, grants, and meeting recaps from OCEDC.",
      postsToLoad: 24,
      searchPlaceholder: "Search announcements, grants, or meetings"
    },
    itemProps: (item) => ({ label: item.title || "News Archive" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      label: "Search Placeholder",
      name: "searchPlaceholder"
    },
    {
      type: "string",
      label: "Empty State Text",
      name: "emptyState"
    },
    {
      type: "string",
      label: "CTA Label",
      name: "ctaLabel"
    },
    {
      type: "string",
      label: "CTA Link",
      name: "ctaHref"
    },
    {
      type: "number",
      label: "Maximum Posts to Load",
      name: "postsToLoad"
    }
  ]
};

// components/blocks/contact-form.tsx
import React21 from "react";
import { tinaField as tinaField11 } from "tinacms/dist/react";
var contactFormBlockSchema = {
  name: "contactForm",
  label: "Contact Form",
  ui: {
    previewSrc: "/blocks/contact-form.svg",
    // Placeholder
    defaultItem: {
      title: "Contact OCEDC",
      text: "Reach out to our team for assistance with site selection, incentives, or general inquiries."
    },
    itemProps: (item) => ({ label: item.title || "Contact Form" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Text",
      name: "text",
      ui: {
        component: "textarea"
      }
    }
  ]
};

// components/blocks/map.tsx
import React22 from "react";
import { tinaField as tinaField12 } from "tinacms/dist/react";
var mapBlockSchema = {
  name: "map",
  label: "Map",
  ui: {
    previewSrc: "/blocks/map.svg",
    // Placeholder
    defaultItem: {
      title: "Our Location"
    },
    itemProps: (item) => ({ label: item.title || "Map" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Embed Code",
      name: "embedCode",
      ui: {
        component: "textarea"
      },
      description: "Paste the Google Maps embed iframe code here."
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    }
  ]
};

// components/blocks/property-listing.tsx
import React23, { useEffect as useEffect4, useState as useState6 } from "react";
import { tinaField as tinaField13 } from "tinacms/dist/react";
import Link8 from "next/link";
var propertyListingBlockSchema = {
  name: "propertyListing",
  label: "Property Listing",
  ui: {
    previewSrc: "/blocks/property-listing.svg",
    // Placeholder
    defaultItem: {
      title: "Featured Properties"
    },
    itemProps: (item) => ({ label: item.title || "Property Listing" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      label: "CTA Label",
      name: "ctaLabel"
    },
    {
      type: "string",
      label: "CTA Link",
      name: "ctaHref"
    }
  ]
};

// components/blocks/community-list.tsx
import React24, { useEffect as useEffect5, useState as useState7 } from "react";
import { tinaField as tinaField14 } from "tinacms/dist/react";
import Link9 from "next/link";
var communityListBlockSchema = {
  name: "communityList",
  label: "Community List",
  ui: {
    previewSrc: "/blocks/community-list.svg",
    // Placeholder
    defaultItem: {
      title: "Our Member Communities",
      description: "Six municipalities collaborate through OCEDC to provide a seamless service area."
    },
    itemProps: (item) => ({ label: item.title || "Community List" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      label: "Button Label",
      name: "ctaLabel"
    }
  ]
};

// components/blocks/board-directory.tsx
import React25, { useEffect as useEffect6, useMemo as useMemo2, useState as useState8 } from "react";
import Image4 from "next/image";
import { tinaField as tinaField15 } from "tinacms/dist/react";
var boardDirectoryBlockSchema = {
  name: "boardDirectory",
  label: "Board Directory",
  ui: {
    previewSrc: "/blocks/board-directory.svg",
    defaultItem: {
      title: "Board of Directors",
      description: "Public-private leadership guiding Ogle County\u2019s economic agenda."
    },
    itemProps: (item) => ({ label: item.title || "Board Directory" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Highlight",
      name: "highlight"
    },
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    }
  ]
};

// components/blocks/resource-library.tsx
import React26, { useEffect as useEffect7, useMemo as useMemo3, useState as useState9 } from "react";
import { format as format3 } from "date-fns";
import { tinaField as tinaField16 } from "tinacms/dist/react";
import Link10 from "next/link";
var resourceLibraryBlockSchema = {
  name: "resourceLibrary",
  label: "Resource Library",
  ui: {
    previewSrc: "/blocks/resource-library.svg",
    defaultItem: {
      title: "Newsroom & Resources",
      description: "Download community profiles, strategic plans, and data briefs for Ogle County."
    },
    itemProps: (item) => ({ label: item.title || "Resource Library" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      label: "CTA Label",
      name: "ctaLabel"
    },
    {
      type: "string",
      label: "CTA Link",
      name: "ctaHref"
    }
  ]
};

// components/blocks/property-explorer.tsx
import React27, { useEffect as useEffect8, useMemo as useMemo4, useState as useState10 } from "react";
import Link11 from "next/link";
import { tinaField as tinaField17 } from "tinacms/dist/react";
import { MapPin, SlidersHorizontal } from "lucide-react";
var propertyExplorerBlockSchema = {
  name: "propertyExplorer",
  label: "Property Explorer",
  ui: {
    previewSrc: "/blocks/property-explorer.svg",
    defaultItem: {
      title: "Explore Sites & Buildings",
      description: "Filter available properties by size, utilities, and rail access.",
      ctaLabel: "Submit a project",
      ctaHref: "/contact"
    },
    itemProps: (item) => ({ label: item.title || "Property Explorer" })
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      label: "CTA Label",
      name: "ctaLabel"
    },
    {
      type: "string",
      label: "CTA Link",
      name: "ctaHref"
    }
  ]
};

// tina/collection/page.ts
var Page = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      const filepath = document._sys.breadcrumbs.join("/");
      if (filepath === "home") {
        return "/";
      }
      return `/${filepath}`;
    }
  },
  fields: [
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true
      },
      templates: [
        heroBlockSchema,
        calloutBlockSchema,
        featureBlockSchema,
        statsBlockSchema,
        ctaBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        videoBlockSchema,
        industriesGridBlockSchema,
        newsFeedBlockSchema,
        newsArchiveBlockSchema,
        contactFormBlockSchema,
        mapBlockSchema,
        propertyListingBlockSchema,
        communityListBlockSchema,
        boardDirectoryBlockSchema,
        resourceLibraryBlockSchema,
        propertyExplorerBlockSchema
      ]
    }
  ]
};
var page_default = Page;

// tina/collection/tag.ts
var Tag = {
  label: "Tags",
  name: "tag",
  path: "content/tags",
  format: "mdx",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true
    }
  ]
};
var tag_default = Tag;

// tina/collection/properties.ts
var Properties = {
  label: "Properties",
  name: "properties",
  path: "content/properties",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Property Name",
      name: "name",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      label: "Type",
      name: "type",
      options: [
        { label: "Building", value: "building" },
        { label: "Site", value: "site" }
      ],
      required: true
    },
    {
      type: "string",
      label: "Location/Address",
      name: "location"
    },
    {
      type: "string",
      label: "Size (Acres/Sq Ft)",
      name: "size"
    },
    {
      type: "string",
      label: "Price/Lease Rate",
      name: "price"
    },
    {
      type: "string",
      label: "Utilities",
      name: "utilities",
      list: true,
      options: [
        { label: "Electric", value: "electric" },
        { label: "Gas", value: "gas" },
        { label: "Water", value: "water" },
        { label: "Sewer", value: "sewer" },
        { label: "Fiber", value: "fiber" }
      ]
    },
    {
      type: "boolean",
      label: "Rail Access",
      name: "railAccess"
    },
    {
      type: "string",
      label: "Zoning",
      name: "zoning"
    },
    {
      type: "rich-text",
      label: "Description",
      name: "description"
    },
    {
      type: "image",
      label: "Photo Gallery",
      name: "gallery",
      list: true
    },
    {
      type: "image",
      label: "Spec Sheet PDF",
      name: "specSheet"
    },
    {
      type: "string",
      label: "Contact Person",
      name: "contact"
    },
    {
      type: "string",
      label: "Status",
      name: "status",
      options: [
        { label: "Available", value: "available" },
        { label: "Under Contract", value: "under_contract" },
        { label: "Sold", value: "sold" }
      ]
    }
  ]
};
var properties_default = Properties;

// tina/collection/communities.ts
var Communities = {
  label: "Communities",
  name: "communities",
  path: "content/communities",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Community Name",
      name: "name",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      label: "Population",
      name: "population"
    },
    {
      type: "rich-text",
      label: "Demographics",
      name: "demographics"
    },
    {
      type: "rich-text",
      label: "Description",
      name: "description"
    },
    {
      type: "string",
      label: "Key Employers",
      name: "keyEmployers",
      list: true
    },
    {
      type: "rich-text",
      label: "Contact Information",
      name: "contactInfo"
    },
    {
      type: "image",
      label: "Community Profile PDF",
      name: "profilePdf"
    },
    {
      type: "image",
      label: "Photo Gallery",
      name: "gallery",
      list: true
    }
  ]
};
var communities_default = Communities;

// tina/collection/board-members.ts
var BoardMembers = {
  label: "Board Members",
  name: "boardMembers",
  path: "content/board-members",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      label: "Title",
      name: "title"
    },
    {
      type: "string",
      label: "Organization",
      name: "organization"
    },
    {
      type: "string",
      label: "Sector",
      name: "sector",
      options: [
        { label: "Public", value: "public" },
        { label: "Private", value: "private" }
      ]
    },
    {
      type: "image",
      label: "Photo",
      name: "photo"
    },
    {
      type: "rich-text",
      label: "Bio",
      name: "bio"
    },
    {
      type: "string",
      label: "Term Dates",
      name: "term"
    },
    {
      type: "string",
      label: "Committees",
      name: "committees",
      list: true
    }
  ]
};
var board_members_default = BoardMembers;

// tina/collection/resources.ts
var Resources = {
  label: "Resources",
  name: "resources",
  path: "content/resources",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      label: "Description",
      name: "description",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      label: "Category",
      name: "category",
      options: [
        { label: "Community Profile", value: "community_profile" },
        { label: "Strategic Plan", value: "strategic_plan" },
        { label: "Meeting Notes", value: "meeting_notes" },
        { label: "Labor Market Study", value: "labor_market_study" },
        { label: "Infrastructure Map", value: "infrastructure_map" },
        { label: "Other", value: "other" }
      ]
    },
    {
      type: "image",
      label: "File (PDF)",
      name: "file"
    },
    {
      type: "datetime",
      label: "Date Added",
      name: "date"
    }
  ]
};
var resources_default = Resources;

// tina/config.tsx
var config = defineConfig({
  contentApiUrlOverride: process.env.NEXT_PUBLIC_TINA_API_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/tina/gql` : "http://localhost:3000/api/tina/gql"),
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
  process.env.HEAD,
  // Netlify branch env
  token: process.env.TINA_TOKEN,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads"
    }
  },
  build: {
    publicFolder: "public",
    // The public asset folder for your framework
    outputFolder: "admin",
    // within the public folder
    basePath: next_config_default.basePath?.replace(/^\//, "") || ""
    // The base path of the app (could be /blog)
  },
  schema: {
    collections: [page_default, post_default, author_default, tag_default, global_default, properties_default, communities_default, board_members_default, resources_default]
  }
});
var config_default = config;
export {
  config_default as default
};
