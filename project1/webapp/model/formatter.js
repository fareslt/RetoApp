/*eslint linebreak-style: 0*/
sap.ui.define([], function() {
	"use strict";

	return {
        informationFormatters : function (adress , mail) {
            return adress + '  /  ' + mail;
        },

        formatSupp : function(text , price) {
            return text  + "  ( + " +  price + "  € )  "
        },
        TotalPrice : function(tacosPrice , supplementPrice , boissonPrice) {
            return tacosPrice + supplementPrice + boissonPrice;
        },
        BoissonResume : function(boisson , qte, totale){
            return boisson + "  X  " + qte + " = " + totale + " € ";
        }
		


	};
});