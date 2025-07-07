QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function() {
  "use strict";

  sap.ui.require([
    "ui5/gestaoequipamento/test/integration/AllJourneys"
  ], function() {
    QUnit.start();
  });
});
