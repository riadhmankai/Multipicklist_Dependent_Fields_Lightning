({
    doInit: function (cmp, event, helper) {
        // Please complete this with API names - the user of this component (admin, developer etc.) must complete this
        let adminMapping = {
            "H": ["C", "P"],
            "T": ["Co", "R"]
        };

        let action = cmp.get("c.getPicklists");
        action.setParams({
            objectAPIName: cmp.get("v.objectName"),
            controllingFieldAPIName: cmp.get("v.controllingFieldName"),
            dependentFieldAPIName: cmp.get("v.dependentFieldName")
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.controllingValues", Object.values(response.getReturnValue()["controlling"]));
                cmp.set("v.dependentValuesMap", response.getReturnValue()["dependent"]);
                let isValid = helper.validateAdminMapping(cmp, adminMapping, response.getReturnValue());
                console.log(JSON.stringify(cmp.get("v.dependentValuesMap")));
                cmp.set("v.convertedAdminMapping", helper.convertPicklistMap(cmp, adminMapping));
                console.log("converted = ");
                console.log(JSON.stringify(cmp.get("v.convertedAdminMapping")));
            }
            else {
                let errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.error("Error message: " + errors[0].message);
                        cmp.set("v.errorMessage", errors[0].message);
                    }
                } else {
                    console.error("Unknown Error");
                    cmp.set("v.errorMessage", "Unknown Error");
                }
            }
        });
        $A.enqueueAction(action);
    },

    handleChangeOnControllingValues: function (cmp, event, helper) {
        let selectedControllingValues = event.getParam("value");
        let convertedAdminMapping = cmp.get("v.convertedAdminMapping");
        let displayedDependentValues = [];
        for (let i = 0; i < selectedControllingValues.length; i++) {
            displayedDependentValues = displayedDependentValues.concat(convertedAdminMapping[selectedControllingValues[i]]);
        }
        console.log("new values");
        console.log(displayedDependentValues);
        cmp.set("v.displayedDependentValues", displayedDependentValues);
    },

    handleChangeOnDependentValues: function (cmp, event, helper) {
        //        Do something here
    }

});