sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/Button",
    "sap/m/Input"
], function(
	Control,
    Button,
    Input
) {
	"use strict";

	return Control.extend("com.sap.customapp.project1.control.CustomInput", {
        metadata: {
			properties: {
				value: {type: "Number", defaultValue: 0},
                maxValue : {type : "Number" , defaultValue:50}
			},
			aggregations: {
				_decreasebtn: {type: "sap.m.Button", multiple: false, visibility: "hidden"},
				_qte: {type: "sap.m.Input", multiple: false, visibility: "hidden"},
				_increasebtn: {type: "sap.m.Button", multiple: false, visibility: "hidden"}
			},
			events: {
				changeValue: {
					parameters: {
						eventSource : { type :"String"}
                    
					}
				 }   
			}
		},
       
        setValue: function (fValue) {
           if ((fValue >= 0) && ( fValue <= parseInt(this.getMaxValue()) ))  { 
                this.setProperty("value", fValue, true);
                this.getAggregation("_qte").setValue(fValue);
            }
		}, 

         init : function() {
            this.setAggregation("_decreasebtn", new Button({
				text : "-",	
                press : this._Decrease.bind(this)	
			})).addStyleClass("sapUiTinyMarginEnd");
			this.setAggregation("_qte", new Input({
                value : this.getValue(),
                width: "15%",
                type :"Number"
			}).addStyleClass("sapUiTinyMarginEnd"));

			this.setAggregation("_increasebtn", new Button({
				text: "+",
                press : this._Increase.bind(this)	
                
			}).addStyleClass(""));
         },

        _Increase : function(oEvent) {
            this.setValue(parseInt(this.getAggregation("_qte").getValue()) + 1);
            //this.fireEvent("changeValue");
            this.fireEvent("changeValue", {
				eventSource: "I"
			});
        }, 

        _Decrease : function(oEvent) {
           this.setValue(parseInt(this.getAggregation("_qte").getValue()) - 1);
           //this.fireEvent("changeValue")
           this.fireEvent("changeValue", {
            eventSource: "D"
        });
        },
    
        renderer : function(oRM, oControl) {
            oRM.write("<div");
			oRM.writeControlData(oControl);
			oRM.writeClasses();
			oRM.write(">");
            oRM.renderControl(oControl.getAggregation("_decreasebtn"));
			oRM.renderControl(oControl.getAggregation("_qte"));
			oRM.renderControl(oControl.getAggregation("_increasebtn"));
			oRM.write("</div>");
        }
         

	});
});