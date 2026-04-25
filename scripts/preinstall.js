const agent = process.env.npm_config_user_agent || '';

if (!agent.startsWith('pnpm')) {
  console.error('\x1b[31m%s\x1b[0m', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.error('\x1b[31m%s\x1b[0m', '  [ERROR] This project strictly uses pnpm!');
  console.error('\x1b[31m%s\x1b[0m', '  Please run: pnpm install');
  console.error('\x1b[31m%s\x1b[0m', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  process.exit(1);
}