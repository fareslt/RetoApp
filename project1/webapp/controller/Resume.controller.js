sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"com/sap/customapp/project1/model/formatter"
], function(
	Controller,
	formatter
) {
	"use strict";

	return Controller.extend("com.sap.customapp.project1.controller.Resume", {
		formatter :formatter,
		onInit : function() { 
			debugger;
			//this.filterList();
			var oEventBus = sap.ui.getCore().getEventBus();
			oEventBus.subscribe("OrderBurgerView", "filterList", this.filterListViande, this);
			oEventBus.subscribe("OrderBurgerView", "filterListSauce", this.filterListSauce, this);
			oEventBus.subscribe("OrderBurgerView", "filterListSupp", this.filterListSupplement, this);

		} , 

		filterListViande: function(){   
			var oFilter = new sap.ui.model.Filter("selectedVal",   
			sap.ui.model.FilterOperator.EQ,true);  
			var element = this.getView().byId("viandelist"); 
			element.setVisible(true);
			var listBinding = element.getBinding("items");  
			listBinding.filter([oFilter]);
			             
        }, 

		filterListSauce : function() {
			var oFilter = new sap.ui.model.Filter("selectedVal",   
			sap.ui.model.FilterOperator.EQ,true);  
			var element = this.getView().byId("sauceList");  
			element.setVisible(true);
			var listBinding = element.getBinding("items");  
			listBinding.filter([oFilter]);
		}, 

		filterListSupplement : function() {
			var oFilter = new sap.ui.model.Filter("selectedVal",   
			sap.ui.model.FilterOperator.EQ,true);  
			var element = this.getView().byId("supplementList");
			element.setVisible(true); 
			var listBinding = element.getBinding("items");  
			listBinding.filter([oFilter]);
		}
	});
});