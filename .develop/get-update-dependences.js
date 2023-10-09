#!/usr/bin/env node

/**
 * Parse list and return update command.
 *   
 * ┌────────────────────────┬─────────┬─────────┐
 * │ Package                │ Current │ Latest  │
 * ├────────────────────────┼─────────┼─────────┤
 * │ @tanstack/react-table  │ 8.10.3  │ 8.10.6  │
 * ├────────────────────────┼─────────┼─────────┤
 * │ @types/node (dev)      │ 20.8.2  │ 20.8.3  │
 * ├────────────────────────┼─────────┼─────────┤
 * │ @types/react-dom (dev) │ 18.2.10 │ 18.2.11 │
 * ├────────────────────────┼─────────┼─────────┤
 * │ @tanstack/react-query  │ 4.35.7  │ 4.36.1  │
 * ├────────────────────────┼─────────┼─────────┤
 * │ eslint (dev)           │ 8.50.0  │ 8.51.0  │
 * └────────────────────────┴─────────┴─────────┘
 * 
 * => Update command: pnpm i @tanstack/react-table@latest @types/node@latest @types/react-dom@latest 
 *                    @tanstack/react-query@latest eslint@latest 
 * 
 **/

const { exec } = require("child_process");
const command = "pnpm outdated | tee"

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  console.info(stdout);

  let updateCommand = "pnpm i "

  const lines = stdout.split("\n")

  for (const line of lines) {
    if ((line.indexOf("─") !== -1) || (line.indexOf("│ Package ") === 0)) {
      continue;
    }

    const parsed = line.split("│")

    if (parsed.length < 3) continue;

    const packedge = parsed[1].replace("(dev)", "").trim()
    const latest = parsed[3].trim()

    updateCommand += packedge + "@latest "
  }

  console.info("Update command")
  console.info(updateCommand)
});