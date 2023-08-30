# INFO

## TODO

- [ ] Upload images
- [ ] markera aktiv sida i header.
- BASICS
  - [ ] Check TODO's
  - [ ] Check Any:s
  - [ ] Update dependencies
- NICE TO HAVE
  - [ ] Combobox multi select - https://github.com/shadcn-ui/ui/pull/304/files

## Known issues

- [ ] DynamicServerError: Dynamic server usage: Page couldn't be rendered statically because it used `cookies`. [See more info here](https://nextjs.org/docs/messages/dynamic-server-error)
  - import { revalidatePath } from "next/cache";

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
- REACT
  - [Confirm dialog](https://medium.com/@kch062522/useconfirm-a-custom-react-hook-to-prompt-confirmation-before-action-f4cb746ebd4e)
- OTHER
  - COMPONENTS
    - [Shadcn UI](https://ui.shadcn.com/)
    - [Material UI](https://mui.com/material-ui/)
    - [Chakra UI](https://chakra-ui.com/)
  - [React component as prop](https://www.developerway.com/posts/react-component-as-prop-the-right-way)
  - [Zustand slices](https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md)
  - [SWR](https://swr.vercel.app/)
  - [Clerk authentication](https://clerk.com/)
  - ICONS
    - [Lucide](https://lucide.dev/icons/)
    - [Iconify](https://iconify.design/)
    - [Hero Icons](https://heroicons.com/)
    - [Phosphor Icons](https://phosphoricons.com/)
    - [Favicon](https://realfavicongenerator.net/)

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
