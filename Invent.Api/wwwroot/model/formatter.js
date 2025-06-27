sap.ui.define([

], function () {
  "use strict";

  const formatTrue = "Sim";
  const formatFalse = "Não";

  return {

    formatarDisponibilidade: function (bDisponibilidade) {
      return bDisponibilidade ? formatTrue : formatFalse;
    },
  };
});
