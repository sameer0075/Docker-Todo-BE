module.exports = {
    apps: [
      {
        name: 'docker-compose',
        script: 'docker-compose',
        args: 'up',
        interpreter: '/usr/bin/sh',
        interpreter_args: '-c',
        autorestart: true,
        watch: false,
      },
    ],
  };
  