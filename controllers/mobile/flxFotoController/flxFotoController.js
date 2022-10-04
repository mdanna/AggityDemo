define({ 

	onViewCreated(){
      this.view.flxDelete.onClick = () => {
          this.executeOnParent('deleteFoto');
        };
    }

});