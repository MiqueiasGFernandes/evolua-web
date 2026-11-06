import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({ baseDirectory: currentDirectory });

const config = [
  { ignores: [".next/**", ".next-states/**", "next-env.d.ts", "node_modules/**", "playwright-report/**", "test-results/**", "coverage/**"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { files: ["src/features/pdi-cycles/adapters/local-storage-pdi-cycle-repository.ts"], rules: { "@typescript-eslint/no-unused-vars": "off" } }
];

export default config;
