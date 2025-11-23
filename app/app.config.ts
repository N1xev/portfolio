export default defineAppConfig({
  ui: {
    main: {
      base: "min-h-[calc(100vh-150px)]",
    },
      colors: {
          primary: "zinc",
          secondary: "purple",
          success: "emerald",
          info: "blue",
          warning: "yellow",
          error: "rose",
          neutral: "gray",
      },
    contentSurround: {
      slots: {
        root: "grid grid-cols-1 sm:grid-cols-2 gap-0",
        link: [
          "group block py-8 rounded-none hover:bg-elevated/50 focus-visible:outline-primary",
          "transition-colors",
        ],
        linkLeading: [
          "inline-flex items-center rounded-none border-dashed border border-accented ring-0 p-1.5 bg-elevated group-hover:bg-primary/10 mb-4 group-hover:border-primary/50",
          "transition",
        ],
        linkLeadingIcon: [
          "size-5 shrink-0 text-highlighted group-hover:text-primary",
          "transition-[color,translate]",
        ],
        linkTitle: "font-medium text-[15px] text-highlighted mb-1 truncate",
        linkDescription: "text-sm text-muted line-clamp-2",
      },
      variants: {
        direction: {
          left: {
            link: ["border-y border-l-0 border-r border-gray-300 dark:border-gray-700 border-dashed"],
            linkLeadingIcon: ["group-active:-translate-x-0.5"],
          },
          right: {
            link: ["text-right border-y border-l border-r-0 border-gray-300 dark:border-gray-700 border-dashed"],
            linkLeadingIcon: ["group-active:translate-x-0.5"],
          },
        },
      },
    },
  },
});
