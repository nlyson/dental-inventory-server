module.exports = {
  apps: [{
    name: 'dental-inventory',
    script: 'server.js',
    env: {
      NODE_ENV: 'production'
    },
    watch: false,
    instances: 1,
    autorestart: true,
    max_restarts: 10
  }]
};
