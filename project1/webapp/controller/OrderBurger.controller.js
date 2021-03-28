sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "com/sap/customapp/project1/model/formatter",
    "sap/m/MessageBox", 
    "com/sap/customapp/project1/library/qrcode"
    
], function(
	Controller,
    formatter,
    MessageBox,
    qrcode
) {
	"use strict";
    var history = {
		prevPaymentSelect: null,
		prevDiffDeliverySelect: null
        
	};
    
	return Controller.extend("com.sap.customapp.project1.controller.OrderBurger", {
        formatter  :formatter,   
        onInit : function() {
			this.getOwnerComponent().getRouter().getRoute("OrderBurger").attachPatternMatched(this._onObjectMatched, this);
            //this.getView().setModel(this.getOwnerComponent().getModel("WizardStepsModel"));
            this.setDataSauce(this.getOwnerComponent().getModel("SauceModel"));
            this.setDataViande(this.getOwnerComponent().getModel("ViandeModel"));
            this.setSuppModel(this.getOwnerComponent().getModel("SuppModel"));
        },
        setDataSauce : function(oModel) {
              var data = [
                {
                    "id" : "1",
                    "sauce" :"Algérienne",
                    "selectedVal" : false,
                    "enabledChk" : true
                },
                {
                    "id" : "2",
                    "sauce" :"Cury",
                    "selectedVal" : false,
                    "enabledChk" : true
                }, 
                {
                    "id" : "3",
                    "sauce" :"Barbecue",
                    "selectedVal" : false,
                    "enabledChk" : true
                }, 
                {
                    "id" : "4",
                    "sauce" :"Chili thaî",
                    "selectedVal" : false,
                    "enabledChk" : true
                },
                {
                    "id" : "5",
                    "sauce" :"Harissa",
                    "selectedVal" : false,
                    "enabledChk" : true
                }, 
                {
                    "id" : "6",
                    "sauce" :"Mayonaise",
                    "selectedVal" : false,
                    "enabledChk" : true
                }, 
                {
                    "id" : "7",
                    "sauce" :"Ketchup",
                    "selectedVal" : false,
                    "enabledChk" :  true               }
              ]
              oModel.setData(data);
        },
        countSelectedValue : function(oModel) {
            var  storage = oModel.getData();
            const count = storage.filter(function(item){
                if (item.selectedVal === true) {
                  return true;
                } else {
                  return false;
                }
              }).length;
              return count ; 
        },

        onSelectSupp : function(oEvent) {
             debugger;
             var storedprice,selectedPrice;
             var priceModel = this.getOwnerComponent().getModel("orderPrice")
             var oModel =  this.getOwnerComponent().getModel("SuppModel");
             var data = oModel.getData();
           if (oEvent.getSource().getSelected()) {
             selectedPrice = oEvent.getSource().getCustomData()[0].getValue("price");
             storedprice = priceModel.getProperty("/supplementPrice");
             priceModel.setProperty("/supplementPrice", storedprice + selectedPrice )
           }  else {
            selectedPrice = oEvent.getSource().getCustomData()[0].getValue("price");
            storedprice = priceModel.getProperty("/supplementPrice");
            priceModel.setProperty("/supplementPrice", storedprice - selectedPrice )
           }   
           var oEventBus = sap.ui.getCore().getEventBus();
           oEventBus.publish("OrderBurgerView", "filterListSupp");

        },
        onSelectSauce : function(oEvent) {
            debugger;
            var oModel =  this.getOwnerComponent().getModel("SauceModel");
            var data = oModel.getData();
            var nbselectedval = this.countSelectedValue(oModel); 
            if ( nbselectedval >= 2 ) {
                for (const prop in data) {
                    if (data[prop].selectedVal !== true ) {
                        data[prop].enabledChk  = false
                    }
                }
            } else if ( nbselectedval < 2 ) {
                for (const prop in data) {
                        data[prop].enabledChk  = true
                    }
                }
                var oEventBus = sap.ui.getCore().getEventBus();
                oEventBus.publish("OrderBurgerView", "filterListSauce")
        }, 
        setDataViande : function(oModel) {
            var data = [ {
                "id" : "1",
                "viande" :"Poulet nature",
                "selectedVal" : false,
                "enabledChk" :  true 
            },
            {
                "id" : "2",
                "viande" :"Viande Hachée",
                "selectedVal" : false,
                "enabledChk" :  true 
            }, 
            {
                "id" : "3",
                "viande" :"Wings",
                "selectedVal" : false,
                "enabledChk" :  true 
            }, 
            {
                "id" : "4",
                "viande" :"Poulet Mariné",
                "selectedVal" : false,
                "enabledChk" :  true 
            },
            {
                "id" : "5",
                "viande" :"Steak de Bouef",
                "selectedVal" : false,
                "enabledChk" :  true 
            }];
            oModel.setData(data); 
        },
        onChangeStep : function(oEvent) {
          debugger;
          var orderPriceModel = this.getOwnerComponent().getModel("orderPrice"); 
          var objContext  = oEvent.getSource().getBindingContext("BoissonModel").getObject(); 
          objContext["totalPrice"] = objContext["qte"] * objContext["price"];
          var totalPrice = this.calculateTotal();
          orderPriceModel.setProperty("/boissonPrice" , totalPrice );
          orderPriceModel.refresh();
          //if (oEvent.getParameter("eventSource") === "I" ) {
           // orderPriceModel.setProperty("/boissonPrice" , stordPrice +  objContext["totalPrice"]  );
          //}  else if (oEvent.getParameter("eventSource") === "D") {
           // orderPriceModel.setProperty("/boissonPrice" , stordPrice -  objContext["totalPrice"]  );
          //}
        },
        calculateTotal : function() {
            debugger;
            var totale = 0; 
            var oModel = this.getOwnerComponent().getModel("BoissonModel"); 
            for (var i = 0 ; i < oModel.getData().length; i++) {
                    totale = totale + oModel.getData()[i].totalPrice;
            }
            return totale;
        },

        onSelectViande : function(oEvent) {
            debugger;
            var oModel =  this.getOwnerComponent().getModel("ViandeModel");
            var data = oModel.getData();
            var nbselectedval = this.countSelectedValue(oModel); 
            if ( nbselectedval >= 3 ) {
                for (const prop in data) {
                    if (data[prop].selectedVal !== true ) {
                        data[prop].enabledChk  = false;
                    }
                }
            } else if ( nbselectedval < 3 ) {
                for (const prop in data) {
                        data[prop].enabledChk  = true; 
                    }
                }  
                var oEventBus = sap.ui.getCore().getEventBus();
                oEventBus.publish("OrderBurgerView", "filterList");
        },
        setSuppModel : function(oModel) {
           var data = [{
                "id" : "1",
                "supp" :"Frit'O tacos",
                "price" : 5,
                "selectedVal" : false
            },
            {
                "id" : "2",
                "supp" :"Frites",
                "price" : 5,
                "selectedVal" : false
            }, 
            {
                "id" : "3",
                "supp" :"4 Tenders",
                "price" : 5,
                "selectedVal" : false
            }, 
            {
                "id" : "4",
                "supp" :"4 Nuggets",
                "price" : 5, 
                "selectedVal" : false
            },
            {
                "id" : "5",
                "supp" :"4 Jalapenos",
                "price" : 8, 
                "selectedVal" : false
            } 
           ];
            oModel.setData(data);
        },
        fireOnSelect : function(oEvent) {
            if (oEvent.getSource().getSelectedIndex() ===  0) {
                this.getOwnerComponent().getModel("orderPrice").setProperty("/tacosPrice",5);
                this.getOwnerComponent().getModel("TailleTacosModel").setProperty("/SelectedTacos" , " Taille M");
            }   
             else if (oEvent.getSource().getSelectedIndex() ===  1 ) {
               this.getOwnerComponent().getModel("orderPrice").setProperty("/tacosPrice",7);
               this.getOwnerComponent().getModel("TailleTacosModel").setProperty("/SelectedTacos" , "Taille L ( + 2 €)");

            } else if (oEvent.getSource().getSelectedIndex() === 2 ) {
                this.getOwnerComponent().getModel("orderPrice").setProperty("/tacosPrice",9);
                this.getOwnerComponent().getModel("TailleTacosModel").setProperty("/SelectedTacos" , "Taille XL( + 4 €)");

            }
        },
        _onObjectMatched : function(oEvent) {
            var sObjectPath =  "/" + oEvent.getParameter("arguments").RestoId;
			this._bindView(sObjectPath);
        },
        _bindView : function(obj) {
            this.getView().bindElement({
				path: obj , model : "RestoListModel" });
        },
        generateId : function() {
            return 112355 ; 
        },
        getTailleTacos : function(prixTacos) {
            var typeTacos = '';
            switch (prixTacos) {
                case 5:
                    typeTacos = 'Taille M '
                  break;
                case 7 :
                    typeTacos = 'Taille L'
                case 9:
                    typeTacos = 'Taille XL'
                  break;
              }
              return typeTacos
        },
        getSelectedSauces : function() {
            debugger;
        var oModel = this.getOwnerComponent().getModel('SauceModel'); 
        var FOUND = [];
         for ( var i = 0 ; i < oModel.getData().length ; i++ ) {
             if ( oModel.getData()[i].selectedVal === true ) {
                 FOUND.push(oModel.getData()[i]) ; 
             }  
         }
         return FOUND;
        }, 

        getSelectedViandes : function() {
        var oModel = this.getOwnerComponent().getModel('ViandeModel'); 
         var FOUND = [];
         for ( var i = 0 ; i < oModel.getData().length ; i++ ) {
             if ( oModel.getData()[i].selectedVal === true ) {
                 FOUND.push(oModel.getData()[i]) ; 
             }  
         }
          return FOUND;
        },  
     
        getSelectedSupp : function() {
            var oModel = this.getOwnerComponent().getModel('SuppModel'); 
            var FOUND = [];
         for ( var i = 0 ; i < oModel.getData().length ; i++ ) {
             if ( oModel.getData()[i].selectedVal === true ) {
                 FOUND.push(oModel.getData()[i]) ; 
             }  
         }
          return FOUND;
        }, 

        calculerPrixTotal : function() {
          var oModel = this.getOwnerComponent().getModel("orderPrice"); 
          return oModel.getProperty("/tacosPrice") +
          oModel.getProperty("/supplementPrice") +
          oModel.getProperty("/boissonPrice") ; 
        },

       
        
        getBoissonList : function() {
             
        },
        setPaymentMethod : function(oEvent) {
            debugger;
            //var selectedKey = oEvent.getSource().getSelectedKey();
            //this.getOwnerComponent().getModel("SelectedPaymentStep").setProperty("/selectedMode",selectedKey);
            this.setDiscardableProperty({
				message: "Are you sure you want to change the payment type ? This will discard your progress.",
				discardStep: this.getView().byId("step4"),
				modelPath: "/selectedMode",
				historyPath: "prevPaymentSelect"
			});
       
       
        }, 

        setDiscardableProperty: function (params) {
			if (this.getView().byId("step1").getProgressStep() !== params.discardStep) {
				MessageBox.warning(params.message, {
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					onClose: function (oAction) {
						if (oAction === MessageBox.Action.YES) {
							this.getView().byId("step1").discardProgress(params.discardStep);
							history[params.historyPath] = this.getOwnerComponent().getModel("SelectedPaymentStep").getProperty("/selectedMode");
						} else {
							//this.model.setProperty(params.modelPath, history[params.historyPath]);
                            this.getOwnerComponent().getModel("SelectedPaymentStep").setProperty("/selectedMode",history[params.historyPath]);

						}
					}.bind(this)
				});
			} else {
				history[params.historyPath] = this.getOwnerComponent().getModel("SelectedPaymentStep").getProperty("/selectedMode");
			}
		},

        goToPaymentStep : function() {
            var selectedKey = this.getOwnerComponent().getModel("SelectedPaymentStep").getProperty("/selectedMode");

			switch (selectedKey) {
				case "Credit Card":
					this.getView().byId("step4").setNextStep(this.getView().byId("CreditCardStep"));
					break;
				case "Bitcoin":
					this.getView().byId("step4").setNextStep(this.getView().byId("BankAccountStep"));
					break;
				case "Cash on Delivery":
				default:
					this.getView().byId("step4").setNextStep(this.getView().byId("CashOnDeliveryStep"));
					break;
			}
        }, 
        OnConfirmPO : function() {
            debugger;
            var Component = this.getOwnerComponent()
            var resume = [{
                "Resto" : this.getView().getBindingContext("RestoListModel").getObject()["lib"],
                "RestoAdress" : this.getView().getBindingContext("RestoListModel").getObject()["adress"],
                "NumeroCommande" : this.generateId(),
                "TailleTacos" : this.getTailleTacos(Component.getModel("orderPrice").getProperty("/tacosPrice")),
                "Sauces" : this.getSelectedSauces(), 
                "Viande" : this.getSelectedViandes() , 
                "Supplement" : this.getSelectedSupp() , 
                "Boisson" : [],  
                "PrixTotale" : this.calculerPrixTotal()
            }]; 
             
             this.getOwnerComponent().getModel("ResumeModel").setData(resume);
             this.onGenerateCode();
             //var oEventBus = sap.ui.getCore().getEventBus();
			 //oEventBus.publish("OrderBurgerView", "filterList");
        },
        onGenerateCode : function() {
            var qrcodeVar = new QRCode(document.getElementById("qrcode") , {
                width : 100,
                height : 100
            });
            qrcodeVar.makeCode(" My order price is  " + this.calculerPrixTotal() + " € " );
        }
	});
});