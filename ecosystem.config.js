module.exports = {
  apps: [
    {
      script: "npm start",
      watch: ".",
    },
  ],

  deploy: {
    production: {
      key: "key.pem",
      user: "ubuntu",
      host: "13.232.60.243",
      ref: "origin/main",
      repo: "https://github.com/DevFaisal/pulseai-next.git",
      path: "/home/ubuntu",
      "pre-deploy-local": "",
      "post-deploy":"source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production",
      "pre-setup": "",
      "ssh_options": "ForwardAgent=yes",
    },
  },
};
