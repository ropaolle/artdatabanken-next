# INFO

## TODO

- [ ] 
- BASICS
  - [ ] Check TODO's
  - [ ] Check TypeScript any:s
- NICE TO HAVE
  - [ ] Remove unessesarry 'use client' directives.
  - [ ] Combobox multi select - https://github.com/shadcn-ui/ui/pull/304/files
  - [ ] Check if [React Hook useEffect has a missing dependencies](https://react.dev/learn/removing-effect-dependencies).

## Known issues

- [ ] DynamicServerError: Dynamic server usage: Page couldn't be rendered statically because it used `cookies`. [See more info here](https://nextjs.org/docs/messages/dynamic-server-error)
  - import { revalidatePath } from "next/cache";
- [ ] Create thumbnails with transform. Kräver för närvarande att betalkonto.
  - Example: `const { data: baseUrl } = supabase.storage.from("images").getPublicUrl(data[0].name, { transform: { width: 100, height: 100 }});`
  - [How-to](https://supabase.com/docs/reference/javascript/storage-from-getpublicurl)

## Info

- Server vs client components
  - Use server components if possible, othervise add the 'use client' option.
  - Server components cannot be imported in a client component. However, a server component can be passed as a child prop to a custom client component.

## Links

- TAILWIND
  - [Tailwind CSS](https://tailwindcss.com/)
    - [Reusing styles](https://tailwindcss.com/docs/reusing-styles)
  - [Cheat Sheet](https://tailconwindcomponents.com/cheatsheet/)
  - [unknownAtRules Warnings From Tailwind CSS](https://www.codeconcisely.com/posts/tailwind-css-unknown-at-rules/)
  - [Tailwind Elements](https://tailwind-elements.com/docs/standard/data/datatables/)
  - [Tips and tricks](https://material-minimal.com/learn/design-hacks/tips-and-tricks/)
- SUPABASE
  - [Supabase](https://supabase.com/docs/reference/javascript)
  - [auth-api](https://supabase.com/docs/reference/javascript/auth-api)
  - [Auth helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
  - [CLI TypeScript](https://supabase.com/docs/reference/javascript/typescript-support)
  - [Joins](https://supabase.com/docs/guides/api/joins-and-nesting)
  - [Reserved words](https://www.postgresql.org/docs/current/sql-keywords-appendix.html)
  - [Supabase dev locally](https://supabase.com/docs/guides/cli/local-development)
- REACT
  - [Typescript cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/)
  - [useConfirm](https://devrecipes.net/custom-confirm-dialog-with-react-hooks-and-the-context-api/)
  - [Confirm dialog](https://medium.com/@kch062522/useconfirm-a-custom-react-hook-to-prompt-confirmation-before-action-f4cb746ebd4e)
  - [FileController](https://stackblitz.com/edit/input-file-react-hook-form?file=src%2FFileController.js)
- OTHER
  - COMPONENTS
    - [Shadcn UI](https://ui.shadcn.com/)
    - [Material UI](https://mui.com/material-ui/)
    - [Chakra UI](https://chakra-ui.com/)
  - [React component as prop](https://www.developerway.com/posts/react-component-as-prop-the-right-way)
  - [Zustand slices](https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md)
  - [SWR](https://swr.vercel.app/)
  - [Clerk authentication](https://clerk.com/)
  - ZOD
    - [File validation](https://github.com/colinhacks/zod/issues/387#issuecomment-1712177211)
  - ICONS
    - [Lucide](https://lucide.dev/icons/)
    - [Iconify](https://iconify.design/)
    - [Hero Icons](https://heroicons.com/)
    - [Phosphor Icons](https://phosphoricons.com/)
    - [Favicon](https://realfavicongenerator.net/)
  - BUN
    - [Bun](https://bun.sh/)

## Supabase CLI

```sh
# Generate types
npm i supabase --save-dev
npx supabase login
npx supabase gen types typescript --project-id yeebxkyqwarhmbfpkgir > "./src/lib/database.types.ts"
```

## Miscellaneous

### Test dark mode in Chrome

Developer tools, ... to the right, select `Show Console Drawer`, select `Rendering`, select `Emulate CSS media feature` prefer-color-scheme.

![Test dark mode in Chrome](./doc/test-dark-mode-in-chrome.png)

### PNPM

- [Install](https://pnpm.io/installation)

```sh
wget -qO- https://get.pnpm.io/install.sh | sh -
source /home/olle/.bashrc

# Update
pnpm add -g pnpm
```
