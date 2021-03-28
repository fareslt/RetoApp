sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"com/sap/customapp/project1/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(
	Controller,
	History,
	formatter, 
	Filter,
	FilterOperator
) {
	"use strict";

	return Controller.extend("com.sap.customapp.project1.controller.ViewAI", {
		formatter: formatter,
		onInit : function() {

		}, 
		onNavBack  : function() {
			
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("RouteView1", {}, true);
			
		},
		onSearch : function(oEvent) {
			var aFilters = [];
         var searchTerm = oEvent.getSource().getValue();
		 if (searchTerm && searchTerm.length > 0) {
			var filter1 = new Filter("city", FilterOperator.Contains, searchTerm);
			var filter2 = new Filter ("mail", FilterOperator.Contains,searchTerm);
			aFilters.push(filter1);
			aFilters.push(filter2);
			var finalFilter = new Filter (aFilters, false );
			
		}

		// update list binding
		var oList = this.byId("ListResto");
		var oBinding = oList.getBinding("items");
		oBinding.filter(finalFilter, "Application");
		}, 
		onSwitchChange : function(oEvent) {
			var oList = this.byId("ListResto");
			var oBinding = oList.getBinding("items");
		if (oEvent.getSource().getState()) {
			var filter1 = new Filter("open", FilterOperator.EQ, true);
		    oBinding.filter(filter1, "Application");
		} else {
			oBinding.filter([]);
		}
		},
		onPress : function(oEvent) {
			this.getOwnerComponent().getRouter().navTo("OrderBurger", {
				RestoId: oEvent.getSource().getBindingContext("RestoListModel").getPath().substring(1)
			 });
		}
	});
});