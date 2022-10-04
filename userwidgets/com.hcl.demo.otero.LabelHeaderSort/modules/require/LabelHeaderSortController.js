define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          eventManager.subscribe('evt_sort', ({key, newSortOrder}) => {
            this.sortOrder = key === this.key ? newSortOrder : 'none';
          });
          this.view.preShow = () => {
            if(!this.initDone){
              this.view.onClick = () => {
                let newSortOrder = 'asc';
                this.sortOrder === 'asc' && (newSortOrder = 'desc');
                eventManager.publish('evt_sort', {key: this.key, newSortOrder});
              };
              this.initDone = true;
            }
          };

		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
            defineGetter(this, 'sortOrder', () => {
                return this._sortOrder;
            });
            defineSetter(this, 'sortOrder', value => {
                this._sortOrder = value;
                this.view.lblIconUp.isVisible = value === 'asc';
                this.view.lblIconDown.isVisible = value === 'desc';
            });
            defineGetter(this, 'key', () => {
                return this._key;
            });
            defineSetter(this, 'key', value => {
                this._key = value;
            });
        }
	};
});