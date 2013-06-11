/**
 * @requires GeoExt/Lang.js
 */

GeoExt.Lang.add("es", {
    "salamati.plugins.DistanceBearing.prototype": {
        infoActionTip: "Distancia/Dirección de features desde el punto de click",
        popupTitle: "Distancia/Dirección",
        Text_Start: "Comenzar",
        Text_ChooseWPS: "Elegir WPS",
        Text_Ok: "Aceptar", 
        Text_Cancel: "Cancelar",
        Text_Hospitals: "Hospitales",
        Text_Hazards: "Peligros",
        Text_DistanceLines: "Lineas de distancia",
        Text_Distance: "Distancia",
        Text_Bearing: "Azimut",
        Text_Latitude: "Latitud",
        Text_Longitude: "Longitud",
        Text_Radius: "Radio"
    },
    "salamati.plugins.Settings.prototype": {
        menuText: "Configuración",
        tooltip: "Mostrar la configuración"
    },
    // TODO: translate all strings with es_ or (es)
    "salamati.Viewer.prototype": {
    	Map: "Mapa",
        Title_Tools: "Herramientas",
        Title_Search: "Buscar",
        Title_Layers: "Capas",
        Title_GeoGit: "GeoGit",
        Title_Diff: "Diferencia",
        Title_Feature_Diff: "Diferencia entre features",
        Title_Old: "Antiguo",
        Title_New: "Nuevo",
        Title_Merged: "Combinado",
        Title_Done: "Terminado",
        Title_Geometry_Diff: "Diferencia entre geometrías",
        ActionTip_Default: "Distancia/Dirección de features desde el punto de click",
        ActionTip_Edit: "Obtener información"
    },
    "gxp.plugins.GeoGitHistory.prototype": {
        Text_Author: "Autor",
        Text_Email: "Email",
        Text_Message: "Aviso",
        Text_CommitId: "ID de commit",
        Text_Date: "Fecha",
        Text_Hour: "Hora",
        Text_Hours: "Horas",
        Text_Day: "Día",
        Text_Days: "Días",
        Text_Ago: "Hace",
        Text_Show_Diff: "Mostrar diferencias"
    },
    "gxp.plugins.GeoGitRepoInfo.prototype": {
        Text_Info: "Información",
        Text_Repos: "Repositorios",
        Text_Branches: "Ramas",
        Text_Local: "Local",
        Text_Remote: "Remoto",
        Text_Remotes: "Remotos",
        Text_Tags: "Etiquetas",
        Text_Merge: "Combinar",
        Text_FinishViewing: "Por favor finalice la visualización y/o edición de features antes de fusionarlas",
        Text_Cancel: "Cancelar",
        Text_Accept: "Aceptar",
        Text_CancelPopup: "¿Confirma que desea cancelar esta combinación?",
        Text_AcceptPopup: "¿Confirma que desea completar esta combinación?",
        Text_MergeStartPopup: "¿Confirma que desea comenzar el proceso de combinación?",
        Text_Push: "Subir cambios (push)",
        Text_Pull: "Actualizar datos locales (pull)",
        Text_RemoteAdd: "Añadir repositorio remoto",
        Text_RemoteRemove: "Eliminar repositorio remoto",
        Text_Fetch: "Obtener cambios (fetch)",
        Text_FetchAll: "Obtener todos los cambios (fetch all)",
        Text_TransactionCancelFailed: "No se ha podido cancelar la transacción.",
        Text_TransactionEndFailed: "No se ha podido finaliar la transacción.",
        Text_Updated: "actualizado",
        Text_Added: "Añadido",
        Text_Removed: "Eliminado",
        Text_Modified: "Modificado",
        Text_UpToDate: "ya está actualizado.",
        Text_RemoteInfo: "Información sobre repositorio remoto",
        Text_URL: "URL",
        Text_Name: "Nombre",
        Text_URLBlank: "Ruta al repositorio remoto.",
        Text_NameBlank: "Nombre de este repositorio remoto.",
        Text_URLValidateFail: "Por favor, introduzca una ruta para el repositorio remoto.",
        Text_NameValidateFail: "Por favor, introduzca un nombre para el repositorio remoto.",
        Text_NameVerification: "¿Está seguro de que desea crear un repositorio llamado ",
        Text_URLVerification: " a partir de un repositorio en ",
        Text_RemoteExists: "Ya existe un repositorio remoto con ese nombre. Por favor, introduzca un nombre distinto.",
        Text_RemoteAddError: "Se ha producido un error creando el repositorio remoto.",
        Text_RemoteRemoveVerification: "¿Está seguro de que quiere eliminar este repositorio remoto?",
        Text_RemoteRemoveError: "Se ha producido un error eliminando el repositorio remoto."
    },
    "gxp.plugins.GeoGitFeatureAttributeGrid.prototype": {
        Text_Name: "Nombre",
        Text_Value: "Valor"
    },
    "gxp.FeatureEditPanel.prototype": {
        closeMsgTitle: '¿Guardar los cambios?',
        closeMsg: 'Hay cambios sin guardar. ¿Desea guardar los cambios?',
        deleteMsgTitle: '¿Borrar Feature?',
        deleteMsg: '¿Está seguro de que quiere eliminar este feature?',
        editButtonText: 'Editar',
        editButtonTooltip: 'Hacer este feature editable',
        deleteButtonText: 'Borrar',
        deleteButtonTooltip: 'Borrar este feature',
        cancelButtonText: 'Cancelar',
        cancelButtonTooltip: 'Detener edición y descartar cambios',
        saveButtonText: 'Guardar',
        saveButtonTooltip: 'Guardar los cambios',
        orthoButtonText: 'ángulo recto',
        orthoButtonTooltip: 'Arreglar un polígono para que tenga ángulos rectos.'
    },
    "gxp.plugins.VersionedEditor.prototype": {
        attributesTitle: "Atributo",
        historyTitle: "Historia",
        hour: "Hora",
        hours: "Horas",
        day: "Día",
        days: "Días",
        ago: "Hace",
        authored: "Autor",
        geometry: "Geometría",
        was: "Era",
        now: "Ahora",
        added: "Añadido",
        removed: "Eliminado",
        modified: "Modificado",
        nextCommitText: "Siguiente",    
        nextCommitTooltip: "Ver cambios en el siguiente commit",    
        prevCommitText: "Anterior",    
        prevCommitTooltip: "Ver cambios en el commit anterior"
    },
    "gxp.plugins.DiffPanel.prototype": {
        Title_Fid: "fid",
        Title_Change: "Cambiar",
        Title_Conflict: "Conflicto",
        Text_Zoom: "Zoom a la extensión",
        Text_ConflictPopup: "Se han detectado conflictos como resultado de esta combinación. Antes de poder completar la operación de fusión debe resolver lo conflictos. NOTA: La resolución de conflictos no está aún disponible!. Haga clic en el botón de cancelar para detener la operación de fusión."
    },
    "gxp.plugins.LayerTree.prototype": {
        Title_ZoomTo: "Zoom a la capa"
    },
    "gxp.plugins.GeoGitHistoryButton.prototype": {
        historyButtonText: "Motrar/Ocultar historía"
    }
});
