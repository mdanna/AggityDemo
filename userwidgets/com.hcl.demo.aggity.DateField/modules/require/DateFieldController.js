define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {},

    initGettersSetters() {},

    getDate(){
      const dc = this.view.calWidget.dateComponents;
      const day = dc[0] + '';
      const month = dc[1] + '';
      const year = dc[2] + '';
      return `${day.length < 2 ? '0'+ day : day}/${month.length < 2 ? '0'+ month : month}/${year}`;
    },

    resetDate(){
      const now = new Date();
      this.view.calWidget.dateComponents = [now.getDate(), now.getMonth() + 1, now.getFullYear(), 0, 0, 0];
    }
  };
});