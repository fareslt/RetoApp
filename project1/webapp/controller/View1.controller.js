sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("com.sap.customapp.project1.controller.View1", {
			onInit: function () {
			var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
              var datachoise = 
			  {
				  items : [
				   {
					  "type" : "AI",
					  "text" : oBundle.getText("SP"),
					  "fee" : oBundle.getText("ExpAI"), 
					  "icon" : "sap-icon://meal",
					  "Availability" : 0
 				   },
				   {
					  "type" : "SP",
					  "text" : oBundle.getText("AI"),
					  "fee" : oBundle.getText("ExpSP"),
					  "icon" : "sap-icon://shipping-status",
					  "Availability" : 1
				   }	
			              ]
			  };
			  this.getOwnerComponent().getModel("ChoiseModel").setData(datachoise);
			}, 
			onTilePress : function(event) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("ViewAI");
			} 
		});
	});
