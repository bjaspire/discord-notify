# Discord Notify Action

This GitHub Action allows you to send a notification to a Discord channel using a webhook URL.

## Usage

To use this action in your GitHub Actions workflow, you can add a step like the following:

```yaml
- name: Notify Discord
  uses: bjaspire/discord-notify@v2
  with:
    webhook-url: ${{ secrets.DISCORD_WEBHOOK_URL }}
    message: 'Hello from GitHub Actions!'
