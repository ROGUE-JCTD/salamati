/**
 * Copyright (c) 2008-2011 The Open Planning Project
 * 
 * Published under the GPL license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

/**
 * @requires plugins/Tool.js
 * @require GeoExt/widgets/Action.js
 */

/** api: (define)
 *  module = salamati.plugins
 *  class = AuthDialog
 */

/** api: (extends)
 *  plugins/Tool.js
 */
Ext.ns("salamati.plugins");

/** api: constructor
 *  .. class:: Tools(config)
 *
 *    Provides actions for box zooming, zooming in and zooming out.
 */
salamati.plugins.AuthDialog = Ext.extend(gxp.plugins.Tool, {
    
    /** api: ptype = gxp_zoom */
    ptype: "salamati_auth_dialog",
    
    /**
     * Ext.Window
     */
    window: null,
    
    /** private: method[constructor]
     */
    /*constructor: function(config) {
        salamati.plugins.AuthDialog.superclass.constructor.apply(this, arguments);
    },*/

    /** private: method[addOutput]
     *  :arg config: ``Object``
     */
    addOutput: function(config) {
    	config = Ext.apply(this.window, config || {});
    	
    	var authDialog = salamati.plugins.AuthDialog.superclass.addOutput.call(this, config);
    	
        return authDialog;
    }   
});

Ext.preg(salamati.plugins.AuthDialog.prototype.ptype, salamati.plugins.AuthDialog);