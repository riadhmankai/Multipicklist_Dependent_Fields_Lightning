/**
 * Created by Riadh Mankai on 2020-09-21.
 */

global without sharing class DependentMultiPicklistLightningCtrl {
    public class PicklistWrapper {
        @AuraEnabled public String label;
        @AuraEnabled public String value;
    }

    @AuraEnabled
    public static Map<String, Map<String, PicklistWrapper>> getPicklists(String objectAPIName, String controllingFieldAPIName, String dependentFieldAPIName) {
        Map<String, Map<String, PicklistWrapper>> picklistMap = new Map<String, Map<String, PicklistWrapper>>();
        Map<String, PicklistWrapper> controllingFieldWrappersMap= new Map<String, PicklistWrapper>();
        Map<String, PicklistWrapper> dependentFieldWrappersMap = new Map<String, PicklistWrapper>();
        List<Schema.PicklistEntry> controllingFieldPicklists = Schema.getGlobalDescribe().get(objectAPIName).getDescribe().fields.getMap().get(controllingFieldAPIName).getDescribe().getPicklistValues();
        List<Schema.PicklistEntry> dependentFieldPicklists = Schema.getGlobalDescribe().get(objectAPIName).getDescribe().fields.getMap().get(dependentFieldAPIName).getDescribe().getPicklistValues();
        for (PicklistEntry pe : controllingFieldPicklists) {
            PicklistWrapper controllingPicklistWrapper = new PicklistWrapper();
            controllingPicklistWrapper.label = pe.getLabel();
            controllingPicklistWrapper.value = pe.getValue();
            controllingFieldWrappersMap.put(pe.getValue(), controllingPicklistWrapper);
        }
        for (PicklistEntry pe : dependentFieldPicklists) {
            PicklistWrapper dependentPicklistWrapper = new PicklistWrapper();
            dependentPicklistWrapper.label = pe.getLabel();
            dependentPicklistWrapper.value = pe.getValue();
            dependentFieldWrappersMap.put(pe.getValue(), dependentPicklistWrapper);
        }
        picklistMap.put('controlling', controllingFieldWrappersMap);
        picklistMap.put('dependent', dependentFieldWrappersMap);
        return picklistMap;
    }
}