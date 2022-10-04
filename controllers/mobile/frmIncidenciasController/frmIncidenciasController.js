define({ 

  onViewCreated(){
    this.view.init = () => {
      this.view.incHeader.onClickLeft = () => {
        this.view.hamburgerMenu.toggle(true);
      };

      this.view.hamburgerMenu.onItemSelected = (key) => {
        switch(key){
          case 'inicio':
            new voltmx.mvc.Navigation('frmHome').navigate();
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

      this.view.buttonSubir.onClick = () => {
        kony.phone.openMediaGallery((rawBytes) => {
          this.addRawBytes(rawBytes);
        });
      };

      if(this.view.camera){
        this.view.camera.onCapture = () => {
          this.addRawBytes(this.view.camera.rawBytes);
        };
      }

      this.view.buttonGuardar.onClick = () => {
        const titulo = this.view.fieldTitle.text;
        const observaciones = this.view.fieldObservations.text;
        const causa = this.view.fieldCause.text;
        const solucionado = this.view.fieldSolucionado.selected;
        const minutos = this.view.fieldMinutos.text;
        const fecha = this.view.fieldDate.getDate();

        if(titulo && observaciones && causa && minutos && fecha !== '00/00/00'){
          voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
          var objSvc = VMXFoundry.getObjectService("AggityObjSvc", {
            "access": "online"
          });
          var dataObject = new voltmx.sdk.dto.DataObject("Incidencias");
          dataObject.addField("titulo", titulo);
          dataObject.addField("observaciones", observaciones);
          dataObject.addField("causa", causa);
          dataObject.addField("solucionado", solucionado);
          dataObject.addField("minutos", minutos);
          dataObject.addField("fecha", fecha);
          objSvc.create({dataObject}, (response) => {
            voltmx.application.dismissLoadingScreen();
            this.resetFields();
            alert('Registro creado con éxito.');
            voltmx.print("Record created: " + JSON.stringify(response));
          }, (error) => {
            voltmx.application.dismissLoadingScreen();
            alert('Error al intentar vrear registro.');
            voltmx.print("Error in record creation: " + JSON.stringify(error));
          });
        } else {
          alert('Todos los campos son obligatorios.');
        }
      };
      this.view.flxContent.doLayout = () => {
        this.view.flxFotos.height = `${this.view.flxContent.frame.height - 285}dp`;
      };

    };

    this.view.preShow = () => {
      this.resetFields();
    };
  },

  resetFields(){
    this.view.fieldDate.resetDate();
    this.view.fieldTitle.text = '';
    this.view.fieldObservations.text = '';
    this.view.fieldCause.text = '';
    this.view.fieldSolucionado.selected = false;
    this.view.fieldMinutos.text = '';
    this.view.segFotos.setData([]);
  },

  addRawBytes(rawBytes){
    const data = this.view.segFotos.data || [];
    data.push({
      imgFoto: {
        rawBytes
      }
    });
    this.view.segFotos.setData(data);
    this.view.segFotos.selectedRowIndex = [0, data.length - 1];
    this.view.flxFotos.forceLayout();
  },

  deleteFoto(){
    const fotos = this.view.segFotos.data || [];
    const selectedIndex = this.view.segFotos.selectedIndex[1];
    if(fotos.length > 0){
      const newData = fotos.filter((foto, index) => index !== selectedIndex);
      this.view.segFotos.setData(newData);
      this.view.segFotos.selectedRowIndex = selectedIndex === 0 ? [0, 0] : [0, selectedIndex - 1];
    }
  }
});