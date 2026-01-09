export default defineAppConfig({
  ui: {
    main: {
      base: "min-h-[calc(100vh-150px)]",
    },
    button: {
      slots: {
        base: [
          'rounded-none',
          'font-medium',
          'outline-none',
          'ring-0',
          'transition-all duration-200',
        ],
      },
      variants: {
        variant: {
          outline: 'ring-0 border border-dashed border-gray-500 focus-visible:border-primary',
          subtle: 'ring-0 border border-dashed border-gray-500',
          soft: 'ring-0 outline-none',
          ghost: 'ring-0 outline-none',
        },
      },
      compoundVariants: [
        { color: 'primary', variant: 'outline', class: 'ring-0 border border-dashed border-primary/50 text-primary hover:bg-primary/10 focus-visible:border-primary' },
        { color: 'primary', variant: 'subtle', class: 'ring-0 border border-dashed border-primary/25 bg-primary/10 focus-visible:border-primary' },
        { color: 'neutral', variant: 'outline', class: 'ring-0 border border-dashed border-accented text-default bg-default hover:bg-elevated focus-visible:border-inverted' },
        { color: 'neutral', variant: 'subtle', class: 'ring-0 border border-dashed border-accented text-default bg-elevated focus-visible:border-inverted' },
        { color: 'secondary', variant: 'outline', class: 'ring-0 border border-dashed border-secondary/50 text-secondary hover:bg-secondary/10 focus-visible:border-secondary' },
        { color: 'secondary', variant: 'subtle', class: 'ring-0 border border-dashed border-secondary/25 bg-secondary/10 focus-visible:border-secondary' },
        { color: 'success', variant: 'outline', class: 'ring-0 border border-dashed border-success/50 text-success hover:bg-success/10 focus-visible:border-success' },
        { color: 'success', variant: 'subtle', class: 'ring-0 border border-dashed border-success/25 bg-success/10 focus-visible:border-success' },
        { color: 'info', variant: 'outline', class: 'ring-0 border border-dashed border-info/50 text-info hover:bg-info/10 focus-visible:border-info' },
        { color: 'info', variant: 'subtle', class: 'ring-0 border border-dashed border-info/25 bg-info/10 focus-visible:border-info' },
        { color: 'warning', variant: 'outline', class: 'ring-0 border border-dashed border-warning/50 text-warning hover:bg-warning/10 focus-visible:border-warning' },
        { color: 'warning', variant: 'subtle', class: 'ring-0 border border-dashed border-warning/25 bg-warning/10 focus-visible:border-warning' },
        { color: 'error', variant: 'outline', class: 'ring-0 border border-dashed border-error/50 text-error hover:bg-error/10 focus-visible:border-error' },
        { color: 'error', variant: 'subtle', class: 'ring-0 border border-dashed border-error/25 bg-error/10 focus-visible:border-error' },
      ],
    },

    card: {
      slots: {
        root: 'rounded-none overflow-hidden ring-0',

      },
      variants: {
        variant: {
          outline: { root: 'ring-0 border border-dashed border-default' },
          subtle: { root: 'ring-0 border border-dashed border-default' },
          soft: { root: 'ring-0' },
          solid: { root: 'ring-0' },
        },
      },
    },

    input: {
      slots: {
        root: 'relative inline-flex items-center',
        base: [
          'w-full rounded-none border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors',
        ],
      },
      variants: {
        variant: {
          outline: 'text-highlighted ring-0 border border-dashed border-accented',
          subtle: 'text-highlighted ring-0 border border-dashed border-accented',
          soft: 'text-highlighted ring-0',
          ghost: 'text-highlighted ring-0',
          none: 'text-highlighted ring-0',
        },
      },
      compoundVariants: [
        { color: 'primary', variant: ['outline', 'subtle'], class: 'ring-0 focus-visible:border-primary focus-visible:border-2' },
        { color: 'primary', highlight: true, class: 'ring-0 border border-dashed border-primary' },
        { color: 'neutral', variant: ['outline', 'subtle'], class: 'ring-0 focus-visible:border-inverted focus-visible:border-2' },
        { color: 'neutral', highlight: true, class: 'ring-0 border border-dashed border-inverted' },
      ],
    },

    textarea: {
      slots: {
        root: 'relative inline-flex items-center',
        base: [
          'w-full rounded-none border-0 appearance-none placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'transition-colors',
        ],
      },
      variants: {
        variant: {
          outline: 'text-highlighted ring-0 border border-dashed border-accented',
          subtle: 'text-highlighted ring-0 border border-dashed border-accented',
          soft: 'text-highlighted ring-0',
          ghost: 'text-highlighted ring-0',
          none: 'text-highlighted ring-0',
        },
      },
      compoundVariants: [
        { color: 'primary', variant: ['outline', 'subtle'], class: 'ring-0 focus-visible:border-primary focus-visible:border-2' },
        { color: 'primary', highlight: true, class: 'ring-0 border border-dashed border-primary' },
        { color: 'neutral', variant: ['outline', 'subtle'], class: 'ring-0 focus-visible:border-inverted focus-visible:border-2' },
        { color: 'neutral', highlight: true, class: 'ring-0 border border-dashed border-inverted' },
      ],
    },

    navigationMenu: {
      slots: {
        link: 'group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-none focus:outline-none focus-visible:outline-none focus-visible:before:border focus-visible:before:border-dashed focus-visible:before:border-primary',
        childLink: 'group relative size-full flex items-start text-start text-sm before:absolute before:z-[-1] before:rounded-none focus:outline-none focus-visible:outline-none focus-visible:before:border focus-visible:before:border-dashed focus-visible:before:border-primary',
        viewport: 'relative overflow-hidden bg-default shadow-lg rounded-none ring-0 border border-dashed border-default h-(--reka-navigation-menu-viewport-height) w-full transition-[width,height,left] duration-200 origin-[top_center] data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] z-[1]',
        arrow: 'relative top-[50%] size-2.5 rotate-45 border border-dashed border-default bg-default z-[1] rounded-none',
      },
    },

    tooltip: {
      slots: {
        content: 'rounded-none ring-0 border border-dashed border-default',
      },
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
            link: [
              "border-y border-l-0 border-r border-gray-300 dark:border-gray-700 border-dashed",
            ],
            linkLeadingIcon: ["group-active:-translate-x-0.5"],
          },
          right: {
            link: [
              "text-right border-y border-l border-r-0 border-gray-300 dark:border-gray-700 border-dashed",
            ],
            linkLeadingIcon: ["group-active:translate-x-0.5"],
          },
        },
      },
    },

    modal: {
      slots: {
        overlay: 'fixed inset-0 backdrop-blur-sm',
        content: 'bg-default divide-y divide-dashed divide-gray-300 dark:divide-gray-700 flex flex-col focus:outline-none',
      },
      variants: {
        overlay: {
          true: {
            overlay: 'bg-elevated/50 backdrop-blur-sm',
          },
        },
        fullscreen: {
          false: {
            content: 'w-[calc(100vw-2rem)] max-w-lg rounded-none shadow-lg ring-0 border border-dashed border-gray-300 dark:border-gray-700',
          },
        },
      },
    },

    commandPalette: {
      slots: {
        root: 'flex flex-col min-h-0 min-w-0 divide-y divide-dashed divide-gray-300 dark:divide-gray-700',
        input: '[&>input]:text-base/5 ring-0 border-0',
      },
      variants: {
        virtualize: {
          false: {
            viewport: 'divide-y divide-dashed divide-gray-300 dark:divide-gray-700',
          },
        },
      },
    },

    contentSearch: {
      slots: {
        modal: 'ring-0',
        input: '[&>input]:text-base/5 ring-0 border-0 rounded-none',
      },
    },

    prose: {
      callout: {
        slots: {
          base: 'relative ring-0 border border-dashed rounded-none',
        },
      },
      card: {
        slots: {
          base: 'ring-0 border border-dashed rounded-none',
        },
      },
      cardGroup: {
        slots: {
          root: 'ring-0',
        },
      },
      note: {
        slots: {
          base: 'ring-0 border border-dashed rounded-none',
        },
      },
      tip: {
        slots: {
          base: 'ring-0 border border-dashed rounded-none',
        },
      },
      warning: {
        slots: {
          base: 'ring-0 border border-dashed rounded-none',
        },
      },
      pre: {
        slots: {
          header: 'border border-dashed border-gray-300 dark:border-gray-700',
          base: 'border border-dashed border-gray-300 dark:border-gray-700',
        },
      },
      code: {
        base: 'ring-0 border border-dashed border-gray-500 dark:border-gray-600 rounded-none px-1.5 py-0.5 bg-gray-800/50 text-primary',
      },
      hr: {
        base: 'border-0 border-t border-dashed border-gray-300 dark:border-gray-700 my-8',
      },
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
  },
});
