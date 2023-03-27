class CommandOptionModel {
  constructor(data = {}) {
    if (!data) data = {};
    this.id = data.id;
    this.unsendCommand = data.unsendCommand;
  }

  getObject() {
    return {
      id: this.id,
      unsendCommand: this.unsendCommand,
    };
  }

  getJson(format) {
    return JSON.stringify(this.getObject(), null, format);
  }

  static formatCommandOption(id) {
    return {
      id,
      unsend: {
        allowUserUse: false,
      },
    };
  }
}

export default CommandOptionModel;
