module.exports = class Command {
  constructor(options) {
    this.config = {
      name: options.name,
      aliases: options.aliases || [],
      category: options.category,
      dev: options.dev || false
    }
  }
}