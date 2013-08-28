/**
 * @requires GeoExt/Lang.js
 */

GeoExt.Lang.add("en", {
    "salamati.plugins.DistanceBearing.prototype": {
        infoActionTip: "Distance/Bearing of features from click location",
        popupTitle: "Distance/Bearing",
        Text_Start: "Start",
        Text_ChooseWPS: "Choose WPS",
        Text_Ok: "OK",
        Text_Cancel: "Cancel",
        Text_Hospitals: "Hospitals",
        Text_Hazards: "Hazards",
        Text_DistanceLines: "Distance Lines",
        Text_Distance: "Distance",
        Text_Bearing: "Bearing",
        Text_Latitude: "Latitude",
        Text_Longitude: "Longitude",
        Text_Radius: "Radius"
    },
    "salamati.plugins.Settings.prototype": {
        menuText: "Settings",
        tooltip: "Show Settings"
    },
    "salamati.Viewer.prototype": {
    	Map: "Map",
        Title_Tools: "Tools",
        Title_Search: "Search",
        Title_Layers: "Layers",
        Title_GeoGit: "GeoGit",
        Title_Diff: "Diff",
        Title_Feature_Diff: "Feature Diff",
        Title_Old: "Old",
        Title_New: "New",
        Title_Merged: "Merged",
        Title_Done: "Done",
        Title_Geometry_Diff: "Geometry Diff",
        ActionTip_Default: "Distance/Bearing of features from click location",
        ActionTip_Edit: "Get feature info"
    },
    "gxp.plugins.GeoGitHistory.prototype": {
        Text_Author: "Author",
        Text_Email: "Email",
        Text_Message: "Message",
        Text_CommitId: "Commit Id",
        Text_Date: "Date",
        Text_Hour: "hour",
        Text_Hours: "hours",
        Text_Day: "day",
        Text_Days: "days",
        Text_Ago: "ago",
        Text_Show_Diff: "Show Diff"
    },
    "gxp.plugins.GeoGitRepoInfo.prototype": {
        Text_Info: "Info",
        Text_Repos: "Repos",
        Text_Branches: "Branches",
        Text_Local: "Local",
        Text_Remote: "Remote",
        Text_Remotes: "Remotes",
        Text_Tags: "Tags",
        Text_Merge: "Merge",
        Text_FinishViewing: "Please finish viewing and/or editing of features before you attempt to merge.",
        Text_Cancel: "Cancel",
        Text_Accept: "Accept",
        Text_CancelPopup: "Are you sure you want to cancel this merge?",
        Text_AcceptPopup: "Are you sure you want to complete this merge?",
        Text_MergeStartPopup: "Are you sure you want to start the merge process?",
        Text_Push: "Push",
        Text_Pull: "Pull",
        Text_RemoteAdd: "Add Remote",
        Text_RemoteRemove: "Remove Remote",
        Text_Fetch: "Fetch",
        Text_FetchAll: "Fetch All",
        Text_TransactionCancelFailed: "Couldn't cancel transaction.",
        Text_TransactionEndFailed: "Couldn't finish transaction.",
        Text_Updated: "updated",
        Text_Added: "Added",
        Text_Removed: "Removed",
        Text_Modified: "Modified",
        Text_UpToDate: " is already up to date.",
        Text_RemoteInfo: "Remote Information",
        Text_URL: "URL",
        Text_Name: "Name",
        Text_Username: "Username",
        Text_Password: "Password",
        Text_URLBlank: "The path to the remote repository.",
        Text_NameBlank: "The name to give this remote.",
        Text_UsernameBlank: "The username for this repository.",
        Text_PasswordBlank: "The password for this repository.",
        Text_URLValidateFail: "Please provide a path to the remote repository.",
        Text_NameValidateFail: "Please provide a name to give the remote.",
        Text_NameVerification: "Are you sure you want to create a remote called ",
        Text_URLVerification: " from a repository at the location ",
        Text_RemoteExists: "A remote by that name already exists, please enter a different name.",
        Text_RemoteAddError: "There was an error creating this remote.",
        Text_RemoteRemoveVerification: "Are you sure you want to remove this remote from the repository?",
        Text_RemoteRemoveError: "There was an error removing this remote.",
        Text_CommitError: "Couldn't commit: ",
        Text_ConflictResolved: "All conflicts have been resolved, please press the accept button to complete the merge.",
        Text_PushComplete: "Push Completed.",
        Text_PullConflicts: "This pull has resulted in merge conflicts, you will be able to complete this pull as you would a merge.",
        Text_FetchComplete: "Fetch Completed.",
        Text_FetchFailed: "Failed to Fetch from the remote, either that remote doesn't exist or you are unable to connect to it.",
        Text_AutoSync: "Auto-Sync",
        Text_Minutes: "minutes",
        Text_Resume: "Resume",
        Text_Stop: "Stop",
        Text_SyncPullFailed: "There was a problem pulling data from the remote.",
        Text_SyncContinue: "Do you wish to continue trying to auto-sync?",
        Text_SyncEndFailed: "There was a problem ending the sync transaction.",
        Text_SyncPushFailed: "There was a problem pushing to the remote.",
        Text_SyncBeginFailed: "Unable to begin a new sync transaction.",
        Text_SyncActive: "Auto-sync is active right now, to perform this command you must first pause auto-syncing. Press ok to pause auto-syncing then attempt the command again.",
        Text_SyncInProgress: "Auto-sync has been paused, however there is still a sync in progress please wait a few minutes to allow this to finish before trying again.",
        Text_SyncAbort: " Would you like to abort auto sync?"
    },
    "gxp.plugins.GeoGitFeatureAttributeGrid.prototype": {
        Text_Name: "Name",
        Text_Value: "Value",
        Text_ButtonTooltip: "Resolve conflict using this version of the feature.",
        Text_CheckoutError: "Something went wrong with checkout",
        Text_AddError: "Something went wrong with add",
        Text_RemoveError: "Something went wrong with remove",
        Text_FeatureDiff: "Feature Diff",
        Text_NoCrs: "This feature didn't have a CRS associated with it, layer results may not be accurate."
    },
    "gxp.FeatureEditPanel.prototype": {
        closeMsgTitle: 'Save Changes?',
        closeMsg: 'This feature has unsaved changes. Would you like to save your changes?',
        deleteMsgTitle: 'Delete Feature?',
        deleteMsg: 'Are you sure you want to delete this feature?',
        editButtonText: 'Edit',
        editButtonTooltip: 'Make this feature editable',
        deleteButtonText: 'Delete',
        deleteButtonTooltip: 'Delete this feature',
        cancelButtonText: 'Cancel',
        cancelButtonTooltip: 'Stop editing, discard changes',
        saveButtonText: 'Save',
        saveButtonTooltip: 'Save changes',
        orthoButtonText: 'Right Angle',
        orthoButtonTooltip: 'Fix a polygon to have right angles.'
    },
    "gxp.plugins.VersionedEditor.prototype": {
        attributesTitle: "Attributes",
        historyTitle: "History",
        hour: "hour",
        hours: "hours",
        day: "day",
        days: "days",
        ago: "ago",
        authored: "authored",
        geometry: "Geometry",
        was: "was",
        now: "now",
        added: "Added",
        removed: "Removed",
        modified: "Modified",
        nextCommitText: "Next",    
        nextCommitTooltip: "See what changed in the next commit",    
        prevCommitText: "Prev",    
        prevCommitTooltip: "See what changed in the previous commit",
        Text_NoCrs: "This feature didn't have a CRS associated with it, layer results may not be accurate."
    },    
    "gxp.plugins.DiffPanel.prototype": {
        Title_Fid: "fid",
        Title_Change: "Change",
        Title_Conflict: "Conflict",
        Text_Zoom: "Zoom To Extent",
        Text_ConflictPopup: "Conflicts have been detected as a result of this merge. Before you can complete this merge these conflicts must be resolved. Press the cancel button in the GeoGit panel to abort the merge.",
        Text_Diff: "Diff",
        Text_MoreDiffs: "There were more features changed inbetween these commits. To see more scroll down to the bottom of the diff panel.",
        Text_NoCrs: " features didn't have a CRS associated with them, diff layer results may not be accurate."
    },
    "gxp.plugins.LayerTree.prototype": {
        Title_ZoomTo: "Zoom to Layer"
    },
    "gxp.plugins.GeoGitHistoryButton.prototype": {
        historyButtonText: "Show/Hide History"
    },
    "gxp.plugins.AutoLayerRefreshButton.prototype": {
        buttonTip: "Toggle Automatic Layer Refresh"
    }
});
