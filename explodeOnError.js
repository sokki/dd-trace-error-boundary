const error = global.console.error;

global.console.error = (message) => {
  throw new Error(message);
};
