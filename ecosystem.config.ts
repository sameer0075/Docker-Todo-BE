module.exports = {
    apps: [
      {
        name: 'docker-compose',
        script: 'docker-compose',
        args: 'up',
        interpreter: '/bin/sh', // Ensure this is a valid shell interpreter
        interpreter_args: '-c',
        autorestart: true,
        watch: false,
      },
    ],
  };
  