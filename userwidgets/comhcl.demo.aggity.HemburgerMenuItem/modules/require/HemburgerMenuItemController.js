define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.view.preShow = () => {
        if(!this.initDone){
          this.view.onClick = () => this.onSelected(this.key);
          this.initDone = true;
        }
      };
    },

    initGettersSetters: function() {},

    onSelected(){}
  };
});