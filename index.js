const { execSync } = require('child_process');
const axios = require('axios');

try {
  const core = require('@actions/core');

  const webhookUrl = core.getInput('webhook-url');
  const message = core.getInput('message');

  // Retrieve the last 5 commit messages
  const commitMessages = execSync('git log --format="- %h | %an | %s" -n 5').toString().trim();

  const notification = {
    title: `New Pull Request: ${process.env.GITHUB_HEAD_REF}`,
    body: `Description: ${process.env.GITHUB_BODY.replace(/\r?\n/g, '\\n')}`,
    author: `Author: ${process.env.GITHUB_ACTOR}`,
    url: `Link: ${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/pull/${process.env.GITHUB_PULL_REQUEST}`,
    commit_messages: commitMessages.split('\n').map((message) => message.trim()),
  };

  axios
    .post(webhookUrl, { content: message, notification })
    .then(() => {
      console.log('Notification sent to Discord');
    })
    .catch((error) => {
      console.error('Failed to send notification to Discord:', error);
      core.setFailed('Failed to send notification to Discord');
    });
} catch (error) {
  console.error('An error occurred:', error);
  core.setFailed('An error occurred');
}
