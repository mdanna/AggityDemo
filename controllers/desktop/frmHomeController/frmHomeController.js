define({ 

  onViewCreated(){
    this.view.init = () => {
      this.view.doLayout = () => {
        const h = this.view.frame.height;
        const w = this.view.frame.width;
        this.view.flxMenu.height = `${h-78-60}dp`;
        this.view.flxShadowMenu.height = `${h-73-60}dp`;
        this.view.flxContent.width = `${w-300}dp`;
        this.view.flxContent.height = `${h-73}dp`;
      };

      this.view.flxObras.onClick = () => {
        this.view.lblIconFolderOpen.isVisible = !this.view.lblIconFolderOpen.isVisible;
        this.view.lblIconFolderClose.isVisible = !this.view.lblIconFolderClose.isVisible;
        this.view.flxObrasItems.isVisible = this.view.lblIconFolderOpen.isVisible;
        this.view.lblIconPlus.isVisible = !this.view.lblIconPlus.isVisible;
        this.view.lblIconMinus.isVisible = !this.view.lblIconMinus.isVisible;
      };

      this.view.flxItemProyectos.onClick = () => {
        this.view.flxItemProyectos.skin = 'sknFlxMenuItemSelected';
        this.view.flxItemIncidencias.skin = 'slFbox';
        this.view.flxItemIncidenciasHist.skin = 'slFbox';
        this.view.flxProyectos.isVisible = true;
        this.view.flxIncidencias.isVisible = false;
        this.view.flxIncidenciasHist.isVisible = false;
      };

      this.view.flxItemIncidencias.onClick = () => {
        this.view.flxItemProyectos.skin = 'slFbox';
        this.view.flxItemIncidencias.skin = 'sknFlxMenuItemSelected';
        this.view.flxItemIncidenciasHist.skin = 'slFbox';
        this.view.flxProyectos.isVisible = false;
        this.view.flxIncidencias.isVisible = true;
        this.view.flxIncidenciasHist.isVisible = false;
      };

      this.view.flxItemIncidenciasHist.onClick = () => {
        this.view.flxItemProyectos.skin = 'slFbox';
        this.view.flxItemIncidencias.skin = 'slFbox';
        this.view.flxItemIncidenciasHist.skin = 'sknFlxMenuItemSelected';
        this.view.flxProyectos.isVisible = false;
        this.view.flxIncidencias.isVisible = false;
        this.view.flxIncidenciasHist.isVisible = true;
      };

      this.view.lblToolbarReload.onTouchEnd = () => this.loadData();
      
      eventManager.subscribe('evt_sort', ({key, newSortOrder}) => {
        this.sortData(key, newSortOrder);                                   
      });
    };

    this.view.preShow = () => {
      this.loadData();
    };
  },

  loadData(){
    voltmx.application.showLoadingScreen(null, null, constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true, true, null);
    var objSvc = VMXFoundry.getObjectService("AggityObjSvc", {
      "access": "online"
    });
    var dataObject = new voltmx.sdk.dto.DataObject("Incidencias");
    objSvc.fetch({dataObject}, (response) => {
      this.records = response.records;
      this.sortData('id', 'asc');
      voltmx.application.dismissLoadingScreen();
    }, (error) => {
      voltmx.application.dismissLoadingScreen();
      alert('Error.');
    });
  },

  sortData(sortKey, direction){
    this.view.flxIncidenciasItems.removeAll();
    this.records.sort((a, b) => {
      if(sortKey === 'fecha'){
        const aSplit = a[sortKey].split('/');
        const bSplit = b[sortKey].split('/');
        const aDate = parseInt(`${aSplit[2]}${aSplit[1]}${aSplit[0]}`);
        const bDate = parseInt(`${bSplit[2]}${bSplit[1]}${bSplit[0]}`);
        if(aDate > bDate){
          return direction === 'asc' ? 1 : -1;
        } else if(aDate < bDate){
          return direction === 'asc' ? -1 : 11;
        } else {
          return 0;
        }
      } else if(sortKey === 'solucionado'){
        const aValue = a[sortKey] ? 'S' : 'N';
        const bValue = b[sortKey] ? 'S' : 'N';
        if(aValue > bValue){
          return direction === 'asc' ? 1 : -1;
        } else if(aValue <  bValue){
          return direction === 'asc' ? -1 : 11;
        } else {
          return 0;
        }
      } else {
        if(a[sortKey] > b[sortKey]){
          return direction === 'asc' ? 1 : -1;
        } else if(a[sortKey] < b[sortKey]){
          return direction === 'asc' ? -1 : 11;
        } else {
          return 0;
        }
      }
    });
    this.records.forEach((record, index) => {
      const item = new com.hcl.demo.otero.IncidenciasItem({
        id: `item${new Date().getTime()}`,
        skin: index % 2 ? 'sknFlxItemAlternate' : 'slFbox'
      }, {}, {});
      item.numIncidencia = record.id + '';
      item.titulo = record.titulo;
      item.observaciones = record.observaciones;
      item.causa = record.causa;
      item.solucionado = record.solucionado ? 'S' : 'N';
      item.minutos = record.minutos;
      item.fecha = record.fecha;
      this.view.flxIncidenciasItems.add(item);
    });
  },

});