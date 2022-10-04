define(function() {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {

		},
		initGettersSetters() {
            defineGetter(this, 'selected', () => {
                return this.view.checkbox.selectedIndex === 0;
            });
            defineSetter(this, 'selected', value => {
                this.view.checkbox.selectedIndex = value ? 0 : 1;
            });
        }
	};
});