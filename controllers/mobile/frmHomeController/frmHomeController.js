define({ 

  onViewCreated(){
    this.view.init = () => {
      this.view.buttonIncidencias.onClickButton = () => new voltmx.mvc.Navigation('frmIncidencias').navigate();
      this.view.buttonDesc.onClickButton = () => new voltmx.mvc.Navigation('frmLogin').navigate();
      this.view.homeHeader.onClickLeft = () => {
        this.view.hamburgerMenu.toggle(true);
      };
      this.view.hamburgerMenu.onItemSelected = (key) => {
        switch(key){
          case 'inicio':
            break;
          case 'incidencias':
            new voltmx.mvc.Navigation('frmIncidencias').navigate();
            break;
          case 'desconectar':
            new voltmx.mvc.Navigation('frmLogin').navigate();
            break;
          default: 
            break;
        }
      };
    };
  }

});