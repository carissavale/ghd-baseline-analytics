// Minimal flat config — Next 16 + ESLint 9 + the FlatCompat shim choke on
// `next/typescript` because of circular plugin references. Strict TypeScript
// type-checking via `npm run typecheck` is the real gate; this config keeps
// `next lint` green without pulling in the unstable preset.

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "next-env.d.ts",
      "supabase/migrations/**",
    ],
  },
];

export default eslintConfig;
