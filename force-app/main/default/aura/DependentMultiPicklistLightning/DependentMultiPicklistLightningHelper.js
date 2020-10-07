/**
 * Created by Riadh Mankai on 2020-10-02.
 */

({
    convertPicklistMap: function(cmp, adminMapping) {
        let convertedAdminMapping = {};
        for (let controllingAPIName in adminMapping) {
            convertedAdminMapping[controllingAPIName] = [];
            let currentDependentPicklists = adminMapping[controllingAPIName];
            for (let i = 0; i < currentDependentPicklists.length; i++) {
                let picklistWrapper = cmp.get("v.dependentValuesMap")[currentDependentPicklists[i]];
                convertedAdminMapping[controllingAPIName].push(picklistWrapper);
            }
        }
        return convertedAdminMapping;
    },

    validateAdminMapping: function(cmp, adminMapping, responseValue) {
        let isValid = true;
        let controllingValuesMap = responseValue["controlling"];
        let dependentValuesMap = responseValue["dependent"];
        for (let controllingAPIName in adminMapping) {
            if (!controllingValuesMap.hasOwnProperty(controllingAPIName)) {
                isValid = false;
            }
            let currentDependentPicklists = adminMapping[controllingAPIName];
            for (let i = 0; i < currentDependentPicklists.length; i++) {
                if (!dependentValuesMap.hasOwnProperty(currentDependentPicklists[i])) {
                    isValid = false;
                }
            }
        }
        if (!isValid) {
            cmp.set("v.errorMessage", "Please check your 'admin mapping' API names, one or many of the picklist values have wrong API names");
        }
        return isValid;
    }

});