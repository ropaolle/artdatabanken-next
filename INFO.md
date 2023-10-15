# INFO

## TODO

- [ ] Bilder i Cloudinary, Sentry or Versel
- [ ] Error boundaries, throw errors
- [ ] User info and lists + edit, not delete, no select
- [ ] Avatar maker with crop
- [ ] Invoice maker
- [ ] Add Typograpy?
- [ ] Storybook
- [ ] Own infrastructure (Postgres, docker, webserver, logs)

### GENERIC CHECKS

- TODO:'s
- TypeScript any:s
- eslint-disable-next-line
- Remove unessesary useEffect and hooks
- [react-hooks/exhaustive-deps](https://react.dev/learn/removing-effect-dependencies)

### NICE TO HAVE

- Supabase edge functions - image manipulation?

## Known issues

- [ ] [Unnecessary AlertDialogPortal and DialogPortal component removed](https://github.com/shadcn-ui/ui/pull/1603/files)
- [ ] [Relationships between tables are not typed correctly](https://github.com/supabase/cli/issues/736)
- [ ] DynamicServerError: Dynamic server usage: Page couldn't be rendered statically because it used `cookies`. [See more info here](https://nextjs.org/docs/messages/dynamic-server-error)
  - import { revalidatePath } from "next/cache";
- [ ] Create thumbnails with transform. Kräver för närvarande att betalkonto.
  - Example: `const { data: baseUrl } = supabase.storage.from("images").getPublicUrl(data[0].name, { transform: { width: 100, height: 100 }});`
  - [How-to](https://supabase.com/docs/reference/javascript/storage-from-getpublicurl)

## Info

- Updated Shaden/UI components
  - Toast: Variant `warning` added
  - Form: FormItem specing `space-y-2` removed
  - Navigation-menu: Multiple styling updates to allow the menu to align right (without any content outside the viewport).

## Links

- TAILWIND
  - [Tailwind CSS](https://tailwindcss.com/)
    - [Reusing styles](https://tailwindcss.com/docs/reusing-styles)
  - [Cheat Sheet](https://tailconwindcomponents.com/cheatsheet/)
  - [unknownAtRules Warnings From Tailwind CSS](https://www.codeconcisely.com/posts/tailwind-css-unknown-at-rules/)
  - [Tailwind Elements](https://tailwind-elements.com/docs/standard/data/datatables/)
  - [Tips and tricks](https://material-minimal.com/learn/design-hacks/tips-and-tricks/)
  - [Typography](https://tailwindcss.com/docs/typography-plugin)
- SUPABASE
  - [Supabase](https://supabase.com/docs/reference/javascript)
  - [auth-api](https://supabase.com/docs/reference/javascript/auth-api)
  - [Auth helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
  - [CLI TypeScript](https://supabase.com/docs/reference/javascript/typescript-support)
  - [Joins](https://supabase.com/docs/guides/api/joins-and-nesting)
  - [Reserved words](https://www.postgresql.org/docs/current/sql-keywords-appendix.html)
  - [Supabase dev locally](https://supabase.com/docs/guides/cli/local-development)
  - [Supabase and React Query](https://makerkit.dev/blog/saas/supabase-react-query)
  - [Supabase pagination](https://makerkit.dev/blog/tutorials/pagination-supabase-react)
  - [Automated backups using GitHub Actions](https://supabase.com/docs/guides/cli/github-action/backups)
  - [User profiles](https://supabase.com/docs/guides/auth/managing-user-data)
- SHADEN/UI
  - [Shadcn UI](https://ui.shadcn.com/)
  - Extend Combobox to support multi select - https://github.com/shadcn-ui/ui/pull/304/files.
- REACT
  - [React DEV](https://react.dev/)
  - [useConfirm](https://devrecipes.net/custom-confirm-dialog-with-react-hooks-and-the-context-api/)
  - [Confirm dialog](https://medium.com/@kch062522/useconfirm-a-custom-react-hook-to-prompt-confirmation-before-action-f4cb746ebd4e)
  - [FileController](https://stackblitz.com/edit/input-file-react-hook-form?file=src%2FFileController.js)
  - [React component as prop](https://www.developerway.com/posts/react-component-as-prop-the-right-way)
- TYPESCRIPT
  - [Typescript cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/)
- NextJS
  - [Server vs client components in NextJs 13](https://www.youtube.com/watch?v=3Dw6D_WuzSE&t=993s)
  - [Updated image component](https://github.com/vercel/next.js/tree/86d2ead1fe612432f7aee73f295a3753bd421ebe/examples/image-component)
- OTHER
  - [Zustand slices](https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md)
  - [ZOD File validation](https://github.com/colinhacks/zod/issues/387#issuecomment-1712177211)
  - [Sentry](https://docs.sentry.io/platforms/javascript/guides/nextjs/?original_referrer=https%3A%2F%2Fwww.google.com%2F)
- ICONS
  - [Lucide](https://lucide.dev/icons/)
  - [Iconify](https://iconify.design/)
  - [Hero Icons](https://heroicons.com/)
  - [Phosphor Icons](https://phosphoricons.com/)
  - [Favicon](https://realfavicongenerator.net/)

## Supabase

### CLI

```sh
# Generate types
npm i supabase --save-dev
npx supabase login
npx supabase gen types typescript --project-id yeebxkyqwarhmbfpkgir > "./src/lib/database.types.ts"
```

### Github Actions Backup

- URL connection string: `supabase_db_url: postgresql://postgres:[YOUR-PASSWORD]@db.<ref>.supabase.co:5432/postgres`

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

### Deploy main branch

[Deploy](https://api.vercel.com/v1/integrations/deploy/prj_fwA2kFKewLH0tqjIqUcZHbL1pfl0/Rj24zBv3qx)
