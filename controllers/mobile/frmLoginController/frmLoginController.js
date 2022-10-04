define({ 

	onViewCreated(){
      this.view.init = () => {
        this.view.lblLogin.onTouchEnd = () => new voltmx.mvc.Navigation('frmHome').navigate();
      };
    }

});